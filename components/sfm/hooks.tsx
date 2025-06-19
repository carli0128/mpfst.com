import { useEffect, useState } from "react";

export interface Tick {
  kp: number;
  vsw: number;
  meltdownFrac: number;
  conflict: number;
}

export function useStream(endpoint?: string) {
  const [tick, setTick] = useState<Tick | null>(null);

  useEffect(() => {
    // don’t even try if we don’t have a URL
    if (!endpoint) {
      console.warn("useStream: no endpoint provided");
      return;
    }

    // now endpoint is narrowed to string
    const ws = new WebSocket(endpoint);

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data) as Tick;
        setTick(data);
      } catch (err) {
        console.error("useStream: failed to parse message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("useStream WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [endpoint]);

  return tick;
}
