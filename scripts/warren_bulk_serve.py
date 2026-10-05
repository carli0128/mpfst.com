#!/usr/bin/env python3
"""Bulk Warren migration, producer side. Run ON THE OLD POD (the one whose Jupyter the new pod can reach).

Packs every top-level entry of /workspace (except those already transferred) into 32 MB tar
pieces under /workspace/_xfer/bulk, but never more than MAX_PENDING pieces at a time: the
consumer (warren_bulk_pull.py on the new pod) downloads each piece through Jupyter's /files/
endpoint, deletes it through Jupyter's contents API, and acknowledges finished entries with a
b_<entry>.ok file. Piece names never start with '.', because Jupyter hides dot-files.

Usage: python3 warren_bulk_serve.py [--skip name ...] [--only name ...]
Files written:  PLAN (ordered entry list), b_<entry>.tar.NNNNN (pieces),
                b_<entry>.done ("<pieces> <sha256>"), ALL.done, bulk.log
"""
import hashlib
import os
import subprocess
import sys
import time

ROOT = os.environ.get("WARREN_ROOT", "/workspace")
OUT = os.path.join(ROOT, "_xfer", "bulk")
PIECE = 32 * 1024 * 1024
MAX_PENDING = int(os.environ.get("MAX_PENDING", "120"))  # 120 x 32 MB = 3.75 GB on disk at most

ALREADY = {  # transferred by the essentials bundle
    "warren-backups", "warren-gateway", "memory-server", "supervisor", "assistant",
    "conversation-relay", "dashboard", "tools", "warren-live", "bin", "docs", "neural", "kalshi",
    "options", "voice-web", ".openclaw", ".claude", "memory", "session_db", "warren-gateway-patches",
    "_xfer",
}
FIRST = [".cache"]  # models first: services want them


def log(msg):
    line = "[%s] %s" % (time.strftime("%H:%M:%S"), msg)
    print(line, flush=True)
    with open(os.path.join(ROOT, "_xfer", "bulk.log"), "a") as f:
        f.write(line + "\n")


def plan(skip, only):
    names = []
    for n in sorted(os.listdir(ROOT)):
        p = os.path.join(ROOT, n)
        if not os.path.isdir(p) or os.path.islink(p):
            continue  # top-level files and links went with the essentials
        if n in ALREADY or n in skip:
            continue
        if only and n not in only:
            continue
        names.append(n)
    return [n for n in FIRST if n in names] + [n for n in names if n not in FIRST]


def pending():
    return sum(1 for n in os.listdir(OUT) if ".tar." in n)


def produce(entry):
    tag = "b_" + entry
    if os.path.exists(os.path.join(OUT, tag + ".ok")):
        log("skip %s (acknowledged)" % entry)
        return
    for n in os.listdir(OUT):  # leftovers from an interrupted run
        if n.startswith(tag + ".tar.") or n == tag + ".done":
            os.remove(os.path.join(OUT, n))
    log("packing %s" % entry)
    proc = subprocess.Popen(["tar", "-C", ROOT, "-cf", "-", "--", entry],
                            stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    sha = hashlib.sha256()
    idx = 0
    while True:
        buf = b""
        while len(buf) < PIECE:
            chunk = proc.stdout.read(PIECE - len(buf))
            if not chunk:
                break
            buf += chunk
        if not buf:
            break
        while pending() >= MAX_PENDING:
            time.sleep(3)
        sha.update(buf)
        name = "%s.tar.%05d" % (tag, idx)
        with open(os.path.join(OUT, name + ".part"), "wb") as f:
            f.write(buf)
        os.rename(os.path.join(OUT, name + ".part"), os.path.join(OUT, name))
        idx += 1
        if idx % 50 == 0:
            log("  %s: %d pieces" % (entry, idx))
    proc.wait()
    with open(os.path.join(OUT, tag + ".done.part"), "w") as f:
        f.write("%d %s\n" % (idx, sha.hexdigest()))
    os.rename(os.path.join(OUT, tag + ".done.part"), os.path.join(OUT, tag + ".done"))
    log("done %s: %d pieces (%.1f GB)" % (entry, idx, idx * PIECE / 1e9))


def main():
    args = sys.argv[1:]
    skip, only = set(), set()
    mode = None
    for a in args:
        if a in ("--skip", "--only"):
            mode = a
        elif mode == "--skip":
            skip.add(a)
        elif mode == "--only":
            only.add(a)
    os.makedirs(OUT, exist_ok=True)
    entries = plan(skip, only)
    with open(os.path.join(OUT, "PLAN.part"), "w") as f:
        f.write("\n".join(entries) + "\n")
    os.rename(os.path.join(OUT, "PLAN.part"), os.path.join(OUT, "PLAN"))
    log("plan: %d entries: %s" % (len(entries), " ".join(entries)))
    for e in entries:
        produce(e)
    with open(os.path.join(OUT, "ALL.done"), "w") as f:
        f.write("ok\n")
    log("ALL DONE (pieces still pending download: %d)" % pending())


if __name__ == "__main__":
    main()
