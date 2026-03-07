import { Pool } from "pg";

const connectionString = process.env.RENDER_SUBSCRIBER_DB_URL ?? process.env.DATABASE_URL;

let pool: Pool | null = null;

function getPool() {
  if (!connectionString) {
    throw new Error(
      "Missing RENDER_SUBSCRIBER_DB_URL (or DATABASE_URL) env variable for subscriber storage."
    );
  }

  if (!pool) {
    pool = new Pool({ connectionString });
  }

  return pool;
}

export async function ensureSchema() {
  const client = await getPool().connect();
  try {
    await client.query("CREATE EXTENSION IF NOT EXISTS citext;");
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_subscriptions (
        id SERIAL PRIMARY KEY,
        email CITEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}

export async function insertSubscription(email: string) {
  const client = await getPool().connect();
  try {
    await client.query(
      `INSERT INTO email_subscriptions (email) VALUES ($1)
       ON CONFLICT (email) DO NOTHING`,
      [email]
    );
  } finally {
    client.release();
  }
}
