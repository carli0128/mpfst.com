import "dotenv/config";
import { Pool } from "pg";
import nodemailer from "nodemailer";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

const connectionString =
  process.env.RENDER_SUBSCRIBER_DB_URL ?? process.env.DATABASE_URL;

const exportDir = path.resolve(process.cwd(), "exports");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const csvFilename = `subscribers-${timestamp}.csv`;

async function fetchSubscribers() {
  if (!connectionString) {
    throw new Error(
      "Missing RENDER_SUBSCRIBER_DB_URL/DATABASE_URL for subscriber export"
    );
  }

  const pool = new Pool({ connectionString });
  try {
    const result = await pool.query(
      "SELECT email, created_at FROM email_subscriptions ORDER BY created_at DESC"
    );
    return result.rows;
  } finally {
    await pool.end();
  }
}

function toCsv(rows: Array<{ email: string; created_at: Date }>) {
  const header = "email,created_at";
  const lines = rows.map((row) => {
    const date =
      typeof row.created_at === "string"
        ? row.created_at
        : row.created_at.toISOString();
    return `${row.email},${date}`;
  });
  return [header, ...lines].join("\n");
}

async function sendEmail(csv: string, count: number) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const from = process.env.SUBSCRIBER_EXPORT_FROM ?? "no-reply@mpfst.com";
  const to = process.env.SUBSCRIBER_EXPORT_TO ?? "carlos@mpfst.com";

  if (!smtpHost) {
    console.warn(
      "Skipping email delivery because SMTP_HOST is not configured. The CSV was saved locally."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth:
      smtpUser && smtpPass
        ? {
            user: smtpUser,
            pass: smtpPass,
          }
        : undefined,
  });

  await transporter.sendMail({
    from,
    to,
    subject: `MPFST subscriber export (${count} contacts)` ,
    text: `Attached is the latest subscriber export with ${count} addresses collected at ${new Date().toLocaleString()}.`,
    attachments: [
      {
        filename: csvFilename,
        content: csv,
        contentType: "text/csv",
      },
    ],
  });
}

async function main() {
  const rows = await fetchSubscribers();
  if (!rows.length) {
    console.log("No subscribers found.");
    return;
  }

  const csv = toCsv(rows);
  mkdirSync(exportDir, { recursive: true });
  const filePath = path.join(exportDir, csvFilename);
  writeFileSync(filePath, `${csv}\n`, "utf8");
  console.log(`Saved CSV to ${filePath}`);

  await sendEmail(csv, rows.length);
  console.log("Export complete");
}

main().catch((error) => {
  console.error("Failed to export subscribers", error);
  process.exitCode = 1;
});