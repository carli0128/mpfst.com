#!/usr/bin/env python3
"""Bulk Warren migration, consumer side (v2). Run ON THE NEW POD.

Streams the 32 MB tar pieces that warren_bulk_serve.py produces on the old pod, through the
old pod's Jupyter (/files/ to read, the contents API to delete pieces and acknowledge entries),
and unpacks them into /workspace as they arrive.

v2: never gives up on a network blip (retries forever with backoff); entries may be "dir/child"
(the producer splits huge directories); an entry interrupted mid-stream by a crash is handed back
to the producer with a b_<tag>.redo request and re-streamed from piece 0 later, while the
consumer carries on with the other entries. Resumable at entry granularity.

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


def tag_of(entry):
    return "b_" + entry.replace("/", "__")


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
    """Bytes of a file in the remote bulk dir, or None if it does not exist. Retries forever on errors."""
    attempt = 0
    while True:
        try:
            with req("GET", "files/%s/%s" % (REMOTE_DIR, name)) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            err = "HTTP %s" % e.code
        except Exception as e:
            err = type(e).__name__
        attempt += 1
        if attempt in (1, 5, 20) or attempt % 60 == 0:
            log("  %s on %s (attempt %d), retrying" % (err, name, attempt))
        time.sleep(min(5 * attempt, 60))


def exists(name):
    return get(name) is not None


def delete(name):
    for attempt in range(6):
        try:
            with req("DELETE", "api/contents/%s/%s" % (REMOTE_DIR, name), timeout=60):
                return
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return
        except Exception:
            pass
        time.sleep(5)
    log("  WARNING: could not delete %s on the old pod" % name)


def put_text(name, text):
    body = {"type": "file", "format": "text", "content": text}
    for attempt in range(6):
        try:
            with req("PUT", "api/contents/%s/%s" % (REMOTE_DIR, name), body=body, timeout=60):
                return True
        except Exception:
            time.sleep(5)
    log("  WARNING: could not write %s on the old pod" % name)
    return False


def pull_entry(entry):
    """Returns 'done' when the entry is fully unpacked, 'defer' when it must be retried later."""
    tag = tag_of(entry)
    mark = os.path.join(MARKS, tag)
    partial = mark + ".partial"
    redo_sent = mark + ".redo_sent"
    if os.path.exists(mark):
        return "done"

    if os.path.exists(redo_sent):
        # We asked the producer to re-pack this entry. Wait until it has picked the request up
        # (it deletes the .redo file when it starts over) and the first piece is back.
        if exists(tag + ".redo") or not exists("%s.tar.%05d" % (tag, 0)):
            return "defer"
        os.remove(redo_sent)
    elif os.path.exists(partial):
        # A previous run died in the middle of this entry: pieces already consumed are gone on the
        # old pod and a tar stream cannot be resumed mid-way. Ask the producer to start it over.
        log("entry %s was interrupted earlier; asking the producer to re-pack it" % entry)
        if put_text(tag + ".redo", "redo"):
            open(redo_sent, "w").write("1\n")
        return "defer"

    log("entry %s" % entry)
    open(partial, "w").write("1\n")
    tar = subprocess.Popen(["tar", "-C", ROOT, "-x", "--no-same-owner", "-m", "-f", "-"],
                           stdin=subprocess.PIPE, stderr=open(WARN, "ab"))
    sha = hashlib.sha256()
    n = 0
    total = None
    remote_sha = None
    waited = 0
    while True:
        if total is not None and n >= total:
            break
        data = get("%s.tar.%05d" % (tag, n))
        if data is None:
            if total is None:
                done = get(tag + ".done")
                if done is not None:
                    total_s, remote_sha = done.decode().split()
                    total = int(total_s)
                    continue
            waited += 1
            if waited % 75 == 0:  # every 5 minutes
                log("  %s: waiting for piece %d from the old pod" % (entry, n))
            time.sleep(4)
            continue
        waited = 0
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
        log("  %s: CHECKSUM MISMATCH; asking the producer to re-pack it" % entry)
        if put_text(tag + ".redo", "redo"):
            open(redo_sent, "w").write("1\n")
        return "defer"
    put_text(tag + ".ok", "ok")
    os.remove(partial)
    open(mark, "w").write("ok\n")
    log("  %s: complete (%d pieces, checksum OK)" % (entry, n))
    return "done"


def main():
    while True:
        data = get("PLAN")
        if data is not None:
            break
        log("waiting for the old pod's plan ...")
        time.sleep(20)
    plan = data.decode().split()
    log("plan: %d entries" % len(plan))
    while True:
        remaining = [e for e in plan if not os.path.exists(os.path.join(MARKS, tag_of(e)))]
        if not remaining:
            break
        progressed = False
        for entry in remaining:
            if pull_entry(entry) == "done":
                progressed = True
        if not progressed:
            time.sleep(30)
    log("ALL DONE: every entry transferred and verified")


if __name__ == "__main__":
    main()
