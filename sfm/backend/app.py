from fastapi import FastAPI

from sfm.backend import data_fetchers
from sfm.backend.synergy_monitor import compute_synergy
from sfm.backend.chat_router import router as chat_router

api = FastAPI(
    title="MPFST Backend",
    version="0.1.0",
    docs_url="/",   # easier when testing on Render
)

api.include_router(chat_router)


@api.get("/version")
def version():
    return {"version": api.version}


# ---------- simple demo routes using the new helpers ----------
@api.get("/market/{ticker}")
def market(ticker: str):
    return data_fetchers.get_market(ticker)


@api.get("/weather")
def weather(lat: float, lon: float):
    return data_fetchers.get_weather(lat, lon)


@api.get("/news")
def news(max_items: int = 5):
    return data_fetchers.get_news(max_items=max_items)


@api.post("/synergy")
def synergy(a: list[float], b: list[float]):
    return compute_synergy(a, b)
