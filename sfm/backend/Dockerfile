FROM python:3.11-slim

ARG SFM_SHA=dev
ENV SFM_SHA=$SFM_SHA

# ────────────────────────────────────────────────
# 1 · Set working dir
# ────────────────────────────────────────────────
WORKDIR /app

# ────────────────────────────────────────────────
# 2 · Install Python deps
#    (copy only the requirements file first so
#     this layer is cached when the rest changes)
# ────────────────────────────────────────────────
COPY sfm/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# ────────────────────────────────────────────────
# 3 · Copy application source (entire repo)
# ────────────────────────────────────────────────
COPY . .

# ────────────────────────────────────────────────
# 4 · Copy brain runtime & model helpers
#    (folder now lives under sfm/backend/brain)
# ────────────────────────────────────────────────
COPY sfm/backend/brain /app/brain

ENV RIL_VM_BIN=/app/brain/bin/rilvm

# Download real RIL‑VM binary if it wasn’t checked in
RUN [ -x "$RIL_VM_BIN" ] || \
    (curl -L --retry 5 -o "$RIL_VM_BIN" \
       https://github.com/your-org/kaicore/releases/download/v7.0.0/rilvm-linux-x86_64 \
     && chmod +x "$RIL_VM_BIN") \
 && bash /app/brain/setup_model.sh

# ────────────────────────────────────────────────
# 5 · Health‑check for Render
# ────────────────────────────────────────────────
HEALTHCHECK CMD curl -f http://localhost:8000/version || exit 1

# ────────────────────────────────────────────────
# 6 · Launch FastAPI
# ────────────────────────────────────────────────
CMD ["uvicorn", "sfm.backend.app:api", "--host", "0.0.0.0", "--port", "8000"]
