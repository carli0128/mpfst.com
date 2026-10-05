#!/bin/bash
# Warren migration via the old pod's Jupyter file endpoint. Run this ON THE NEW POD.
# The old pod packs Warren's essentials into 32 MB pieces under /workspace/_xfer/parts;
# this script downloads them one by one through RunPod's HTTPS proxy, verifies the
# checksum, unpacks into /workspace and starts warren_boot.sh. Safe to re-run.
#
# Usage: bash warren_pull_parts.sh <old-pod-jupyter-url> <old-pod-jupyter-token>
#   e.g. bash warren_pull_parts.sh https://<old-pod-id>-8888.proxy.runpod.net <token>
set -u
[ $# -ge 2 ] || { echo "usage: $0 <old-pod-jupyter-url> <jupyter-token>"; exit 1; }
BASE="${1%/}"; TOKEN="$2"
D=/workspace/_xfer; mkdir -p "$D"
LOG=/workspace/warren_pull.log
exec > >(tee -a "$LOG") 2>&1
say(){ echo; echo "[$(date -u '+%H:%M:%S')] ==== $*"; }
get(){ curl -fsS -m 300 -H "Authorization: token $TOKEN" "$@"; }
FILES="$BASE/files/workspace/_xfer"

say "0. This pod"
hostname; nvidia-smi -L 2>/dev/null || echo "NO GPU VISIBLE"; df -h /workspace | tail -1

say "1. Waiting for the old pod to finish packing"
until N=$(get "$FILES/parts.done" 2>/dev/null) && [ -n "$N" ]; do echo "  not ready yet, checking again in 20 s"; sleep 20; done
N=$(echo "$N" | tr -dc '0-9'); echo "pieces: $N"
SHA_REMOTE=$(get "$FILES/essentials.sha256" | tr -dc 'a-f0-9'); echo "checksum: ${SHA_REMOTE:0:16}..."

say "2. Downloading $N pieces of 32 MB"
for i in $(seq 0 $((N - 1))); do
  f=$(printf 'essentials.tar.%03d' "$i")
  [ -s "$D/$f" ] && continue
  ok=0
  for try in 1 2 3 4 5 6; do
    if get -o "$D/$f.tmp" "$FILES/parts/$f"; then mv "$D/$f.tmp" "$D/$f"; ok=1; break; fi
    echo "  retry $try for $f"; sleep 5
  done
  [ $ok -eq 1 ] || { echo "ERROR: could not download $f"; exit 1; }
  [ $((i % 10)) -eq 0 ] && echo "  $i / $N"
done
echo "all pieces present: $(ls "$D"/essentials.tar.??? | wc -l)"

say "3. Verifying and unpacking into /workspace"
SHA_LOCAL=$(cat "$D"/essentials.tar.??? | sha256sum | cut -d' ' -f1)
if [ "$SHA_LOCAL" != "$SHA_REMOTE" ]; then
  echo "ERROR: checksum mismatch (local ${SHA_LOCAL:0:16}..., remote ${SHA_REMOTE:0:16}...). Delete a bad piece and re-run."
  exit 1
fi
echo "checksum OK"
cat "$D"/essentials.tar.??? | tar -C /workspace -xf - && echo "unpacked"
[ -f /workspace/.env ] && echo "OK: .env present" || echo "WARNING: /workspace/.env missing"
[ -f /workspace/warren_boot.sh ] || { echo "ERROR: warren_boot.sh missing; cannot boot"; exit 1; }
ls -d /workspace/warren-backups/warren-backup-* | tail -1

say "4. Starting Warren (warren_boot.sh in the background; log: /workspace/warren_boot.log)"
nohup bash /workspace/warren_boot.sh > /workspace/warren_boot.run.out 2>&1 &
echo "boot started (PID $!)"
for i in $(seq 1 60); do grep -q 'warren_boot done' /workspace/warren_boot.log 2>/dev/null && break; sleep 10; done
tail -8 /workspace/warren_boot.log
sleep 20
echo "-- gateway health (local):"; curl -s -m 10 localhost:18789/health | head -c 400; echo
echo "-- supervisor:"; tail -12 /root/supervisor/logs/supervisor_stdout.log 2>/dev/null

say "DONE. Check https://warrenfreeman.io/health . Boot log: /workspace/warren_boot.log"
