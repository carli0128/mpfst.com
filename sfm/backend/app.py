import asyncio, json, os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from data_fetchers import get_geomag_kp, get_solarwind_speed
from meltdown import compute_mfrac

UPDATE_SECS = int(os.getenv("SFM_UPDATE_SEC", "60"))

api = FastAPI(title="Synergy Field Monitor API")
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
)

@api.get("/")
def root():
    return {"msg": "Synergy Field Monitor running"}

@api.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            kp, vsw = await asyncio.gather(get_geomag_kp(), get_solarwind_speed())
            mf = compute_mfrac(kp, vsw)
            payload = {
                "kp": round(kp, 2),
                "vsw": round(vsw, 1),
                "meltdown": mf,
            }
            await ws.send_text(json.dumps(payload))
            await asyncio.sleep(UPDATE_SECS)
    except WebSocketDisconnect:
        return
