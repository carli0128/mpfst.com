import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { PAPERS, FIELDS, STATS } from '@/components/data';

// ─── Build comprehensive MPFST knowledge base for the system prompt ───
function buildSystemPrompt(): string {
  const paperSummaries = PAPERS.map(p =>
    `Paper ${p.id}: "${p.title}" (${p.field})\n` +
    `  DOI: ${STATS.zenodoBase}${p.doi.replace('10.5281/zenodo.', '')}\n` +
    `  Key result: ${p.keyResult}\n` +
    `  Data: ${p.dataPoints}\n` +
    `  Prediction: ${p.prediction}\n` +
    `  Data source: ${p.dataSource}\n` +
    `  How to reproduce: ${p.howToReproduce}\n` +
    `  Domains: ${p.domains.join(', ')}` +
    (p.journalStatus ? `\n  Journal: ${p.journalStatus}` : '')
  ).join('\n\n');

  const fieldSummaries = FIELDS.map(f =>
    `${f.name}: ${f.papers.length} paper(s) — Papers ${f.papers.join(', ')}`
  ).join('\n');

  return `You are a research assistant for MPFST (Multi-Plane Field Syntergic Theory), created by Carlos W. Freeman (ORCID: ${STATS.orcid}).

## What is MPFST?
MPFST is a coupled PDE framework built on an 11-node graph called the Sephirotic graph (the 10 Sephirot of Kabbalah plus Da'at, connected by 24 edges). The central result: the 6th eigenvalue of this graph's normalized Laplacian is EXACTLY α = 6/5 = 1.2 (to machine precision, error < 10⁻¹⁶). This single topological constant — derived from pure mathematics, not fitted to data — predicts observables across ${STATS.domains} physical domains with zero free parameters.

The operator is the fractional Laplacian (-Δ)^(α/2) with α = 6/5. This replaces the standard Laplacian (-Δ) used in conventional physics (which corresponds to α = 2). The fractional exponent introduces power-law tails, anomalous transport, and long-range correlations that standard physics cannot produce.

## Current Status
- ${STATS.papers} peer-reviewed preprints on Zenodo + 1 PRL letter submitted (accession: ${STATS.prlAccession})
- ${STATS.domains} physical domains predicted from 1 parameter
- Author: ${STATS.author}
- All papers freely available on Zenodo

## The 11-Node Sephirotic Graph
Nodes: Keter (Crown), Chokmah (Wisdom), Binah (Understanding), Da'at (Knowledge), Chesed (Mercy), Gevurah (Severity), Tiferet (Beauty), Netzach (Victory), Hod (Splendor), Yesod (Foundation), Malkuth (Kingdom).
24 edges connecting them in the traditional Kabbalistic tree plus Da'at connections.
Da'at connects ONLY to Chokmah and Binah. Tiferet has the highest degree (8).
The key eigenmode (Mode 6, λ = 6/5) is the bilateral symmetry mode: Chokmah–Netzach anti-phase with Binah–Hod, middle pillar at zero.

## All ${STATS.papers} Papers

${paperSummaries}

## PRL Letter (submitted)
Title: "One Topological Constant Predicts Thirteen Physical Domains: Fractional Dynamics on an 11-Node Graph"
Accession: ${STATS.prlAccession}
DOI: 10.5281/zenodo.18898117
Status: Desk rejected by PRL. Being resubmitted to other journals.

## All ${STATS.domains} Domains by Field

${fieldSummaries}

## Key Facts
- α = 6/5 is NOT a fitted parameter. It is an exact eigenvalue of the Sephirotic graph (Paper 9).
- Every prediction uses the SAME α = 6/5. No domain-specific tuning.
- Standard physics corresponds to α = 2. MPFST modifies this to α = 6/5 based on topology.
- The theory recovers standard results (GR, QFT, QM) in the limit α → 2 (Paper 6, 11).
- Strongest statistical results: Fusion plasma (χ² = 7.75, 55 dof, p ≈ 1.0), LHC dijets (6.7σ), EEG (p = 0.0097), GW echoes (3.7σ combined).
- Patent filed: US Provisional 64/002,513 — Threshold Oscillator Energy Generator using Sephirotic topology.

## What Would Disprove MPFST?
1. If α = 6/5 is NOT an exact eigenvalue of the correct Sephirotic graph → theory collapses
2. If any domain shows data INCONSISTENT with α = 6/5 predictions at high statistical significance
3. If the fractional Laplacian with α = 6/5 fails to recover GR/QFT in the α → 2 limit
4. If the coupled PDE system is mathematically ill-posed (contradicted by Paper 10)

## Your Behavior
- Answer questions about MPFST accurately using the paper data above
- Be direct and scientific — cite specific papers, numbers, and DOIs
- If asked about something not covered by MPFST, say so honestly
- If asked to compare with other theories, be fair but highlight MPFST's zero-parameter advantage
- Keep responses concise but substantive
- When citing papers, include the DOI link
- You are NOT Warren (Carlos's AI assistant). You are the mpfst.com research chatbot.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

// Rate limiting: simple in-memory store (resets on cold start, good enough for Render)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 minute window
    return true;
  }
  if (entry.count >= 10) return false; // 10 messages per minute
  entry.count++;
  return true;
}

// Simple conversation memory per session (max 20 messages)
const sessions = new Map<string, Array<{ role: string; content: string }>>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Read API key from file written by start.sh at container startup
  // This bypasses Next.js build-time env var inlining
  let apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    try { apiKey = readFileSync('/app/.anthropic_key', 'utf8').trim(); } catch {}
  }
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not available at runtime');
    return res.status(500).json({ error: 'AI service not configured' });
  }

  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 characters)' });
  }

  // Rate limit by IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // Get or create session history
  const sid = sessionId || ip;
  let history = sessions.get(sid) || [];
  history.push({ role: 'user', content: message });

  // Keep only last 20 messages to avoid token overflow
  if (history.length > 20) {
    history = history.slice(-20);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000); // 30s timeout

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: history.map(m => ({ role: m.role, content: m.content })),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'No response generated.';

    // Save assistant response to session
    history.push({ role: 'assistant', content: reply });
    sessions.set(sid, history);

    // Cleanup old sessions (keep max 500)
    if (sessions.size > 500) {
      const oldest = sessions.keys().next().value;
      if (oldest) sessions.delete(oldest);
    }

    return res.status(200).json({ reply });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return res.status(503).json({ error: 'Request timed out. Please try again.' });
    }
    console.error('Chat API error:', err.message);
    return res.status(502).json({ error: 'AI service temporarily unavailable' });
  }
}
