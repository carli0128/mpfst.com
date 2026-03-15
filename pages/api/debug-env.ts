import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync, existsSync } from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const envKey = process.env.ANTHROPIC_API_KEY;
  const fileExists = existsSync('/app/.anthropic_key');
  let fileKey = '';
  try { fileKey = readFileSync('/app/.anthropic_key', 'utf8').trim(); } catch (e: any) { fileKey = `error: ${e.message}`; }
  
  // Check ALL env vars that start with ANTHRO
  const anthroVars = Object.keys(process.env).filter(k => k.toLowerCase().includes('anthro'));
  
  res.json({
    envKeySet: !!envKey,
    envKeyLen: envKey?.length || 0,
    fileExists,
    fileKeyLen: fileKey.length,
    fileKeyPrefix: fileKey.substring(0, 10),
    anthroVars,
    totalEnvVars: Object.keys(process.env).length,
    nodeEnv: process.env.NODE_ENV,
    cwd: process.cwd(),
  });
}
