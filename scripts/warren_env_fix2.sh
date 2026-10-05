#!/bin/bash
# Run ON THE NEW POD:  bash warren_env_fix2.sh '<control-password>'
# Finds which env file still holds the real web password (never printed), restores /workspace/.env
# from it, restarts only the gateway (it re-reads /root/.env on start) and tests the login locally.
set -u
[ $# -ge 1 ] || { echo "usage: $0 '<control-password>'"; exit 1; }
PW="$1"; LINE="WARREN_WEB_PASSWORD=$PW"
ORIG=$(ls -t /root/.env.pre-symlink.* 2>/dev/null | head -1)
for f in /workspace/.env /workspace/warren-backups/warren-backup-20261005/.env $ORIG; do
  [ -n "$f" ] && printf "  %-62s has expected line: %s\n" "$f" "$(grep -c -x -F "$LINE" "$f" 2>/dev/null)"
done
SRC=""
for f in $ORIG /workspace/warren-backups/warren-backup-20261005/.env; do
  [ -n "$f" ] && grep -q -x -F "$LINE" "$f" 2>/dev/null && { SRC="$f"; break; }
done
if [ -z "$SRC" ]; then
  echo "No env file on this pod contains that exact password line. Current value's length in /workspace/.env: $(grep -m1 '^WARREN_WEB_PASSWORD=' /workspace/.env | cut -d= -f2- | wc -c)"
  echo "If you are sure of the password, set it explicitly:  sed -i 's|^WARREN_WEB_PASSWORD=.*|WARREN_WEB_PASSWORD=<pw>|' /workspace/.env  then  curl -s -X POST localhost:9999/restart/warren"
  exit 1
fi
if ! grep -q -x -F "$LINE" /workspace/.env; then
  cp /workspace/.env "/workspace/.env.stale2.$(date +%s)" 2>/dev/null
  cat "$SRC" > /workspace/.env
  grep -q '^HF_HOME=' /workspace/.env || echo 'HF_HOME=/workspace/.cache/huggingface' >> /workspace/.env
  echo "restored /workspace/.env from $SRC"
else
  echo "/workspace/.env already has the expected line"
fi
[ -L /root/.env ] || { rm -f /root/.env; ln -s /workspace/.env /root/.env; }
echo "-- restarting the gateway only (re-reads /root/.env):"; curl -s -m 10 -X POST localhost:9999/restart/warren | tr -d '\n'; echo
for i in $(seq 1 12); do sleep 5; curl -s -m 3 localhost:18789/health >/dev/null 2>&1 && break; done
echo "-- local login test:"; curl -s -m 10 -X POST localhost:18789/api/control/login -H 'Content-Type: application/json' -d "{\"password\":\"$PW\"}" -o /tmp/login.json -w "HTTP %{http_code}\n"; grep -q '"token"' /tmp/login.json && echo "LOGIN OK" || cat /tmp/login.json; rm -f /tmp/login.json
