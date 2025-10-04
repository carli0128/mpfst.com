# syntax=docker/dockerfile:1

# ────────────────────────────────────────────────
# 0 · Base image
# ────────────────────────────────────────────────
FROM python:3.11-slim AS runtime

ARG  SFM_SHA=dev
ENV  SFM_SHA=${SFM_SHA}

# ------------  puerto estándar que Render inyecta --------------
# Render define PORT=8000 → lo respetamos; si no existe (p.ej. local),
# usamos 8000 igualmente.
ARG  RENDER_PORT=8000
ENV  PORT=${RENDER_PORT}

# ────────────────────────────────────────────────
# 1 · OS‑level deps
# ────────────────────────────────────────────────
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        curl \
        bash \
        ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ────────────────────────────────────────────────
# 2 · Python deps
# ────────────────────────────────────────────────
WORKDIR /app
COPY sfm/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# ────────────────────────────────────────────────
# 3 · Application code
# ────────────────────────────────────────────────
COPY . .

# Si tu árbol contiene brain/, ya está copiado.
ENV  RIL_VM_BIN=/app/brain/bin/rilvm

# ────────────────────────────────────────────────
# 4 · Download / prepare RIL‑VM + modelo
# ────────────────────────────────────────────────
WORKDIR /app/sfm/backend
RUN set -eux; \
    dir="$(dirname "$RIL_VM_BIN")"; \
    mkdir -p "$dir"; \
    if [ ! -x "$RIL_VM_BIN" ]; then \
        curl -L --retry 5 -o "$RIL_VM_BIN" \
          https://github.com/your-org/kaicore/releases/download/v7.0.0/rilvm-linux-x86_64; \
        chmod +x "$RIL_VM_BIN"; \
    fi; \
    bash brain/setup_model.sh

# Return to project root so Python can resolve the `sfm` package
WORKDIR /app

# ────────────────────────────────────────────────
# 5 · Health‑check & launch
# ────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD curl -f http://localhost:${PORT:-8000}/healthz || exit 1

EXPOSE ${PORT}

# UVICORN lanza FastAPI en el puerto que Render pasó
# sfm.backend.app:app  →  ajusta el import si tu módulo se llama distinto
CMD ["sh", "-c", "uvicorn sfm.backend.app:app --host 0.0.0.0 --port ${PORT:-8000}"]

