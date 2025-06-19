from fastapi import FastAPI, Body
from sfm.backend.chat_router import router as chat_router
from sfm.backend import data_fetchers
from sfm.backend.synergy_monitor import compute_synergy

# Rename to 'app' so uvicorn (and other hosts) find it by default
app = FastAPI(
    title="MPFST Backend",
    version="0.1.0",
    docs_url="/",  # serve the OpenAPI UI at /
)

# mount the /chat router
app.include_router(chat_router)


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
    return {"synergy": compute_synergy(a, b)}
