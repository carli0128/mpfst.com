#!/usr/bin/env python3
"""Warren migration over RunPod's HTTPS proxy (for when pods cannot reach each other directly).

Run ON THE OLD POD:
    nohup python3 /workspace/warren_serve.py > /workspace/warren_serve.log 2>&1 &

It serves tar streams of /workspace on port 8888 (which RunPod already proxies at
https://<pod-id>-8888.proxy.runpod.net/) under a random secret path, and prints the exact
commands to run on the new pod. Stop it with: pkill -f warren_serve.py
"""
import http.server
import os
import secrets
import socketserver
import subprocess
import sys
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8888
ROOT = os.environ.get("WARREN_ROOT", "/workspace")
TOKEN = secrets.token_hex(12)

# What Warren needs to boot; copied first as one stream. Top-level files (.env, warren_boot.sh,
# warren_*.mjs ...) are added automatically.
ESSENTIALS = [
    "warren-backups/warren-backup-20261005", "warren-gateway", "memory-server", "supervisor",
    "assistant", "conversation-relay", "dashboard", "tools", "warren-live", "bin", "docs", "neural",
    "kalshi", "options", "voice-web", ".openclaw", ".claude", "memory", "session_db",
    "warren-gateway-patches",
]


def top_level_files():
    out = []
    for name in os.listdir(ROOT):
        p = os.path.join(ROOT, name)
        if os.path.islink(p) or not os.path.isdir(p):
            out.append(name)
    return out


def existing(paths):
    return [p for p in paths if os.path.lexists(os.path.join(ROOT, p))]


def quiet_this_pod():
    """Stop Warren's supervisor and tunnel here: this pod is memory-limited and Warren moves to the new pod."""
    for pattern in ("run_supervisor.sh", "warren_supervisor.py", "cloudflared", "warren_gateway.mjs"):
        subprocess.call(["pkill", "-f", pattern], stderr=subprocess.DEVNULL)


class Handler(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.0"

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))
        sys.stderr.flush()

    def do_GET(self):
        parts = urllib.parse.unquote(self.path).strip("/").split("/")
        if len(parts) < 2 or parts[0] != TOKEN:
            self.send_error(404)
            return
        what = parts[1]
        if what == "list":
            body = "\n".join(sorted(os.listdir(ROOT))).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(body)
            return
        if what == "essentials.tar":
            paths = existing(ESSENTIALS) + top_level_files()
        elif what == "dir" and len(parts) >= 3:
            name = parts[2]
            if "/" in name or name in (".", "..") or not os.path.lexists(os.path.join(ROOT, name)):
                self.send_error(404)
                return
            paths = [name]
        else:
            self.send_error(404)
            return
        self.send_response(200)
        self.send_header("Content-Type", "application/x-tar")
        self.end_headers()
        proc = subprocess.Popen(["tar", "-C", ROOT, "-cf", "-", "--", *paths],
                                stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        try:
            while True:
                chunk = proc.stdout.read(1 << 20)
                if not chunk:
                    break
                self.wfile.write(chunk)
        except (BrokenPipeError, ConnectionResetError):
            proc.kill()
        finally:
            proc.wait()


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    quiet_this_pod()
    pod_id = os.environ.get("RUNPOD_POD_ID", "<old-pod-id>")
    base = f"https://{pod_id}-{PORT}.proxy.runpod.net/{TOKEN}"
    print("Serving /workspace over the RunPod proxy. Run these on the NEW pod, in order:\n")
    print("# 1. essentials, then boot Warren")
    print(f"curl -fsSL {base}/essentials.tar | tar -C /workspace -xf - && echo ESSENTIALS_DONE && "
          f"(nohup bash /workspace/warren_boot.sh > /workspace/warren_boot.run.out 2>&1 &) && sleep 2 && tail -f /workspace/warren_boot.log")
    print()
    print("# 2. everything else, in the background (skips what is already there)")
    print(f"nohup bash -c 'for d in $(curl -fsSL {base}/list); do [ -e \"/workspace/$d\" ] || "
          f"{{ echo \"$d\"; curl -fsSL \"{base}/dir/$d\" | tar -C /workspace -xf -; }}; done; echo ALL_DONE' "
          f"> /workspace/migration_rest.log 2>&1 & sleep 1; tail -f /workspace/migration_rest.log")
    print()
    sys.stdout.flush()
    with Server(("0.0.0.0", PORT), Handler) as srv:
        srv.serve_forever()
