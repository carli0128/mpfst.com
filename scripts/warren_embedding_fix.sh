#!/bin/bash
# Run ON THE NEW POD. Two things for embedding_server (7B model, ~15 GB to read on a cold start):
#  1. Pre-read the model files into RAM (page cache) in the background, so the supervisor's next
#     relaunch loads in seconds like it did on the old pod.
#  2. Teach the supervisor an optional per-service "startup_grace" (seconds without health checks
#     after a start) and give embedding_server 600 s, kokoro 300 s. Applied to /root/supervisor
#     (live) and /workspace/supervisor (persistent copy); takes effect at the next supervisor start.
set -u
LOG=/workspace/warren_embedding_fix.log
exec > >(tee -a "$LOG") 2>&1
say(){ echo; echo "[$(date -u '+%H:%M:%S')] ==== $*"; }

say "1. Pre-warming the model cache in the background"
M=/workspace/.cache/huggingface/hub/models--Alibaba-NLP--gte-Qwen2-7B-instruct
if [ -d "$M" ]; then
  du -sh "$M" | awk '{print "model on disk:", $1}'
  nohup sh -c "find '$M' -type f -print0 | xargs -0 cat > /dev/null" > /dev/null 2>&1 &
  echo "pre-warm started (PID $!)"
else
  echo "WARNING: model directory not found at $M"
fi

say "2. Supervisor patch: optional startup_grace per service"
python3 - <<'PY'
import json, re, py_compile, shutil, os
for base in ("/root/supervisor", "/workspace/supervisor"):
    sv = os.path.join(base, "warren_supervisor.py"); sj = os.path.join(base, "services.json")
    if not os.path.exists(sv):
        print(f"  {base}: no supervisor here, skipped"); continue
    s = open(sv).read()
    if "startup_grace" in s:
        print(f"  {sv}: already patched")
    else:
        a = '        self.manually_stopped = False\n'
        b = a + '        self.startup_grace = int(config.get("startup_grace", 0) or 0)  # seconds without health checks after a start\n'
        c = '            # Port check (if service has a port)\n            if svc.port:\n'
        d = ('            # Startup grace: skip port checks while a slow-starting service (model load) comes up\n'
             '            if svc.port and svc.started_at and getattr(svc, "startup_grace", 0) and (time.time() - svc.started_at) < svc.startup_grace:\n'
             '                continue\n' + c)
        assert a in s and c in s, "unexpected supervisor source"
        shutil.copy(sv, sv + ".bak.pre-grace")
        open(sv, "w").write(s.replace(a, b, 1).replace(c, d, 1))
        py_compile.compile(sv, doraise=True)
        print(f"  {sv}: patched and compiles")
    if os.path.exists(sj):
        svcs = json.load(open(sj)); changed = 0
        for x in svcs:
            want = {"embedding_server": 600, "kokoro": 300}.get(x.get("name"))
            if want and x.get("startup_grace") != want:
                x["startup_grace"] = want; changed += 1
        if changed:
            shutil.copy(sj, sj + ".bak.pre-grace")
            json.dump(svcs, open(sj, "w"), indent=2)
        print(f"  {sj}: startup_grace set on {changed} service(s)")
PY

say "3. Waiting ~4 min for the pre-warm and the next relaunch"
sleep 240
grep embedding_server /root/supervisor/logs/supervisor_stdout.log | tail -3
grep -h -o -E 'loaded in [0-9.]+s.*' /root/supervisor/logs/embedding_server.log | tail -1
(ss -ltn 2>/dev/null || netstat -ltn) | grep -q ':8892 ' && echo "embedding_server LISTENING on 8892" || echo "not listening yet (the next relaunch will have a warm cache; check again in 2 min: ss -ltn | grep 8892)"
echo "-- bulk:"; tail -1 /workspace/warren_bulk_pull.log
say "DONE. Log: $LOG"
