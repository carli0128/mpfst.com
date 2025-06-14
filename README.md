# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor. To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

Docker Compose passes the WebSocket endpoint to the frontend so it can reach the
backend container. The URL defaults to `ws://backend:8000/ws`, but you can set a
custom value with `NEXT_PUBLIC_SFM_WS`.

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
