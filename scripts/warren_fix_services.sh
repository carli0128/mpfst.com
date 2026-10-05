#!/bin/bash
# One-time repair on the NEW pod after the migration: reinstall what lived only in the old
# container, restore the /root -> /workspace symlinks, and install warren_boot.sh v2 so the
# next container restart recovers on its own. Safe to re-run.
set -u
LOG=/workspace/warren_fix.log
exec > >(tee -a "$LOG") 2>&1
say(){ echo; echo "[$(date -u '+%H:%M:%S')] ==== $*"; }
export DEBIAN_FRONTEND=noninteractive PIP_CACHE_DIR=/tmp/pip-cache
RAW=https://raw.githubusercontent.com/carli0128/mpfst.com/claude/warren-pod-restart-recovery-q1jvgw/scripts

say "1. sshpass (used by the office network check)"
command -v sshpass >/dev/null || { apt-get update -qq; apt-get install -y -qq sshpass; } >/dev/null 2>&1
command -v sshpass || echo "WARNING: sshpass not installed"

say "2. go2rtc binary"
command -v go2rtc >/dev/null || { curl -fsSL https://github.com/AlexxIT/go2rtc/releases/latest/download/go2rtc_linux_amd64 -o /usr/local/bin/go2rtc && chmod +x /usr/local/bin/go2rtc; }
command -v go2rtc && go2rtc --version 2>/dev/null | head -1

say "3. Python packages for embedding_server and intake_web"
pip3 install --quiet --disable-pip-version-check transformers python-multipart 2>&1 | grep -v -i 'warning\|notice' | tail -3
python3 -c "import transformers, multipart; print('transformers', transformers.__version__, '/ python-multipart OK')"

say "4. eufy-ws node dependencies (eufy-security-server)"
if [ -f /root/eufy-ws/package.json ]; then
  ( cd /root/eufy-ws && npm install --no-audit --no-fund --loglevel=error ) && ls /root/eufy-ws/node_modules/.bin/ | grep -i eufy || echo "WARNING: eufy-security-server binary not found after install"
else
  echo "no /root/eufy-ws/package.json"
fi

say "5. /root -> /workspace symlinks"
bash /workspace/restore_symlinks.sh 2>&1 | grep -E 'OK|CREATED|BACKUP|SKIP' | head -12
grep -q '^HF_HOME=' /root/.env 2>/dev/null || echo 'HF_HOME=/workspace/.cache/huggingface' >> /root/.env

say "6. Install warren_boot.sh v2 (self-healing boot that includes all of the above)"
cp -n /workspace/warren_boot.sh /workspace/warren_boot.sh.bak.pre-v2 2>/dev/null
curl -fsSL "$RAW/warren_boot.sh" -o /workspace/warren_boot.sh.new && bash -n /workspace/warren_boot.sh.new && mv /workspace/warren_boot.sh.new /workspace/warren_boot.sh && chmod +x /workspace/warren_boot.sh && echo "warren_boot.sh v2 installed (original kept as warren_boot.sh.bak.pre-v2)"

say "7. Letting the supervisor relaunch the repaired services"
sleep 90
echo "-- recent events for the four repaired services:"
grep -E 'go2rtc|eufyws|embedding_server|intake_web' /root/supervisor/logs/supervisor_stdout.log | tail -8
echo "-- listening ports (1984 go2rtc, 3200 eufyws, 8892 embedding, 18789 gateway):"
(ss -ltn 2>/dev/null || netstat -ltn) | grep -E ':(1984|3200|8892|18789) ' | awk '{print $4}'
echo "-- gateway:"; curl -s -m 5 localhost:18789/health | head -c 160; echo
say "DONE. Log: $LOG"
