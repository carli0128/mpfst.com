# sfm/backend/chat_router.py

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from sfm.backend.brain.llama_runner import LlamaRunner

router = APIRouter(prefix="/chat", tags=["chat"])

# Singleton LlamaRunner instance
_llama: LlamaRunner | None = None

async def _lazy_model() -> LlamaRunner:
    global _llama
    if _llama is None:
        # Adjust create() arguments (temperature, model name) as needed
        _llama = await LlamaRunner.create()
    return _llama

@router.post("/")
async def chat(request: Request):
    """
    POST /chat
    Expects JSON { "prompt": "your question here" }
    Streams back Llama-2 tokens as SSE.
    """
    body = await request.json()
    prompt = body.get("prompt")
    if not prompt or not isinstance(prompt, str):
        raise HTTPException(
            status_code=400,
            detail="Request body must include a non-empty string field 'prompt'"
        )

    llama = await _lazy_model()

    async def event_generator():
        # Stream each token as its own SSE message
        async for token in llama.stream(f"[INST] {prompt} [/INST]\n"):
            yield f"data: {token}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
    )
