# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor. To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

Docker Compose passes the WebSocket endpoint to the frontend so the browser
connects to the backend service. By default the frontend uses
`ws://localhost:8000/ws`. When deploying to another host you can set
`NEXT_PUBLIC_SFM_WS` (for example `wss://your-domain/ws`) to point at the
backend API.

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
