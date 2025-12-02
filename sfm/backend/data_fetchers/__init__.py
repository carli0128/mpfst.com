"""
Aggregate re‑exports so that callers can simply
    from sfm.backend.data_fetchers import get_market, get_weather, get_news
"""

from .market import get_market     # noqa: F401
from .weather import get_weather   # noqa: F401
from .news import get_news         # noqa: F401