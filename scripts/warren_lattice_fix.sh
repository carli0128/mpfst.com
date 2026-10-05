#!/bin/bash
# Run ON THE NEW POD. lattice loads a 1.8M-edge graph (~90 s here) and the supervisor's 90 s health
# limit kills it as it finishes. Give it a 600 s startup_grace and apply it live via the supervisor's
# reload (remove + re-add), without restarting the supervisor. Also make future reloads carry the field.
set -u
python3 - <<'PY'
import json, os, py_compile, shutil, time, urllib.request
def post(path):
    try: urllib.request.urlopen(urllib.request.Request("http://localhost:9999/"+path, method="POST"), timeout=10).read()
    except Exception as e: print("  supervisor API:", e)
for base in ("/root/supervisor", "/workspace/supervisor"):
    sv = os.path.join(base, "warren_supervisor.py")
    if os.path.exists(sv):
        s = open(sv).read()
        old = '                svc.auto_restart = config.get("restart", True)\n'
        new = old + '                svc.startup_grace = int(config.get("startup_grace", 0) or 0)\n'
        if "svc.startup_grace = int(config.get" not in s and old in s:
            open(sv, "w").write(s.replace(old, new, 1)); py_compile.compile(sv, doraise=True); print(f"  {sv}: reload now carries startup_grace")
        else: print(f"  {sv}: already OK")
sj = "/root/supervisor/services.json"
svcs = json.load(open(sj))
for x in svcs:
    if x.get("name") == "lattice": x["startup_grace"] = 600
full = json.dumps(svcs, indent=2)
without = json.dumps([x for x in svcs if x.get("name") != "lattice"], indent=2)
open(sj, "w").write(without); post("reload"); print("  lattice removed from the live config (stopped)"); time.sleep(6)
open(sj, "w").write(full); post("reload"); print("  lattice re-added with startup_grace=600 (fresh start)")
try: open("/workspace/supervisor/services.json", "w").write(full); print("  persistent copy updated")
except Exception as e: print("  persistent copy not updated:", e)
PY
echo "waiting 150 s for the graph load"; sleep 150
grep lattice /root/supervisor/logs/supervisor_stdout.log | tail -3
(ss -ltn 2>/dev/null || netstat -ltn) | grep -q ':7794 ' && echo "lattice LISTENING on 7794" || { echo "not listening yet; last log lines:"; tail -2 /root/supervisor/logs/lattice.log | cut -c1-160; }
