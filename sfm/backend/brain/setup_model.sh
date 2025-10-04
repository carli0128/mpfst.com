#!/usr/bin/env bash
set -euo pipefail
MODEL_DIR=/var/models
mkdir -p "$MODEL_DIR"
# llama-2-7b-Q4 gguf (≈3 GB RAM once loaded)
if [ ! -f "$MODEL_DIR/llama-2-7b-q4_K.gguf" ]; then
  echo "[brain] downloading quantised model ..."
  curl -L --retry 5 -o "$MODEL_DIR/llama-2-7b-q4_K.gguf" \
      https://huggingface.co/TheBloke/Llama-2-7B-GGUF/resolve/main/llama-2-7b.Q4_K.gguf
fi
