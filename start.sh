#!/bin/sh
# Write runtime env vars to a file that API routes can read with fs.readFileSync
# This bypasses Next.js's build-time env var inlining
echo "$ANTHROPIC_API_KEY" > /app/.anthropic_key
exec npm start
