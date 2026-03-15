#!/bin/sh
# Write runtime env vars to .env.production so Next.js API routes can read them
# Render injects env vars at container start, but Next.js sometimes doesn't see them
echo "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY" > .env.production
exec npm start
