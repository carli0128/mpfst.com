# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor. To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

Docker Compose sets the WebSocket endpoint during the build. When no
`NEXT_PUBLIC_SFM_WS` is provided, the frontend falls back to the current page's
host so it works both locally and when deployed on a server.

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
