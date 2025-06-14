# MPFST Website

This project hosts the MPFST portal and the Synergy Field Monitor. To start
both the Next.js front-end and the FastAPI backend, run:

```bash
docker-compose up --build
```

Docker Compose passes `NEXT_PUBLIC_SFM_WS` to the frontend so browsers
connect to the backend service. When deploying to Vercel you must define this
environment variable (for example `wss://your-backend-domain/ws`) so the
Synergy Field Monitor can reach the API. Make sure the backend is deployed
with the latest code so it exposes the `meltdownFrac` field.

| Host | Env var | Value |
|------|---------|-------|
| Render backend | SFM_UPDATE_SEC | 60 |
| Vercel frontend | NEXT_PUBLIC_SFM_WS | wss://mpfst-com.onrender.com/ws |

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
