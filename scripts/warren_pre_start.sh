#!/bin/bash
# Warren self-heal hook: the RunPod image's /start.sh runs /pre_start.sh on every container start.
# Install with:  cp /workspace/warren_pre_start.sh /pre_start.sh && chmod 755 /pre_start.sh
# (warren_recover.sh does this automatically.) Keep a copy at /workspace/warren_pre_start.sh.
# Runs warren_boot.sh (idempotent) in the background so /start.sh (set -e) is never blocked or failed by it.
(
  for i in $(seq 1 60); do [ -f /workspace/warren_boot.sh ] && break; sleep 2; done
  if [ -f /workspace/warren_boot.sh ]; then
    echo "[$(date -u)] pre_start: launching warren_boot.sh" >> /workspace/warren_boot.log
    bash /workspace/warren_boot.sh >> /workspace/warren_boot.log 2>&1
  else
    echo "[$(date -u)] pre_start: /workspace/warren_boot.sh not found after 120s" >> /workspace/warren_boot.log
  fi
) > /dev/null 2>&1 &
disown
exit 0
