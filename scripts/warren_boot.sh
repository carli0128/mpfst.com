#!/bin/bash
# ---- split-brain guard (added 2026-11-04): only the primary pod may boot the stack ----
if [ -f /workspace/PRIMARY_POD_ID ] && [ -n "$RUNPOD_POD_ID" ] && [ "$(tr -d '[:space:]' < /workspace/PRIMARY_POD_ID)" != "$RUNPOD_POD_ID" ]; then
  echo "REFUSING: this pod ($RUNPOD_POD_ID) is not the primary ($(cat /workspace/PRIMARY_POD_ID)). Edit /workspace/PRIMARY_POD_ID to migrate."; exit 0
fi

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
if ! command -v node >/dev/null 2>&1 || ! command -v cloudflared >/dev/null 2>&1 || ! command -v screen >/dev/null 2>&1 || ! command -v rsync >/dev/null 2>&1 || ! command -v sshpass >/dev/null 2>&1 || ! command -v go2rtc >/dev/null 2>&1 || ! command -v espeak-ng >/dev/null 2>&1; then
  say "installing runtime (node/cloudflared/screen/rsync)"
  apt-get update -qq >>"$LOG" 2>&1
  apt-get install -y -qq screen rsync curl ca-certificates gnupg sshpass espeak-ng >>"$LOG" 2>&1
  command -v node >/dev/null 2>&1 || { curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >>"$LOG" 2>&1; apt-get install -y -qq nodejs >>"$LOG" 2>&1; }
  command -v cloudflared >/dev/null 2>&1 || { curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && chmod +x /usr/local/bin/cloudflared; }
  command -v go2rtc >/dev/null 2>&1 || { curl -fsSL https://github.com/AlexxIT/go2rtc/releases/latest/download/go2rtc_linux_amd64 -o /usr/local/bin/go2rtc && chmod +x /usr/local/bin/go2rtc; }
fi
say "runtime: node=$(node -v 2>/dev/null) cloudflared=$(cloudflared --version 2>/dev/null|head -1) go2rtc=$(command -v go2rtc) sshpass=$(command -v sshpass)"

# --- 1b. Python service deps (idempotent; brain + business services need these) ---
# 2026-11-05: NEVER let pip touch the torch family. The old line ran `--ignore-installed` for the whole
# list, so pip "upgraded" torch (a dependency of transformers/kokoro/accelerate) from the image's
# 2.8+cu128 to 2.15+cu132 and left torchvision/torchaudio 0.23/2.8 orphaned -> kokoro and
# embedding_server crash-looped on import after every rebuild. Pin whatever the image ships.
export PIP_CACHE_DIR=/tmp/pip-cache
# 2026-11-07: the geesefs /workspace volume loses symlinks when it stalls (every HF-cache snapshot link became a
# 0-byte file twice: Nov 5 and Nov 7, taking kokoro / embedding_server down). Make huggingface_hub copy blobs
# into snapshots instead of symlinking, so the model cache survives the next stall. The supervisor inherits this.
export HF_HUB_DISABLE_SYMLINKS=1
if ! python3 -c "import flask, aiohttp, apscheduler, chromadb, transformers, multipart, accelerate, kokoro, soundfile" >/dev/null 2>&1; then
  say "installing python service deps"
  pip3 freeze 2>/dev/null | grep -iE '^(torch|torchvision|torchaudio)==' > /tmp/torch-constraints.txt
  say "torch pins: $(tr '\n' ' ' < /tmp/torch-constraints.txt)"
  pip3 install --quiet --disable-pip-version-check --ignore-installed blinker >>"$LOG" 2>&1
  pip3 install --quiet --disable-pip-version-check -c /tmp/torch-constraints.txt \
    flask aiohttp apscheduler fastapi uvicorn chromadb twilio requests feedparser pymupdf psycopg2-binary pysocks transformers python-multipart accelerate kokoro soundfile \
    google-api-python-client google-auth google-auth-oauthlib google-auth-httplib2 >>"$LOG" 2>&1
  say "python deps: flask=$(python3 -c 'import flask' 2>/dev/null && echo ok) chromadb=$(python3 -c 'import chromadb' 2>/dev/null && echo ok) torch=$(python3 -c 'import torch,torchvision;print(torch.__version__, torchvision.__version__)' 2>/dev/null)"
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
# private keys too: 0666 makes ssh IGNORE the key -> droplet lookups (gia_legacy_auth SSO) silently fail -> bubble sees staff as anon
chmod 600 /root/.ssh/id_* /root/.ssh/warren_migrate /root/.ssh/authorized_keys.* 2>/dev/null
chmod 644 /root/.ssh/*.pub /root/.ssh/known_hosts* 2>/dev/null

# --- 3b. Exec bits: the geesefs volume strips +x, so every script restored from /workspace comes back 0666 (2026-10-06: hourly
#          chat_logs backup silently failed for a day). Re-arm all shell scripts the scheduler/supervisor exec directly.
chmod 755 /root/warren-gateway/*.sh /root/tools/*.sh /root/supervisor/*.sh /root/*.sh /root/eufy/*.sh 2>/dev/null
chmod 755 /root/assistant/google/delegation.py /root/assistant/scanner.py /root/conversation-relay/server.py 2>/dev/null

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

# --- 5f. go2rtc exec handler needs /root/eufy/node_modules/ws (lost in 2026-10-05 wipe -> every camera 0 bytes) ---
if [ ! -d /root/eufy/node_modules/ws ] && [ -d /workspace/eufy_deps/node_modules/ws ]; then
  mkdir -p /root/eufy/node_modules && cp -r /workspace/eufy_deps/node_modules/ws /root/eufy/node_modules/ && say "eufy: restored node_modules/ws"
fi

# --- 5g. Python modules the image lacks (found missing 2026-10-06: intake uploads 415, marketdata stocks, integrations crash-loop, jarvis) ---
python3 -c "import multipart, yfinance, psycopg2, aiohttp, flask, accelerate, reportlab, PIL" 2>/dev/null || { say "pip: installing missing modules"; pip install -q python-multipart yfinance psycopg2-binary aiohttp flask accelerate reportlab pillow >>"$LOG" 2>&1; }

# --- 5h. Claude Code CLI (lost in 2026-10-05 wipe -> every claude_code task died "spawn claude ENOENT" for 8 days; found 2026-10-13).
#         Needs >=2.1.251 for claude-fable-5-1. Permissions: root cannot use --dangerously-skip-permissions, so ~/.claude/settings.json
#         (allow Write/Edit/Bash, deny restarts/kills) is restored from /workspace/claude_code_settings.json. ---
command -v claude >/dev/null 2>&1 || { say "claude-code: installing CLI"; npm install -g @anthropic-ai/claude-code@latest >>"$LOG" 2>&1; }
mkdir -p /root/.claude
[ -s /root/.claude/settings.json ] || { cp /workspace/claude_code_settings.json /root/.claude/settings.json 2>/dev/null && say "claude-code: restored settings.json"; }
command -v claude >/dev/null 2>&1 && say "claude-code: $(claude --version 2>/dev/null | head -1)" || say "claude-code: CLI STILL MISSING"

# --- 5e. Legacy US/* tz links + pytz/tzdata (relay uses US/Eastern; fresh image lacks both -> every call/WA turn crashed 2026-10-06) ---
mkdir -p /usr/share/zoneinfo/US
for p in Eastern:America/New_York Central:America/Chicago Mountain:America/Denver Pacific:America/Los_Angeles Arizona:America/Phoenix Alaska:America/Anchorage Hawaii:Pacific/Honolulu Michigan:America/Detroit East-Indiana:America/Indiana/Indianapolis Aleutian:America/Adak Samoa:Pacific/Pago_Pago Indiana-Starke:America/Indiana/Knox; do
  n=${p%%:*}; t=${p#*:}; [ -e "/usr/share/zoneinfo/$t" ] && [ ! -e "/usr/share/zoneinfo/US/$n" ] && ln -sfn "../$t" "/usr/share/zoneinfo/US/$n"
done
python3 -c "import pytz, tzdata" 2>/dev/null || pip install -q pytz tzdata >>"$LOG" 2>&1
python3 -c "import zoneinfo; zoneinfo.ZoneInfo('US/Eastern')" 2>/dev/null && say "tz: US/Eastern OK" || say "tz: US/Eastern STILL MISSING"

# --- 5d. tailscale binaries: the network volume strips the executable bit, so copy them to the container disk ---
if [ -f /workspace/tailscale/tailscaled ]; then
  for b in tailscale tailscaled; do cmp -s /workspace/tailscale/$b /usr/local/bin/$b 2>/dev/null || { cp /workspace/tailscale/$b /usr/local/bin/$b && chmod +x /usr/local/bin/$b; }; done
  grep -q '/usr/local/bin/tailscaled' /workspace/tailscale/tailscale-supervisor.sh || sed -i 's|"$TS/tailscaled"|/usr/local/bin/tailscaled|g; s|"$TS/tailscale"|/usr/local/bin/tailscale|g' /workspace/tailscale/tailscale-supervisor.sh
  say "tailscale binaries staged in /usr/local/bin"
fi

# --- 5c. Pre-warm model files into RAM so slow loaders (embedding_server 7B) pass health checks ---
[ -d /workspace/.cache/huggingface/hub ] && ( nohup sh -c 'find /workspace/.cache/huggingface/hub -type f -print0 | xargs -0 cat > /dev/null' >/dev/null 2>&1 & )

# --- 6. Start the supervisor; it launches all services (gateway, tunnel, brain) ---
if ! pgrep -f "warren_supervisor.py" >/dev/null 2>&1; then
  setsid bash /root/supervisor/run_supervisor.sh </dev/null >/dev/null 2>&1 & disown 2>/dev/null
  say "started supervisor"
else
  say "supervisor already running"
fi
say "==== warren_boot done ===="
