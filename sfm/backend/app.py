# backend/app/app.py  (renómbralo o ajusta el import según tu estructura)

from fastapi import FastAPI, Body, WebSocket, WebSocketDisconnect
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

# ---------------------------------------------------------------------------
#  Dynamically‑loaded async data‑fetcher (unchanged)
# ---------------------------------------------------------------------------
_DF_SPEC = importlib.util.spec_from_file_location(
    "sfm.backend.data_fetchers_async",
    os.path.join(os.path.dirname(__file__), "data_fetchers.py"),
)
data_fetch_async = importlib.util.module_from_spec(_DF_SPEC)
_DF_SPEC.loader.exec_module(data_fetch_async)  # type: ignore

# ---------------------------------------------------------------------------
#  FastAPI application
# ---------------------------------------------------------------------------
app = FastAPI(
    title="MPFST Backend",
    version="0.1.0",
    docs_url="/",  # OpenAPI UI at root
)

# ---------------------------  C O R S  -------------------------------------
ALLOWED_ORIGINS = [
    "https://mpfst-frontend.onrender.com",  # producción
    "http://localhost:3000",                # dev local (opcional)
    "https://mpfst.com",                    # dominio principal (si sirve assets)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,      # imprescindible si algún día envías cookies
    allow_methods=["*"],         # GET, POST, PUT, etc.
    allow_headers=["*"],         # Authorization, Content‑Type…
)

# ---------------------------  R O U T E R S  -------------------------------
# Chat:  /chat/sse   y   /chat/ws
app.include_router(chat_router, prefix="/chat")

# Synergy Field Monitor:  /sfm/ws
app.include_router(sfm_ws_router, prefix="/sfm")

# ---------------------------  REST  API  -----------------------------------
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

# -----------------  WebSocket fallback (optional)  -------------------------
# Si ya tienes `sfm_ws_router` con /sfm/ws puedes borrar este handler.
@app.websocket("/sfm/ws")
async def websocket_synergy(websocket: WebSocket):
    """Stream synergy metrics every ``SFM_UPDATE_SEC`` seconds (default 60)."""
    await websocket.accept()
    update = int(os.getenv("SFM_UPDATE_SEC", "60"))

    try:
        while True:
            kp, vsw, conflict = await asyncio.gather(
                data_fetch_async.get_geomag_kp(),
                data_fetch_async.get_solarwind_speed(),
                get_conflict_index(),
            )
            mfrac = compute_mfrac(kp, vsw, conflict)
            await websocket.send_json(
                {"kp": kp, "vsw": vsw, "meltdownFrac": mfrac, "conflict": conflict}
            )
            await asyncio.sleep(update)
    except (WebSocketDisconnect, asyncio.CancelledError):
        pass
    except Exception as e:
        # Log y cierre limpio
        print(f"[WebSocket] error: {e}")
        await websocket.close()

