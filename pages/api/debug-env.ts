import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dynamic access prevents webpack inlining
  const envName = 'ANTHROPIC_API_KEY';
  const envKey = process.env[envName];
  
  // Check ALL env vars that start with ANTHRO
  const anthroVars = Object.keys(process.env).filter(k => k.toLowerCase().includes('anthro'));
  
  res.json({
    envKeySet: !!envKey,
    envKeyLen: envKey?.length || 0,
    envKeyPrefix: envKey?.substring(0, 12) || 'none',
    anthroVars,
    totalEnvVars: Object.keys(process.env).length,
    nodeEnv: process.env.NODE_ENV,
    cwd: process.cwd(),
  });
}
