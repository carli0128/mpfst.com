import React from "react";
import Meter from "./Meter";
import { useStream } from "./hooks";

const WS_URL = process.env.NEXT_PUBLIC_SFM_WS;

if (!WS_URL) {
  console.error("NEXT_PUBLIC_SFM_WS not set");
}

export default function SynergyFieldMonitor() {
  const tick = useStream(WS_URL);

  return (
    <div className="text-white space-y-2">
      <h3 className="text-xl font-semibold">Synergy Field Monitor – Live</h3>
      {!tick ? (
        <p>Connecting to backend…</p>
      ) : (
        <>
          <p className="text-sm text-gray-300">
            Kp {tick.kp} | Solar-wind {tick.vsw} km/s
          </p>
          <Meter mfrac={tick.meltdownFrac} />
          <p>
            meltdownFrac {tick.meltdownFrac.toFixed(2)} {" "}
            {tick.meltdownFrac >= 0.75
              ? "⚠️ High stress"
              : tick.meltdownFrac <= 0.4
              ? "✅ Coherent"
              : "↔︎ Moderate"}
          </p>
          <small className="text-gray-400">Data refresh every 60 s.</small>
        </>
      )}
    </div>
  );
}
