// components/sfm/hooks.tsx
import { useEffect, useState } from "react";

export interface Tick {
  kp: number;
  vsw: number;
  meltdownFrac: number;
  conflict: number;
}

/**
 * Opens a WebSocket to `endpoint` and parses incoming JSON Tick messages.
 * Returns the latest Tick, or null while connecting.
 */
export function useStream(endpoint?: string): Tick | null {
  const [tick, setTick] = useState<Tick | null>(null);

  useEffect(() => {
    if (!endpoint) {
      console.warn("useStream: no endpoint provided");
      return;
    }

    const ws = new WebSocket(endpoint);

    ws.onmessage = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data) as Tick;
        setTick(data);
      } catch (err) {
        console.error("useStream: failed to parse JSON", err);
      }
    };

    ws.onerror = (err: Event | unknown) => {
      console.error("useStream WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [endpoint]);

  return tick;
}
