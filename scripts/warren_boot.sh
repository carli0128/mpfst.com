#!/bin/bash
# Warren pod boot — SELF-HEALING (hardened 2026-07-14 after the Jul-9 GPU-fault
# rebuild that wiped /root and left the container bare). On a fresh container this
# reinstalls the runtime, restores /root from the newest nightly backup, overlays
# the current gateway code, rebuilds node_modules, and starts the supervisor —
# so a container rebuild recovers with NO manual intervention.
#
# v2 (2026-10-05, after the move to the A40 pod): also reinstalls sshpass + go2rtc, the
# transformers / python-multipart packages, the eufy-ws node deps, and restores every
# /root -> /workspace symlink via restore_symlinks.sh. Still idempotent.
#
# MUST be invoked on every container start. RunPod's /post_start.sh is ephemeral,
# so ALSO set this as the pod's start command:  bash /workspace/warren_boot.sh
set +e
LOG=/workspace/warren_boot.log
say(){ echo "[$(date -u)] $*" >> "$LOG"; }
say "==== warren_boot (self-healing) invoked ===="

# --- 1. Runtime deps (idempotent) ---
export DEBIAN_FRONTEND=noninteractive
if ! command -v node >/dev/null 2>&1 || ! command -v cloudflared >/dev/null 2>&1 || ! command -v screen >/dev/null 2>&1 || ! command -v rsync >/dev/null 2>&1 || ! command -v sshpass >/dev/null 2>&1 || ! command -v go2rtc >/dev/null 2>&1; then
  say "installing runtime (node/cloudflared/screen/rsync)"
  apt-get update -qq >>"$LOG" 2>&1
  apt-get install -y -qq screen rsync curl ca-certificates gnupg sshpass >>"$LOG" 2>&1
  command -v node >/dev/null 2>&1 || { curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >>"$LOG" 2>&1; apt-get install -y -qq nodejs >>"$LOG" 2>&1; }
  command -v cloudflared >/dev/null 2>&1 || { curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared; }
  command -v go2rtc >/dev/null 2>&1 || { curl -fsSL https://github.com/AlexxIT/go2rtc/releases/latest/download/go2rtc_linux_amd64 -o /usr/local/bin/go2rtc && chmod +x /usr/local/bin/go2rtc; }
fi
say "runtime: node=$(node -v 2>/dev/null) cloudflared=$(cloudflared --version 2>/dev/null|head -1) go2rtc=$(command -v go2rtc) sshpass=$(command -v sshpass)"

# --- 1b. Python service deps (idempotent; brain + business services need these) ---
export PIP_CACHE_DIR=/tmp/pip-cache
if ! python3 -c "import flask, aiohttp, apscheduler, chromadb, transformers, multipart" >/dev/null 2>&1; then
  say "installing python service deps"
  pip3 install --quiet --disable-pip-version-check --ignore-installed blinker \
    flask aiohttp apscheduler fastapi uvicorn chromadb twilio requests feedparser pymupdf psycopg2-binary pysocks transformers python-multipart \
    google-api-python-client google-auth google-auth-oauthlib google-auth-httplib2 >>"$LOG" 2>&1
  say "python deps: flask=$(python3 -c 'import flask' 2>/dev/null && echo ok) chromadb=$(python3 -c 'import chromadb' 2>/dev/null && echo ok)"
fi

# --- 2. Restore /root from newest nightly backup if the gateway is missing ---
NB=$(ls -1dt /workspace/warren-backups/warren-backup-* 2>/dev/null | head -1)
if [ ! -f /root/warren-gateway/warren_gateway.mjs ] && [ -n "$NB" ]; then
  say "restoring /root from $NB"
  rsync -a --exclude=warren-gateway/node_modules "$NB/" /root/ >>"$LOG" 2>&1
fi
# Overlay the freshest gateway code (persistent canonical copy)
[ -d /workspace/warren-gateway ] && rsync -a --exclude=node_modules /workspace/warren-gateway/ /root/warren-gateway/ >>"$LOG" 2>&1

# --- 3. SSH perms/keys (restore from MooseFS forces world-write -> sshd StrictModes rejects) ---
mkdir -p /root/.ssh
chown -R root:root /root/.ssh 2>/dev/null
chmod 700 /root/.ssh /root 2>/dev/null
chmod 600 /root/.ssh/authorized_keys 2>/dev/null

# --- 4. Brain data on persistent volume (prevents split-brain) ---
if [ ! -L /root/memory-server ] && [ -d /workspace/memory-server ]; then
  [ -e /root/memory-server ] && mv /root/memory-server "/root/memory-server.pre-symlink-$(date +%s)" 2>/dev/null
  ln -sfn /workspace/memory-server /root/memory-server
  say "linked /root/memory-server -> /workspace/memory-server"
fi
# --- 4b. All the other /root -> /workspace links (.openclaw neural .env dashboard kalshi options voice-web) ---
[ -f /workspace/warren_links.sh ] && bash /workspace/warren_links.sh >>"$LOG" 2>&1   # restore_symlinks.sh aborts after its first entry (set -e + ((n++)))
grep -q "^HF_HOME=" /root/.env 2>/dev/null || echo "HF_HOME=/workspace/.cache/huggingface" >> /root/.env

# --- 5. Rebuild gateway node_modules if missing ---
if [ ! -d /root/warren-gateway/node_modules ] && [ -f /root/warren-gateway/package.json ]; then
  say "npm install (node_modules missing)"
  ( cd /root/warren-gateway && npm install --no-audit --no-fund --loglevel=error >>"$LOG" 2>&1 )
fi

# --- 5b. eufy-ws node deps (provides the eufy-security-server binary npx looks for) ---
if [ -f /root/eufy-ws/package.json ] && [ ! -d /root/eufy-ws/node_modules ]; then
  say "npm install eufy-ws deps"
  ( cd /root/eufy-ws && npm install --no-audit --no-fund --loglevel=error >>"$LOG" 2>&1 )
fi

# --- 6. Start the supervisor; it launches all services (gateway, tunnel, brain) ---
if ! pgrep -f "warren_supervisor.py" >/dev/null 2>&1; then
  setsid bash /root/supervisor/run_supervisor.sh </dev/null >/dev/null 2>&1 & disown 2>/dev/null
  say "started supervisor"
else
  say "supervisor already running"
fi
say "==== warren_boot done ===="
