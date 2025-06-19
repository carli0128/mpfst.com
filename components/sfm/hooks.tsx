import { useEffect, useState } from "react";

export interface Tick {
  kp: number;
  vsw: number;
  meltdownFrac: number;
  conflict: number;
}

export function useStream(endpoint?: string): Tick | null {
  const [tick, setTick] = useState<Tick | null>(null);

  useEffect(() => {
    if (!endpoint) return;

    const ws = new WebSocket(endpoint);

    ws.onmessage = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data) as Tick;
        setTick(data);
      } catch (err) {
        console.error("useStream parse error", err);
      }
    };

    ws.onerror = (err) => console.error("WebSocket error", err);

    return () => { ws.close(); };
  }, [endpoint]);

  return tick;
}
