import type { NextApiRequest, NextApiResponse } from "next";
import { ensureSchema, insertSubscription } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  try {
    await ensureSchema();
    await insertSubscription(email.trim().toLowerCase());
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("subscribe error", error);
    return res.status(500).json({ error: "Unable to save subscription right now." });
  }
}
