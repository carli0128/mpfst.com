import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // List ALL env var keys to see what Render injects
  const allKeys = Object.keys(process.env).sort();
  
  // Check for our key specifically
  const hasKey = 'ANTHROPIC_API_KEY' in process.env;
  const keyVal = process.env['ANTHROPIC_API_KEY'];
  
  // Look for any key with API or KEY in the name
  const apiKeys = allKeys.filter(k => k.includes('API') || k.includes('KEY') || k.includes('SECRET'));
  
  // Render-specific vars
  const renderVars = allKeys.filter(k => k.startsWith('RENDER'));
  
  res.status(200).json({
    hasKey,
    keyLen: keyVal ? keyVal.length : 0,
    apiRelatedKeys: apiKeys,
    renderVars,
    totalKeys: allKeys.length,
    // Show first 30 chars of each key
    allKeyNames: allKeys,
  });
}
