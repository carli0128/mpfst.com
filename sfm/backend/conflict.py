import os
import aiohttp
import datetime
import json
import pathlib

ACLED_KEY = os.getenv("ACLED_API_TOKEN", "")
ACLED_EMAIL = os.getenv("ACLED_EMAIL", "")
WORLD_POP = 8_000_000_000
POP_FILE = pathlib.Path(__file__).with_name("population.json")
POP = json.loads(POP_FILE.read_text())

async def _fatalities_today(iso: str) -> int:
    if not ACLED_KEY or not ACLED_EMAIL:
        return 0
    today = datetime.date.today().isoformat()
    url = (
        "https://api.acleddata.com/acled/readme"
        f"?email={ACLED_EMAIL}&key={ACLED_KEY}"
        f"&iso={iso}&event_date={today}&fields=fatalities"
    )
    async with aiohttp.ClientSession() as s:
        async with s.get(url, timeout=10) as r:
            js = await r.json()
    return sum(int(ev.get("fatalities", 0) or 0) for ev in js.get("data", []))

ISO_WATCH = ["UKR", "RUS", "ISR", "IRN", "PSE"]

async def get_conflict_index() -> float:
    tot = 0.0
    for iso in ISO_WATCH:
        fat = await _fatalities_today(iso)
        if fat < 25:
            hrvd = 0.10
        elif fat < 250:
            hrvd = 0.30
        elif fat < 1000:
            hrvd = 0.50
        else:
            hrvd = 0.70
        pop = POP.get(iso, 0)
        tot += (pop / WORLD_POP) * hrvd
    return round(min(tot, 1.0), 4)
