#!/bin/bash
# Run ON THE NEW POD. /workspace/.env was stale (Sep 28) while the live /root/.env in the nightly
# snapshot had moved on (web password, voice id). Bring /workspace/.env up to the snapshot's content,
# keep /root/.env -> /workspace/.env, and restart the supervisor so services reload the environment.
set -u
SNAP=/workspace/warren-backups/warren-backup-20261005/.env
[ -f "$SNAP" ] || { echo "ERROR: snapshot env file not found at $SNAP"; exit 1; }
cp /workspace/.env "/workspace/.env.stale.$(date +%s)" 2>/dev/null && echo "old /workspace/.env kept as .env.stale.*"
cat "$SNAP" > /workspace/.env
grep -q '^HF_HOME=' /workspace/.env || echo 'HF_HOME=/workspace/.cache/huggingface' >> /workspace/.env
if [ -L /root/.env ] && [ "$(readlink /root/.env)" = /workspace/.env ]; then echo "/root/.env -> /workspace/.env (content now current)"; else rm -f /root/.env; ln -s /workspace/.env /root/.env; echo "relinked /root/.env -> /workspace/.env"; fi
python3 - <<'PY'
def load(p):
    d={}
    for line in open(p, errors='replace'):
        line=line.strip()
        if line and not line.startswith('#') and '=' in line:
            k,v=line.split('=',1); d[k.strip()]=v
    return d
a=load('/workspace/.env'); b=load('/workspace/warren-backups/warren-backup-20261005/.env')
diff=[k for k in set(a)|set(b) if a.get(k)!=b.get(k) and k!='HF_HOME']
print("variables:", len(a), "| differences vs snapshot:", diff or "none")
PY
echo "restarting the supervisor so every service reloads the environment (~2.5 min of downtime)"
kill -TERM $(pgrep -f warren_supervisor.py); sleep 150
echo "-- gateway:"; curl -s -m 5 localhost:18789/health | head -c 100; echo
curl -s -m 5 localhost:9999/status | python3 -c "
import sys,json
d=json.load(sys.stdin); s=d.get('services',d)
items=s.items() if isinstance(s,dict) else [(x.get('name'),x) for x in s]
bad=[f\"{k}:{v.get('status')}\" for k,v in items if v.get('status')!='running']
print(f'{len(items)} services; not running: ' + (' '.join(bad) or 'none'))"
echo "Done. Try the Command Center login again now (the lockout counter was reset by the restart)."
