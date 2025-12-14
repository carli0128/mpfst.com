import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function CanonicalBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-900/60 via-amber-700/40 to-emerald-700/30 border-b border-amber-800/60 text-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em]">
          <AlertTriangle className="w-4 h-4" />
          <span>Canonical alignment notice (v10)</span>
        </div>
        <p className="text-sm text-amber-100/90">
          MPFST&apos;s canonical reference is the &quot;MPFST Publication Manuscript (v10)&quot;. Earlier site material that framed MPFST around a
          mu–gamma–H coherence meter is preserved for transparency but is now archived as legacy and under reevaluation.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link className="underline hover:text-white" href="/MPFST-Publication-Manuscript-10.pdf" target="_blank">
            Read the canonical manuscript
          </Link>
          <Link className="underline hover:text-white" href="/experimentalists">
            Replication protocols (canonical)
          </Link>
          <Link className="underline hover:text-white" href="/#legacy">
            Legacy archive
          </Link>
        </div>
      </div>
    </div>
  );
}
