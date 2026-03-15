import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const keys = Object.keys(process.env).filter(k => 
    k.includes('ANTHROPIC') || k.includes('PORT') || k.includes('NODE') || k.includes('SFM')
  );
  res.json({ 
    envKeys: keys,
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    keyLength: process.env.ANTHROPIC_API_KEY?.length || 0,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
  });
}
