import math

def _sigmoid(x: float) -> float:
    return 1.0 / (1.0 + math.exp(-x))

def compute_mfrac(kp: float, v_sw: float, conflict: float = 0.0) -> float:
    kp_n = kp / 9
    vsw_n = max(0.0, v_sw - 350) / 450
    raw = 1.2 * kp_n + 0.9 * vsw_n + 1.5 * conflict
    mfrac = _sigmoid(raw * 2.2 - 1.3)
    return round(mfrac, 3)
