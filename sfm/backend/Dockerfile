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
# fetch model at build-time and download VM
RUN mkdir -p /app/brain/bin \
    && curl -L --retry 5 -o /app/brain/bin/rilvm \
      https://github.com/your-org/kaicore/releases/download/v7.0.0/rilvm-linux-x86_64 \
    && chmod +x /app/brain/bin/rilvm \
    && bash /app/brain/setup_model.sh
# simple health-check – fails if binary missing
HEALTHCHECK CMD test -x /app/brain/bin/rilvm
CMD ["uvicorn", "app:api", "--host", "0.0.0.0", "--port", "8000"]
