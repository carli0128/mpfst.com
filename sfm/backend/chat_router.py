"""
FastAPI router that streams output from the quantised Llama‑2‑7B model
kept in `brain/`.

* The model is loaded lazily and cached per worker.
* Requests are accepted as JSON: **{ "prompt": "<your‑text>" }**
* The response is a Server‑Sent Events (SSE) stream
  (media‑type `text/event-stream`) so the front‑end can display tokens
  as they arrive.
"""
import asyncio
from pathlib import Path
from typing import AsyncGenerator

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from sfm.backend.brain.llama_runner import LlamaRunner

# thin wrapper you already added in brain/llama_runner.py
from .brain.llama_runner import LlamaRunner

router = APIRouter(prefix="/chat", tags=["chat"])

# ---------------------------------------------------------------------------#
# helpers                                                                    #
# ---------------------------------------------------------------------------#
_llama: LlamaRunner | None = None                     # singleton per worker

async def _lazy_model() -> LlamaRunner:
    global _llama
    if _llama is None:
        _llama = LlamaRunner(temperature=0.7)
    return _llama

class ChatRequest(BaseModel):
    prompt: str

async def _event_stream(gen) -> AsyncGenerator[str, None]:
    """
    Wrap model output so each chunk is sent as an SSE 'data:' line.
    """
    try:
        async for chunk in gen:
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0)           # give control back to loop
    finally:
        await gen.aclose()

@router.websocket("/chat")
async def ws_chat(websocket: WebSocket):
    await websocket.accept()
    llama = await _lazy_model()
    try:
        while True:
            data = await websocket.receive_json()
            prompt = data.get("prompt") or data.get("msg")
            if not prompt:
                await websocket.send_json({"role":"error","text":"Empty prompt"})
                continue

            # echo user
            await websocket.send_json({"role":"user","text":prompt})

            # stream bot tokens
            for chunk in llama.stream(f"[INST] {prompt} [/INST]\n"):
                await websocket.send_json({"role":"bot","text":chunk})
    except WebSocketDisconnect:
        pass
# ---------------------------------------------------------------------------#
# public routes                                                              #
# ---------------------------------------------------------------------------#
@router.get("/health", include_in_schema=False)
async def health():
    return {"status": "ok"}


@router.post("/")
async def chat(req: ChatRequest):
    """
    Accept JSON and stream back the model’s answer.
    """
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt must not be empty.")

    llama = await _lazy_model()
    answer_gen = llama.generate(f"[INST] {prompt} [/INST]\n")

    return StreamingResponse(
        _event_stream(answer_gen),
        media_type="text/event-stream",
    )
