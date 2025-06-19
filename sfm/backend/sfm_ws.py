import os, asyncio
from fastapi import APIRouter, WebSocket
from .synergy_monitor import compute_synergy

router = APIRouter()

@router.websocket("/ws")
async def sfm_ws(sock: WebSocket):
    await sock.accept()
    interval = int(os.getenv("SFM_UPDATE_SEC", "60"))
    try:
        while True:
            value = compute_synergy()
            await sock.send_json({"synergy": value})
            await asyncio.sleep(interval)
    except Exception:
        await sock.close()
