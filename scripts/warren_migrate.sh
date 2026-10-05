#!/bin/bash
# Warren migration: pull /workspace from the old RunPod pod over SSH and boot Warren here.
# Safe to re-run: rsync skips what is already copied, warren_boot.sh is idempotent.
set -u
# Usage: bash warren_migrate.sh <old-pod-public-ip> <old-pod-ssh-port>
[ $# -ge 2 ] || { echo "usage: $0 <old-pod-ip> <old-pod-ssh-port>"; exit 1; }
OLD="root@$1"; PORT="$2"; KEY=/root/.ssh/warren_migrate
LOG=/workspace/warren_migrate.log
mkdir -p /workspace
exec > >(tee -a "$LOG") 2>&1
say(){ echo; echo "[$(date -u '+%H:%M:%S')] ==== $*"; }
SSH="ssh -p $PORT -i $KEY -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30 -o BatchMode=yes"
export RSYNC_RSH="$SSH"
SRC="$OLD:/workspace"

say "0. This pod"
hostname; nvidia-smi -L 2>/dev/null || echo "NO GPU VISIBLE"; free -g | head -2; df -h /workspace | tail -1

say "1. SSH to the old pod"
[ -f "$KEY" ] || { echo "ERROR: $KEY not found. Run paste 1 first."; exit 1; }
$SSH $OLD hostname || { echo "ERROR: cannot SSH into the old pod. Was the authorized_keys line (paste 2) run on the OLD pod?"; exit 1; }

say "2. Quiet the crash loop on the old pod (frees its 512 MB for the copy)"
$SSH $OLD "pkill -f run_supervisor.sh; pkill -f warren_supervisor.py; pkill -f cloudflared; pkill -f 'node /root'; pkill -f 'python3 /root'; sleep 2; command -v rsync >/dev/null || (apt-get update -qq && apt-get install -y -qq rsync) >/dev/null 2>&1; echo old pod quiet, rsync: \$(command -v rsync)"
command -v rsync >/dev/null || { apt-get update -qq; apt-get install -y -qq rsync; }

say "3. Sizes of the essential pieces"
$SSH $OLD 'du -sh /workspace/warren-backups/warren-backup-20261005 /workspace/warren-gateway /workspace/memory-server /workspace/.cache /workspace/assistant /workspace/conversation-relay 2>/dev/null'

say "4. Pass 1: essentials (Warren can boot after this)"
mkdir -p /workspace/warren-backups
rsync -a --info=progress2 "$SRC/warren-backups/warren-backup-20261005" /workspace/warren-backups/
for d in warren-gateway memory-server supervisor assistant conversation-relay dashboard tools warren-live bin docs neural kalshi options voice-web .openclaw .claude memory session_db warren-gateway-patches; do
  rsync -a --info=progress2 "$SRC/$d" /workspace/ 2>/dev/null || echo "  (no $d on old pod, skipped)"
done
echo "-- top-level files (.env, warren_boot.sh, warren_*.mjs ...)"
rsync -a --info=progress2 --exclude='/*/' "$SRC/" /workspace/
echo "-- model cache (can be large)"
rsync -a --info=progress2 "$SRC/.cache" /workspace/ 2>/dev/null || echo "  (no .cache, skipped)"
[ -f /workspace/.env ] && echo "OK: .env copied" || echo "WARNING: /workspace/.env did not arrive"
[ -f /workspace/warren_boot.sh ] || { echo "ERROR: warren_boot.sh did not arrive; cannot boot."; exit 1; }

say "5. Boot Warren (warren_boot.sh: installs node/cloudflared/python deps, restores /root from the nightly backup, starts the supervisor)"
bash /workspace/warren_boot.sh
tail -6 /workspace/warren_boot.log
sleep 25
echo "-- gateway health (local):"; curl -s -m 10 localhost:18789/health | head -c 400; echo
echo "-- supervisor:"; tail -15 /root/supervisor/logs/supervisor_stdout.log 2>/dev/null

say "6. Pass 2: everything else, in the background (research data, old backups)"
nohup rsync -a --info=progress2 "$SRC/" /workspace/ > /workspace/migration_pass2.log 2>&1 &
echo "pass 2 running (PID $!). Progress: tail -f /workspace/migration_pass2.log"

say "DONE. Check https://warrenfreeman.io/health from a browser. Full log: $LOG"
