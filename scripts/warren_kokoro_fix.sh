#!/bin/bash
# Run ON THE NEW POD: install the Kokoro TTS engine the old container had (python package +
# espeak-ng phonemizer backend), then let the supervisor relaunch kokoro and report.
set -u
export DEBIAN_FRONTEND=noninteractive PIP_CACHE_DIR=/tmp/pip-cache
command -v espeak-ng >/dev/null || { apt-get update -qq; apt-get install -y -qq espeak-ng; } >/dev/null 2>&1
command -v espeak-ng >/dev/null && echo "espeak-ng OK" || echo "WARNING: espeak-ng not installed"
pip3 install --quiet --disable-pip-version-check kokoro soundfile 2>&1 | grep -v -i 'warning\|notice' | tail -2
python3 -c "import kokoro, soundfile; print('kokoro', getattr(kokoro,'__version__','?'), '/ soundfile OK')"
echo "waiting 120 s for the supervisor to relaunch kokoro (TTS model load)"; sleep 120
grep kokoro /root/supervisor/logs/supervisor_stdout.log | tail -2
(ss -ltn 2>/dev/null || netstat -ltn) | grep -q ':8895 ' && echo "kokoro LISTENING on 8895" || { echo "kokoro not listening yet; last log lines:"; tail -4 /root/supervisor/logs/kokoro.log | cut -c1-200; }
echo "-- bulk:"; tail -1 /workspace/warren_bulk_pull.log
