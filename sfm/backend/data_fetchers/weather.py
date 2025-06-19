import requests
from typing import Dict

_OPENMETEO = "https://api.open-meteo.com/v1/forecast"

def get_weather(lat: float, lon: float) -> Dict:
    params = {
        "latitude":  lat,
        "longitude": lon,
        "hourly":    "temperature_2m,precipitation",
        "forecast_days": 1,
        "timezone":  "UTC",
    }
    r = requests.get(_OPENMETEO, params=params, timeout=10)
    r.raise_for_status()
    return r.json()