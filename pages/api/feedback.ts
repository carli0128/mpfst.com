import type { NextApiRequest, NextApiResponse } from 'next';

const WARREN_API = process.env.WARREN_API_URL || 'https://warrenfreeman.io';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, messageIndex, rating, comment } = req.body;

  try {
    const response = await fetch(`${WARREN_API}/api/mpfst/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, messageIndex, rating, comment }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Feedback service unavailable' });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Feedback error:', err.message);
    return res.status(502).json({ error: 'Feedback service unavailable' });
  }
}
