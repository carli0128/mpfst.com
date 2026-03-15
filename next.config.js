/** @type {import('next').NextConfig} */
module.exports = {
  serverRuntimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  },
};
