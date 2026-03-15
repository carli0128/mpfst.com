import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serverRuntimeConfig } = getConfig() || {};
  const key = serverRuntimeConfig?.anthropicApiKey || '';
  res.status(200).json({
    hasKey: key.length > 0,
    keyLen: key.length,
    keyPrefix: key ? key.substring(0, 10) + '...' : 'none',
    method: 'serverRuntimeConfig',
  });
}
