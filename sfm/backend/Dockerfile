FROM python:3.11-slim
ARG SFM_SHA=dev
ENV SFM_SHA=$SFM_SHA
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# copy brain runtime (now inside context)
COPY brain/ /app/brain/
ENV RIL_VM_BIN=/app/brain/bin/rilvm
# Download real RIL-VM binary if not staged by CI layer
RUN [ -x "$RIL_VM_BIN" ] || \
    (curl -L --retry 5 -o "$RIL_VM_BIN" \
       https://github.com/your-org/kaicore/releases/download/v7.0.0/rilvm-linux-x86_64 \
     && chmod +x "$RIL_VM_BIN") \
 && bash /app/brain/setup_model.sh
# Health-check used by Render
HEALTHCHECK CMD curl -f http://localhost:8000/version || exit 1
CMD ["uvicorn", "sfm.backend.app:api", "--host", "0.0.0.0", "--port", "8000"]
