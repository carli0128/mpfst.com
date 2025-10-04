# MPFST isolatedModules fix (drop‑in)

This ZIP contains:
- `components/MPFSTWebsite.tsx` — **Client Component** with imports + `export {}` to satisfy `--isolatedModules`.
- `styles/_mpfst-mobile-fixes.css` — optional CSS helpers to prevent horizontal overflow on phones.

## How to use
1. Copy `components/MPFSTWebsite.tsx` into your repo (same path), replacing the current file.
2. (Optional) Copy `styles/_mpfst-mobile-fixes.css` and import it from `pages/_app.tsx`:

```ts
import "@/styles/_mpfst-mobile-fixes.css";
```

No other changes are required. Build should succeed on Next.js 15.x with TypeScript `isolatedModules: true`.
