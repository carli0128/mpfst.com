import aiohttp, json

HEADERS = {"User-Agent": "SFM/1.0"}

NOAA_KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
SW_URL = "https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json"

GDELT_URL = (
    "https://api.gdeltproject.org/api/v2/events/search?"
    "format=json&maxpoints=1&query="
    "(Actor1CountryCode:ISR OR Actor2CountryCode:ISR OR "
    "Actor1CountryCode:IRN OR Actor2CountryCode:IRN)"
    "&filter=EventRootCode:19"
)

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


async def get_conflict_index() -> float:
    try:
        async with aiohttp.ClientSession() as s:
            async with s.get(GDELT_URL, timeout=10) as r:
                js = await r.json()
        hits = js["features"][0]["properties"]["count"]
        return min(1.0, hits / 250)
    except Exception:
        return 0.0
