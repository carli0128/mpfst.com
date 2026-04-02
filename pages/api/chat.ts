import type { NextApiRequest, NextApiResponse } from 'next';

// Rate limiting: simple in-memory store (resets on cold start)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 minute window
    return true;
  }
  if (entry.count >= 15) return false; // 15 messages per minute
  entry.count++;
  return true;
}

// Session management - store last few messages per session
const sessions = new Map<string, Array<{ role: string; content: string }>>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  if (message.length > 3000) {
    return res.status(400).json({ error: 'Message too long (max 3000 characters)' });
  }

  // Rate limit by IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // Get session history for context
  const sid = sessionId || ip;
  const history = sessions.get(sid) || [];
  const recentMessages = history.slice(-6); // Last 6 messages for context

  // Build system prompt for MPFST research assistant
  const systemPrompt = `You are a research assistant for MPFST (Multi-Plane Field Syntergic Theory) by Carlos W. Freeman.

Key facts:
- 28 papers published on Zenodo covering 30 physical domains
- 1 PRL letter submitted (LQ19911, desk rejected)
- Core result: α = 6/5 exact eigenvalue of 11-node Sephirotic graph predicts phenomena across physics
- Zero free parameters - same α = 6/5 works for quantum mechanics, cosmology, particle physics, neuroscience
- Papers available at zenodo.org (DOI prefix 10.5281/zenodo.)
- Strong results: Fusion plasma (p≈1.0, Paper 12), GW spatial modes (4.7σ, Paper 26), MEG independent confirmation (608 subjects, Paper 28), EEG coupling (p=0.0097, Paper 2), Qubit decoherence (zero free params, Paper 8), iEEG spectral exponents (χ²=0.74 p=0.994, Paper 27)
- Recent updates: Papers 14v2, 15v2, 27v2, 28v2 published with corrected canonical graph results
- Mapping Protocol: 5 categories (A: Spectral, B: Transport, C: Topological, D: Propagator, E: Thermodynamic)

Answer questions about MPFST research accurately. Cite specific papers and numbers when relevant. Be direct and scientific.`;

  try {
    // Proxy to Warren gateway via public tunnel
    const warrenUrl = 'https://warrenfreeman.io/v1/chat/completions';
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25_000);

    const response = await fetch(warrenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer warren-internal', // Internal auth
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1800,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          ...recentMessages,
          { role: 'user', content: message }
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Fallback - if Warren is down, return helpful message
      if (response.status >= 500) {
        return res.status(200).json({ 
          reply: "I'm temporarily unavailable. For MPFST research questions, please see the Papers and Domains sections of this website, or contact carlos@mpfst.com directly." 
        });
      }
      throw new Error(`Warren gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response generated.';

    // Save to session history
    const newHistory = [
      ...recentMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    ].slice(-8); // Keep max 8 messages

    sessions.set(sid, newHistory);

    // Cleanup old sessions periodically
    if (sessions.size > 200) {
      const oldest = sessions.keys().next().value;
      if (oldest) sessions.delete(oldest);
    }

    return res.status(200).json({ reply });

  } catch (err: any) {
    console.error('Chat proxy error:', err.message);
    
    if (err.name === 'AbortError') {
      return res.status(503).json({ error: 'Request timed out. Please try again.' });
    }

    // Generic fallback
    return res.status(200).json({ 
      reply: "I'm having technical difficulties. For MPFST questions, please see the research papers and domain coverage on this website." 
    });
  }
}
