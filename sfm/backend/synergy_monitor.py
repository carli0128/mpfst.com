"""
Very simple “Field Synergy Monitor”.

Given two numerical series of identical length (e.g. model confidence and
actual user‑engagement), it emits:

* Pearson r
* Min‑max normalised synergy score (0‑100)

Extend / replace with domain logic as required.
"""

from math import sqrt
from typing import List

def _pearson(xs: List[float], ys: List[float]) -> float:
    n = len(xs)
    sx = sum(xs); sy = sum(ys)
    sxx = sum(x*x for x in xs); syy = sum(y*y for y in ys)
    sxy = sum(x*y for x, y in zip(xs, ys))
    num = n*sxy - sx*sy
    den = sqrt((n*sxx - sx*sx) * (n*syy - sy*sy))
    return 0.0 if den == 0 else num / den

def compute_synergy(a: List[float], b: List[float]) -> dict:
    if len(a) != len(b) or len(a) < 2:
        raise ValueError("Series must have equal length ≥ 2.")
    r = _pearson(a, b)
    synergy = round((r + 1) * 50, 2)     # [-1,1] ⇒ [0,100]
    return {"pearson_r": round(r, 4), "synergy": synergy}