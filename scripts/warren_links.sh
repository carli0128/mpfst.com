#!/bin/bash
# Recreate the /root -> /workspace symlinks Warren relies on (idempotent, no set -e pitfalls).
# Same map as restore_symlinks.sh, which aborts after its first already-linked entry.
for pair in /workspace/.openclaw:/root/.openclaw /workspace/memory-server:/root/memory-server \
            /workspace/neural:/root/neural /workspace/.env:/root/.env /workspace/dashboard:/root/dashboard \
            /workspace/kalshi:/root/kalshi /workspace/options:/root/options /workspace/voice-web:/root/voice-web; do
  src=${pair%%:*}; dst=${pair##*:}
  [ -e "$src" ] || { echo "  skip $dst (no $src)"; continue; }
  if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then echo "  ok   $dst"; continue; fi
  [ -e "$dst" ] && [ ! -L "$dst" ] && mv "$dst" "$dst.pre-symlink.$(date +%s)"
  ln -sfn "$src" "$dst" && echo "  link $dst -> $src"
done
grep -q '^HF_HOME=' /root/.env 2>/dev/null || echo 'HF_HOME=/workspace/.cache/huggingface' >> /root/.env
