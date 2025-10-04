import React from "react";
import Meter from "./Meter";
import { useStream } from "./hooks";

const WS_URL = process.env.NEXT_PUBLIC_SFM_WS;

export default function SynergyFieldMonitor() {
  if (!WS_URL) {
    return (
      <div className="bg-red-700 text-white p-2">NEXT_PUBLIC_SFM_WS not set</div>
    );
  }

  const tick = useStream(WS_URL);
  if (!tick) {
  return <div className="p-4 text-gray-500">Connecting to monitor…</div>;
  }

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
          <Meter mfrac={tick.meltdownFrac} conflict={tick.conflict} />
          <p className="text-sm">
            Conflict index{' '}
            <span
              style={{
                color:
                  tick.conflict < 0.01
                    ? 'grey'
                    : tick.conflict < 0.05
                    ? '#fb923c'
                    : '#dc2626',
              }}
            >
              {tick.conflict.toFixed(3)}
            </span>
          </p>
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
