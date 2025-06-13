# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor. To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

The frontend automatically connects to the same host that serves the page. You
can override the WebSocket URL with `NEXT_PUBLIC_SFM_WS`, but this is optional
for typical local and server deployments.

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
