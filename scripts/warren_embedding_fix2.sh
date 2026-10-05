#!/bin/bash
# Run ON THE NEW POD. (a) Fix the supervisor so a service stopped by failed health checks is
# relaunched (it was left in "stopped" instead of "crashed"); applies at the next supervisor start.
# (b) Start embedding_server now through the supervisor API and report.
set -u
python3 - <<'PY'
import py_compile, os
for base in ("/root/supervisor", "/workspace/supervisor"):
    p = os.path.join(base, "warren_supervisor.py")
    if not os.path.exists(p): continue
    s = open(p).read()
    old = '                        svc.status = "crashed"\n                        stop_service(svc)\n'
    new = '                        stop_service(svc)\n                        svc.status = "crashed"  # set AFTER stop_service (which writes "stopped"), so the monitor relaunches it\n'
    if old in s:
        open(p, "w").write(s.replace(old, new, 1)); py_compile.compile(p, doraise=True); print(f"  {p}: health-stop order fixed")
    elif "set AFTER stop_service" in s:
        print(f"  {p}: already fixed")
    else:
        print(f"  {p}: pattern not found, left unchanged")
PY
echo "-- starting embedding_server via the supervisor API:"
curl -s -m 10 -X POST localhost:9999/start/embedding_server; echo
echo "-- waiting 100 s for the (now warm) model load"; sleep 100
grep embedding_server /root/supervisor/logs/supervisor_stdout.log | tail -3
grep -h -o -E 'loaded in [0-9.]+s.*' /root/supervisor/logs/embedding_server.log | tail -1
(ss -ltn 2>/dev/null || netstat -ltn) | grep -q ':8892 ' && echo "embedding_server LISTENING on 8892" || { echo "not listening yet; last log lines:"; tail -4 /root/supervisor/logs/embedding_server.log | cut -c1-200; }
echo "-- bulk:"; tail -1 /workspace/warren_bulk_pull.log
