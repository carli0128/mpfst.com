#!/bin/sh
set -e
MODEL_DIR=/var/models
mkdir -p "$MODEL_DIR"
if [ ! -f "$MODEL_DIR/llama2-7b-q4.gguf" ]; then
  echo "Downloading model..."
  curl -L -o "$MODEL_DIR/llama2-7b-q4.gguf" https://example.com/llama2-7b-q4.gguf || true
fi
