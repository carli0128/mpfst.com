import { useEffect, useState } from "react";

export interface Tick {
  kp: number;
  vsw: number;
  meltdown: number;
}

export function useStream(endpoint: string) {
  const [tick, setTick] = useState<Tick | null>(null);

  useEffect(() => {
    const ws = new WebSocket(endpoint);
    ws.onmessage = (ev) => setTick(JSON.parse(ev.data));
    return () => ws.close();
  }, [endpoint]);

  return tick;
}
