"""
FastAPI router that streams output from the quantised Llama‑2‑7B model
you already stage in `brain/`.

The model is loaded once per worker and kept in RAM.
A tiny prompt‑templating helper is provided so that the front‑end can
pass simple user strings.

If you later swap to a HF Transformers runtime (or vLLM) only the
`generate()` coroutine needs to change.
"""
import asyncio
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from .brain.llama_runner import LlamaRunner   # thin wrapper you already have

router = APIRouter(prefix="/chat", tags=["chat"])

_llama = None  # will hold singleton


async def _lazy_model():
    global _llama
    if _llama is None:
        _llama = await LlamaRunner.create()
    return _llama


async def _stream(answer_gen):
    try:
        async for chunk in answer_gen:
            yield chunk.encode()
            await asyncio.sleep(0)  # give event‑loop time
    finally:
        await answer_gen.aclose()


@router.get("/health", include_in_schema=False)
async def health():
    return {"status": "ok"}


@router.post("/")
async def chat(prompt: str):
    if not prompt.strip():
        raise HTTPException(400, "Prompt must not be empty.")
    llama = await _lazy_model()
    answer_gen = llama.generate(f"[INST] {prompt} [/INST]\n")
    return StreamingResponse(_stream(answer_gen),
                             media_type="text/plain")