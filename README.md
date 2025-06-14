# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor.  To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.

If the `NEXT_PUBLIC_SFM_WS` environment variable is not set, the monitor
automatically falls back to `window.location` to locate the WebSocket backend.
