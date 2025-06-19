FROM python:3.11-slim

ARG SFM_SHA=dev
ENV SFM_SHA=$SFM_SHA

# ────────────────────────────────────────────────
# 1 · OS‑level deps (curl + bash)                 │
# ────────────────────────────────────────────────
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        curl \
        bash \
        ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ────────────────────────────────────────────────
# 2 · Python deps                                 │
# ────────────────────────────────────────────────
WORKDIR /app
COPY sfm/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# ────────────────────────────────────────────────
# 3 · Application code                            │
# ────────────────────────────────────────────────
COPY . .
COPY sfm/backend/brain /app/brain

ENV RIL_VM_BIN=/app/brain/bin/rilvm

# ────────────────────────────────────────────────
# 4 · Download / prepare RIL‑VM + model           │
# ────────────────────────────────────────────────
RUN [ -x "$RIL_VM_BIN" ] || \
    (curl -L --retry 5 -o "$RIL_VM_BIN" \
       https://github.com/your-org/kaicore/releases/download/v7.0.0/rilvm-linux-x86_64 \
     && chmod +x "$RIL_VM_BIN") \
 && bash /app/brain/setup_model.sh

# ────────────────────────────────────────────────
# 5 · Health‑check & launch                       │
# ────────────────────────────────────────────────
HEALTHCHECK CMD curl -f http://localhost:8000/version || exit 1
CMD ["uvicorn", "sfm.backend.app:api", "--host", "0.0.0.0", "--port", "8000"]
