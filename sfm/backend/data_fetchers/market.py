import yfinance as yf
from datetime import datetime, timedelta

def get_market(ticker: str = "SPY", days: int = 5):
    """
    Return a dict of closing prices for the last `days` trading sessions.
    Very thin wrapper around yfinance so that the rest of the backend
    stays vendor‑agnostic.

    Raises
    ------
    ValueError
        If no data is returned (bad symbol or market closed too long).
    """
    end   = datetime.utcnow()
    start = end - timedelta(days=days * 2)  # crude buffer for weekends
    data  = yf.download(ticker, start=start, end=end)
    if data.empty:
        raise ValueError(f"No market data for symbol '{ticker}'.")
    closes = data["Adj Close"].tail(days).to_dict()
    # round floats for nicer JSON
    return {k.strftime("%Y-%m-%d"): round(v, 2) for k, v in closes.items()}