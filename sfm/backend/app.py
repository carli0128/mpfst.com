from fastapi import FastAPI, Body, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sfm.backend.chat_router import router as chat_router
from sfm.backend.sfm_ws import router as sfm_ws_router
from sfm.backend import data_fetchers
from sfm.backend.synergy_monitor import compute_synergy
from sfm.backend.meltdownFrac import compute_mfrac
from sfm.backend.conflict import get_conflict_index
import asyncio
import os
import importlib.util

_DF_SPEC = importlib.util.spec_from_file_location(
    "sfm.backend.data_fetchers_async",
    os.path.join(os.path.dirname(__file__), "data_fetchers.py"),
)
data_fetch_async = importlib.util.module_from_spec(_DF_SPEC)
_DF_SPEC.loader.exec_module(data_fetch_async)  # type: ignore

app = FastAPI(
    title="MPFST Backend",
    version="0.1.0",
    docs_url="/",  # serve the OpenAPI UI at /
)

# Allow CORS for front-end communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mpfst.com"],  # Replace "*" with "https://mpfst.com" in production
    allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE", "WS"],
    allow_headers=["*"],
)

# Mount the chat router under /brain/ws
app.include_router(chat_router, prefix="/brain/ws")
app.include_router(sfm_ws_router)

# ------------------------------------------
# REST API ROUTES
# ------------------------------------------

@app.get("/version")
def version():
    return {"version": app.version}


@app.get("/market/{ticker}")
def market(ticker: str):
    return data_fetchers.get_market(ticker)


@app.get("/weather")
def weather(lat: float, lon: float):
    return data_fetchers.get_weather(lat, lon)


@app.get("/news")
def news(max_items: int = 5):
    return data_fetchers.get_news(max_items=max_items)


@app.post("/synergy")
def synergy(
    a: list[float] = Body(..., description="first numeric vector"),
    b: list[float] = Body(..., description="second numeric vector"),
):
    """
    Expects JSON body:
    {
      "a": [1.2, 3.4, …],
      "b": [5.6, 7.8, …]
    }
    """
    result = compute_synergy(a, b)
    return {"synergy": result}

# ------------------------------------------
# WEBSOCKET ROUTE FOR SYNERGY FIELD MONITOR
# ------------------------------------------

@app.websocket("/ws")
async def websocket_synergy(websocket: WebSocket):
    """Stream synergy metrics every ``SFM_UPDATE_SEC`` seconds (default 60)."""
    await websocket.accept()
    try:
        update = int(os.getenv("SFM_UPDATE_SEC", "60"))
        while True:
            kp, vsw, conflict = await asyncio.gather(
                data_fetch_async.get_geomag_kp(),
                data_fetch_async.get_solarwind_speed(),
                get_conflict_index(),
            )
            mfrac = compute_mfrac(kp, vsw, conflict)
            tick = {
                "kp": kp,
                "vsw": vsw,
                "meltdownFrac": mfrac,
                "conflict": conflict,
            }
            await websocket.send_json(tick)
            await asyncio.sleep(update)
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()
