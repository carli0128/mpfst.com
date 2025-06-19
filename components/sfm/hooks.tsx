import { useEffect, useState } from "react";

export interface Tick {
  kp: number;
  vsw: number;
  meltdownFrac: number;
  conflict: number;
}

export function useStream(endpoint?: string) {
  const ws = new WebSocket(endpoint);
  const [tick, setTick] = useState<Tick | null>(null);

  useEffect(() => {
    if (!endpoint) return;
    const WS_URL = process.env.NEXT_PUBLIC_SFM_WS;
    ws.onmessage = (ev) => setTick(JSON.parse(ev.data));
    return () => ws.close();
  }, [endpoint]);

  return tick;
}
