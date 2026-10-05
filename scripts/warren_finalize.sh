#!/bin/bash
# Run ON THE NEW POD once the old pod's bulk producer reported ALL DONE and the follow-up
# producer pass (--only warren-backups) plus the MANIFEST were started on the old pod.
#
#   bash warren_finalize.sh <old-pod-jupyter-url> <old-pod-jupyter-token>
#
# 1. runs the consumer once more (older nightly backup sets)
# 2. stages the tailscale binaries (+x) and starts the tailscale service
# 3. verifies file counts per top-level directory against the old pod's manifest
# 4. prints the service roster and the RunPod start command to set
set -u
[ $# -ge 2 ] || { echo "usage: $0 <old-pod-jupyter-url> <jupyter-token>"; exit 1; }
BASE="${1%/}"; TOKEN="$2"
LOG=/workspace/warren_finalize.log
exec > >(tee -a "$LOG") 2>&1
say(){ echo; echo "[$(date -u '+%H:%M:%S')] ==== $*"; }
get(){ curl -fsS -m 120 -A warren-migrate -H "Authorization: token $TOKEN" "$@"; }

say "1. Follow-up copy: older nightly backup sets"
python3 /workspace/warren_bulk_pull.py "$BASE" "$TOKEN" | tail -5
ls -d /workspace/warren-backups/warren-backup-* | wc -l | awk '{print "nightly backup sets on this pod:", $1}'

say "2. tailscale"
if [ -f /workspace/tailscale/tailscaled ]; then
  for b in tailscale tailscaled; do cmp -s /workspace/tailscale/$b /usr/local/bin/$b 2>/dev/null || { cp /workspace/tailscale/$b /usr/local/bin/$b && chmod +x /usr/local/bin/$b; }; done
  grep -q '/usr/local/bin/tailscaled' /workspace/tailscale/tailscale-supervisor.sh || sed -i 's|"$TS/tailscaled"|/usr/local/bin/tailscaled|g; s|"$TS/tailscale"|/usr/local/bin/tailscale|g' /workspace/tailscale/tailscale-supervisor.sh
  curl -s -m 10 -X POST localhost:9999/start/tailscale >/dev/null; sleep 25
  /usr/local/bin/tailscale --socket=/root/.tailscale/tailscaled.sock status 2>&1 | head -3
else
  echo "WARNING: /workspace/tailscale not present"
fi

say "3. Verification against the old pod (file counts per top-level directory)"
until get -o /tmp/manifest_old.txt "$BASE/files/workspace/_xfer/MANIFEST.txt" 2>/dev/null && grep -q 'END' /tmp/manifest_old.txt; do echo "  waiting for the old pod's manifest..."; sleep 60; done
: > /tmp/manifest_new.txt
while read -r e n; do
  [ "$e" = "END" ] && break
  m=$(find "/workspace/$e" -type f 2>/dev/null | wc -l)
  echo "$e $n $m" >> /tmp/manifest_new.txt
done < /tmp/manifest_old.txt
awk '$2!=$3{printf "  MISMATCH %-40s old=%s new=%s\n",$1,$2,$3; d++} END{printf "%d directories compared, %d differ\n", NR, d+0}' /tmp/manifest_new.txt

say "4. Services and endpoints"
curl -s -m 5 localhost:9999/status | python3 -c "
import sys,json
d=json.load(sys.stdin); s=d.get('services',d)
items=s.items() if isinstance(s,dict) else [(x.get('name'),x) for x in s]
bad=[f\"{k}:{v.get('status')}\" for k,v in items if v.get('status')!='running']
print(f'{len(items)} services; not running: ' + (' '.join(bad) or 'none'))"
curl -s -m 5 localhost:18789/health | head -c 120; echo

say "DONE. Next: set the pod's Container Start Command in RunPod (Edit Pod) to:"
echo "bash -c 'printf \"#!/bin/bash\\nbash /workspace/warren_boot.sh\\n\" > /post_start.sh; exec /start.sh'"
echo "Saving that restarts the pod; warren_boot.sh v2 then rebuilds everything by itself. Log: $LOG"
