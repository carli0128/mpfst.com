import aiohttp
import json
from sfm.backend.conflict import get_conflict_index

HEADERS = {"User-Agent": "SFM/1.0"}

NOAA_KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
SW_URL = "https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json"

async def get_geomag_kp() -> float:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(NOAA_KP_URL, headers=HEADERS, timeout=10) as resp:
                rows = await resp.json()
    except Exception:
        return 0.0
    for row in reversed(rows[1:]):
        try:
            kp = float(row[1])
            return kp
        except Exception:
            continue
    return 0.0

async def get_solarwind_speed() -> float:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(SW_URL, headers=HEADERS, timeout=10) as resp:
                text = await resp.text()
    except Exception:
        return 400.0
    try:
        rows = json.loads(text)
    except json.JSONDecodeError:
        rows = [line.split() for line in text.strip().splitlines()]
    for row in reversed(rows):
        try:
            speed = float(row[2])
            return speed
        except Exception:
            continue
    return 400.0


