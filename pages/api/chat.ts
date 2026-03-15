import type { NextApiRequest, NextApiResponse } from 'next';

const WARREN_API = process.env.WARREN_API_URL || 'https://warrenfreeman.io';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${WARREN_API}/api/mpfst/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId: sessionId || 'anonymous' }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Warren API error:', response.status, errText);
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.error('Warren API timeout');
      return res.status(503).json({ error: 'AI is currently busy. Please try again in a few moments.' });
    }
    console.error('Warren API connection error:', err.message);
    return res.status(502).json({ error: 'AI service temporarily unavailable' });
  }
}
