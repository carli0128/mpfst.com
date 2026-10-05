#!/bin/bash
# Warren migration, push mode: run this ON THE OLD POD. It copies /workspace to the new pod
# over SSH (essentials first, the rest in the background) and starts warren_boot.sh there.
# Use this when the old pod cannot accept inbound SSH but can still reach out.
# Safe to re-run: rsync skips what is already copied.
#
# Usage: bash warren_push.sh <new-pod-public-ip> <new-pod-ssh-port> [new-pod-internal-hostname]
set -u
[ $# -ge 2 ] || { echo "usage: $0 <new-pod-public-ip> <new-pod-ssh-port> [new-pod-internal-hostname]"; exit 1; }
NEW_IP="$1"; NEW_PORT="$2"; NEW_INT="${3:-}"
KEY=/root/.ssh/warren_push
LOG=/workspace/warren_push.log
exec > >(tee -a "$LOG") 2>&1
say(){ echo; echo "[$(date -u '+%H:%M:%S')] ==== $*"; }

say "0. This pod"
hostname; df -h /workspace | tail -1
command -v rsync >/dev/null || { apt-get update -qq; apt-get install -y -qq rsync; }
[ -f "$KEY" ] || ssh-keygen -t ed25519 -N '' -f "$KEY" -q
PUB=$(cat "$KEY.pub")

say "1. Route to the new pod"
tcp(){ timeout 6 bash -c "echo > /dev/tcp/$1/$2" 2>/dev/null; }
login(){ ssh -p "$2" -i "$KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=8 -o BatchMode=yes "root@$1" hostname 2>/dev/null; }
DEST=""; PORT=""
if tcp "$NEW_IP" "$NEW_PORT"; then
  echo "public route reachable ($NEW_IP:$NEW_PORT)"
  if H=$(login "$NEW_IP" "$NEW_PORT"); then DEST="root@$NEW_IP"; PORT="$NEW_PORT"; echo "logged in: $H"; fi
elif [ -n "$NEW_INT" ] && tcp "$NEW_INT" 22; then
  echo "internal route reachable ($NEW_INT:22, slower)"
  if H=$(login "$NEW_INT" 22); then DEST="root@$NEW_INT"; PORT=22; echo "logged in: $H"; fi
else
  echo "ERROR: cannot reach the new pod on $NEW_IP:$NEW_PORT or ${NEW_INT:-<no internal name>}:22. Check the new pod's Connect tab for its current SSH port."
  exit 1
fi
if [ -z "$DEST" ]; then
  echo
  echo "The new pod is reachable but does not accept this pod's key yet."
  echo "On the NEW pod's console paste this one line, then run this script again:"
  echo
  echo "echo '$PUB' >> /root/.ssh/authorized_keys && echo AUTHORIZED"
  echo
  exit 2
fi
export RSYNC_RSH="ssh -p $PORT -i $KEY -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30 -o BatchMode=yes"
R(){ rsync -a --partial --info=progress2 "$@"; }
remote(){ ssh -p "$PORT" -i "$KEY" -o StrictHostKeyChecking=accept-new -o BatchMode=yes "$DEST" "$@"; }

say "2. Stop Warren's supervisor and tunnel on this pod (the copy needs the memory; Warren restarts on the new pod)"
pkill -f run_supervisor.sh; pkill -f warren_supervisor.py; pkill -f cloudflared; pkill -f warren_gateway.mjs; sleep 2
pgrep -af 'supervisor|cloudflared|warren_gateway' || echo "stopped"

say "3. Pass 1: essentials"
remote 'mkdir -p /workspace/warren-backups; command -v rsync >/dev/null || (apt-get update -qq && apt-get install -y -qq rsync) >/dev/null 2>&1; echo "new pod ready, rsync: $(command -v rsync)"'
R /workspace/warren-backups/warren-backup-20261005 "$DEST:/workspace/warren-backups/"
for d in warren-gateway memory-server supervisor assistant conversation-relay dashboard tools warren-live bin docs neural kalshi options voice-web .openclaw .claude memory session_db warren-gateway-patches; do
  [ -e "/workspace/$d" ] && R "/workspace/$d" "$DEST:/workspace/"
done
echo "-- top-level files (.env, warren_boot.sh, warren_*.mjs ...)"
R --exclude='/*/' /workspace/ "$DEST:/workspace/"
remote 'test -f /workspace/.env && echo "OK: .env arrived" || echo "WARNING: .env missing on new pod"; test -f /workspace/warren_boot.sh && echo "OK: warren_boot.sh arrived"'

say "4. Start Warren on the new pod (runs in the background there; log: /workspace/warren_boot.log on the new pod)"
remote 'nohup bash /workspace/warren_boot.sh > /workspace/warren_boot.run.out 2>&1 & sleep 1; echo "boot started"'

say "5. Model cache (large; services pick it up as it lands)"
[ -d /workspace/.cache ] && R /workspace/.cache "$DEST:/workspace/"

say "6. Pass 2: everything else, in the background (resumable)"
nohup rsync -a --partial --info=progress2 /workspace/ "$DEST:/workspace/" > /workspace/warren_push_pass2.log 2>&1 &
echo "pass 2 running (PID $!). Progress: tail -f /workspace/warren_push_pass2.log"

say "DONE on this pod. On the NEW pod: tail -f /workspace/warren_boot.log ; then check https://warrenfreeman.io/health"
