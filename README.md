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
Conflict index is derived from ACLED daily fatality counts mapped to HRV-drop
severity (see `./sfm/backend/conflict.py`).

## Chat-Brain

![chat demo](./public/chat-demo.gif)

The site includes a lightweight chat interface powered by the RIL virtual
machine. Click the floating brain button to open the drawer. Messages are
proxied through `/brain/ws/chat` on the backend.

Set **both** environment variables:

- `RIL_ENTROPY_BUDGET` on the backend (e.g. `30000`)
- `NEXT_PUBLIC_CHAT_WS` on the frontend
The site is now deployed as **two Render services** (frontend & backend).  
`NEXT_PUBLIC_CHAT_WS` must point to  
`wss://mpfst-backend.onrender.com/brain/ws/chat`

If the chat panel simply echoes your input the VM binary was not copied
successfully – redeploy the backend and check container logs for `RIL-VM ready`.

| Host | Env var | Value |
|------|---------|-------|
| Render backend | SFM_UPDATE_SEC | 60 |
| Render backend | RIL_ENTROPY_BUDGET | 30000 |
| Render backend | ACLED_EMAIL | your@email |
| Render backend | ACLED_API_TOKEN | set-in-render |
| Vercel frontend | NEXT_PUBLIC_SFM_WS | wss://mpfst-com.onrender.com/ws |

The web interface will be available at <http://localhost:3000> and streams
real-time `meltdownFrac` values under the **Synergy Field Monitor** tab.
