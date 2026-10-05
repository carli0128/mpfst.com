#!/usr/bin/env python3
"""Bulk Warren migration, consumer side. Run ON THE NEW POD.

Streams the 32 MB tar pieces that warren_bulk_serve.py produces on the old pod, through the
old pod's Jupyter (/files/ to read, the contents API to delete pieces and acknowledge entries),
and unpacks them into /workspace as they arrive. Resumable at entry granularity.

Usage: python3 warren_bulk_pull.py <old-pod-jupyter-url> <jupyter-token>
Log: /workspace/warren_bulk_pull.log
"""
import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

if len(sys.argv) < 3:
    print("usage: warren_bulk_pull.py <old-pod-jupyter-url> <jupyter-token>")
    sys.exit(1)
BASE = sys.argv[1].rstrip("/")
TOKEN = sys.argv[2]
ROOT = os.environ.get("WARREN_ROOT", "/workspace")
REMOTE_DIR = "workspace/_xfer/bulk"
MARKS = os.path.join(ROOT, "_xfer", "bulkdone")
os.makedirs(MARKS, exist_ok=True)
LOG = os.path.join(ROOT, "warren_bulk_pull.log")
WARN = os.path.join(ROOT, "_xfer", "bulk_tar_warnings.log")


def log(msg):
    line = "[%s] %s" % (time.strftime("%H:%M:%S"), msg)
    print(line, flush=True)
    with open(LOG, "a") as f:
        f.write(line + "\n")


def req(method, path, body=None, timeout=300):
    url = "%s/%s" % (BASE, urllib.parse.quote(path))
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method)
    r.add_header("Authorization", "token " + TOKEN)
    r.add_header("User-Agent", "warren-migrate/1.0")  # the proxy rejects Python-urllib
    if data is not None:
        r.add_header("Content-Type", "application/json")
    return urllib.request.urlopen(r, timeout=timeout)


def get(name):
    """Return bytes of a file in the remote bulk dir, None if it does not exist (yet)."""
    for attempt in range(8):
        try:
            with req("GET", "files/%s/%s" % (REMOTE_DIR, name)) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            log("  HTTP %s on %s (attempt %d)" % (e.code, name, attempt + 1))
        except Exception as e:  # network hiccup, proxy reset
            log("  %s on %s (attempt %d)" % (type(e).__name__, name, attempt + 1))
        time.sleep(5 * (attempt + 1))
    raise RuntimeError("giving up on " + name)


def delete(name):
    for attempt in range(5):
        try:
            with req("DELETE", "api/contents/%s/%s" % (REMOTE_DIR, name), timeout=60):
                return
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return
        except Exception:
            pass
        time.sleep(3)
    log("  WARNING: could not delete %s on the old pod" % name)


def put_text(name, text):
    body = {"type": "file", "format": "text", "content": text}
    for attempt in range(5):
        try:
            with req("PUT", "api/contents/%s/%s" % (REMOTE_DIR, name), body=body, timeout=60):
                return
        except Exception as e:
            time.sleep(3)
    log("  WARNING: could not write %s on the old pod" % name)


def wait_for(name, what):
    while True:
        data = get(name)
        if data is not None:
            return data
        log("waiting for %s ..." % what)
        time.sleep(20)


def pull_entry(entry):
    tag = "b_" + entry
    mark = os.path.join(MARKS, entry)
    if os.path.exists(mark):
        return
    log("entry %s" % entry)
    tar = subprocess.Popen(["tar", "-C", ROOT, "-x", "--no-same-owner", "-m", "-f", "-"],
                           stdin=subprocess.PIPE, stderr=open(WARN, "ab"))
    sha = hashlib.sha256()
    n = 0
    total = None
    stalled = 0
    while True:
        if total is not None and n >= total:
            break
        data = get("%s.tar.%05d" % (tag, n))
        if data is None:
            if total is None:
                done = get(tag + ".done")
                if done is not None:
                    total, remote_sha = done.decode().split()
                    total = int(total)
                    continue
            stalled += 1
            if stalled > 30:  # ~2 minutes without the next piece
                log("  %s: piece %d never appeared; re-run the producer with --only %s" % (entry, n, entry))
                tar.stdin.close()
                tar.wait()
                return
            time.sleep(4)
            continue
        stalled = 0
        sha.update(data)
        tar.stdin.write(data)
        delete("%s.tar.%05d" % (tag, n))
        n += 1
        if n % 50 == 0:
            log("  %s: %d pieces (%.1f GB)" % (entry, n, n * 32 / 1024))
    tar.stdin.close()
    tar.wait()
    if total == 0:
        remote_sha = hashlib.sha256().hexdigest()
    if sha.hexdigest() != remote_sha:
        log("  %s: CHECKSUM MISMATCH, re-run the producer with --only %s and run this again" % (entry, entry))
        return
    put_text(tag + ".ok", "ok")
    open(mark, "w").write("ok\n")
    log("  %s: complete (%d pieces, checksum OK)" % (entry, n))


def main():
    plan = wait_for("PLAN", "the old pod's plan").decode().split()
    log("plan: %d entries" % len(plan))
    for entry in plan:
        pull_entry(entry)
    missing = [e for e in plan if not os.path.exists(os.path.join(MARKS, e))]
    if missing:
        log("FINISHED WITH GAPS: %s" % " ".join(missing))
    else:
        log("ALL DONE: every entry transferred and verified")


if __name__ == "__main__":
    main()
