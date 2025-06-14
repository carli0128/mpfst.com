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
RUN bash /app/brain/setup_model.sh
HEALTHCHECK CMD ["bash","-c","test -x /app/brain/bin/rilvm"]
CMD ["uvicorn", "app:api", "--host", "0.0.0.0", "--port", "8000"]
