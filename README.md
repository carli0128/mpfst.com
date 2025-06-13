# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor. To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

Docker Compose provides the WebSocket endpoint (`ws://localhost:8000/ws`) to the
Next.js build so the browser can connect to the backend service.

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
