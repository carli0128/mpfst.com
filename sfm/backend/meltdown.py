import math

def _sigmoid(x: float) -> float:
    return 1.0 / (1.0 + math.exp(-x))

def compute_mfrac(kp: float, v_sw: float) -> float:
    kp_norm = kp / 9.0
    vsw_norm = max(0.0, v_sw - 350.0) / 450.0
    raw = 2.0 * kp_norm + 1.2 * vsw_norm
    mfrac = _sigmoid(raw * 2.5 - 2.0)
    return round(min(1.0, max(0.0, mfrac)), 3)
