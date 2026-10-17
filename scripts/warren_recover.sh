#!/bin/bash
# Warren recovery for the A40 pod after the public hostnames went dark with Cloudflare
# error 1033 (tunnel has no connected cloudflared). Safe to re-run; changes nothing that is
# already healthy. Usage on the pod:  bash /workspace/warren_recover.sh
set +e
LOG=/workspace/warren_recover.log
say(){ echo "[$(date -u +%H:%M:%S)] $*" | tee -a "$LOG"; }
pub(){ curl -s -o /dev/null -m 15 -w '%{http_code}' https://warrenfreeman.io/health; }
status(){ curl -s -m 5 localhost:9999/status | python3 -c '
import sys, json
d = json.load(sys.stdin); s = d["services"]
running = [k for k, v in s.items() if v["status"] == "running"]
print("supervisor uptime %ss; %d/%d services running" % (d["uptime"], len(running), len(s)))
t = s.get("cftunnel", {})
print("cftunnel:", t.get("status"), "| uptime", t.get("uptime_seconds"), "| restarts", t.get("restart_count"), "| last exit", t.get("last_exit_code"))
down = [k for k, v in s.items() if v["status"] != "running"]
print("not running:", ", ".join(down) if down else "none")
' 2>/dev/null || echo "supervisor API on :9999 not answering"; }

say "==== warren_recover start ===="
say "container up $(cut -d. -f1 /proc/uptime)s | supervisor pid: $(pgrep -f warren_supervisor.py | head -1) | cloudflared pid: $(pgrep -x cloudflared | head -1) | gateway pid: $(pgrep -f warren_gateway.mjs | head -1)"
[ -f /workspace/warren_boot.log ] && say "last boot log line: $(tail -1 /workspace/warren_boot.log)"
say "public health before: $(pub)"

say "1. warren_boot.sh (idempotent: rebuilds a fresh container, starts the supervisor if it is not running)"
bash /workspace/warren_boot.sh
for i in $(seq 1 24); do curl -sf -m 3 localhost:9999/health >/dev/null 2>&1 && break; sleep 5; done
if ! curl -sf -m 3 localhost:9999/health >/dev/null 2>&1; then
  say "supervisor API still not answering after 2 min; boot log tail:"
  tail -8 /workspace/warren_boot.log | tee -a "$LOG"
fi

say "2. supervisor status:"; status | tee -a "$LOG"

say "3. waiting up to 90 s for the tunnel to reconnect"
for i in $(seq 1 18); do [ "$(pub)" = "200" ] && break; sleep 5; done
if [ "$(pub)" != "200" ]; then
  say "public health still $(pub): restarting cftunnel through the supervisor"
  curl -s -m 5 -X POST localhost:9999/restart/cftunnel | tee -a "$LOG"; echo
  for i in $(seq 1 18); do [ "$(pub)" = "200" ] && break; sleep 5; done
fi

say "RESULT: public https://warrenfreeman.io/health -> $(pub) | local gateway :18789 -> $(curl -s -o /dev/null -m 5 -w '%{http_code}' localhost:18789/health)"
say "status after:"; status | tee -a "$LOG"
say "cftunnel log tail:"; tail -5 /root/supervisor/logs/cftunnel.log 2>/dev/null | cut -c1-200 | tee -a "$LOG"
say "Container Start Command still to set (makes the next restart self-heal):"
echo "bash -c 'printf \"#!/bin/bash\\nbash /workspace/warren_boot.sh\\n\" > /post_start.sh; exec /start.sh'" | tee -a "$LOG"
say "==== warren_recover done (log: $LOG) ===="
