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

## Setup

Copy `.env.example` to `.env.local` and adjust values as needed. The example
file sets `NEXT_PUBLIC_SFM_WS=ws://localhost:8000/ws` so the frontend connects
to the local backend when running via Docker Compose.

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

## Email subscriptions (Render)

The “Notify me” form now POSTs to `/api/subscribe`, which stores addresses in
Render Postgres. Provision a managed Postgres instance on Render, attach it to
the frontend service, and expose the connection string via the
`RENDER_SUBSCRIBER_DB_URL` environment variable (see `render.yaml`).

The API automatically runs:

```sql
CREATE EXTENSION IF NOT EXISTS citext;
CREATE TABLE IF NOT EXISTS email_subscriptions (
	id SERIAL PRIMARY KEY,
	email CITEXT UNIQUE NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

You can query the latest signups from psql:

```sql
SELECT email, created_at FROM email_subscriptions ORDER BY created_at DESC LIMIT 50;
```

This keeps the mailing list entirely within your Render footprint.

### Automated CSV + email export

Run `npm run export:subscribers` to generate a timestamped CSV (written to
`./exports`) and email it to the configured recipient. The script expects the
following environment variables (add them to `.env.local` or your Render cron
job):

| Variable | Description |
| --- | --- |
| `RENDER_SUBSCRIBER_DB_URL` | Postgres connection string (already used by the site). |
| `SMTP_HOST` | SMTP server hostname (e.g., `smtp.sendgrid.net`). |
| `SMTP_PORT` | SMTP port (defaults to `587`). Set to `465` and `SMTP_SECURE=true` for implicit TLS. |
| `SMTP_USER` / `SMTP_PASS` | Credentials for the SMTP server (leave unset for unauthenticated relays). |
| `SMTP_SECURE` | Set to `true` if your SMTP provider requires TLS on connect. |
| `SUBSCRIBER_EXPORT_FROM` | From email address (default `no-reply@mpfst.com`). |
| `SUBSCRIBER_EXPORT_TO` | Recipient email (default `carlos@mpfst.com`). |

You can schedule the command using a Render Cron Job or any CI runner. For
example, create a cron job in Render that executes `npm install && npm run
export:subscribers` daily with the same environment variables as the frontend
service.
