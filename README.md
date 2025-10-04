# MPFST drop‑in (component + CSS tweaks)

This ZIP contains:
- `components/MPFSTWebsite.tsx` — corrected JSX (responsive tables, no stray closing tags).
- `styles/_mpfst-mobile-fixes.css` — optional CSS guards for mobile overflow.

## How to use
1. **Copy** `components/MPFSTWebsite.tsx` into your repo at the same path, replacing the old file.
2. EITHER:
   - Do nothing else — the component already injects minimal global CSS via `styled-jsx`.
   - OR, for extra safety, **also** copy `styles/_mpfst-mobile-fixes.css` and import it in `pages/_app.tsx`:

```ts
// pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/_mpfst-mobile-fixes.css"; // add this line
```

No other changes are required.
