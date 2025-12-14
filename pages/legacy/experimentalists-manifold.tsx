import React from "react";
import Link from "next/link";
import { card as Card, CardContent } from "@/components/ui/card";
import CanonicalBanner from "@/components/CanonicalBanner";
import ExperimentalistsPage from "@/components/ExperimentalistsPage";
import { AlertTriangle, Archive, FileText } from "lucide-react";

export default function LegacyExperimentalists() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <CanonicalBanner />
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <header className="py-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Archived / legacy</p>
          <h1 className="text-3xl md:text-4xl font-bold">Legacy experimentalists guide (mu–gamma–H coherence meter)</h1>
          <p className="text-gray-200 text-lg">
            This page preserves the prior mu–gamma–H manifold protocol for transparency. It is under reevaluation and is not the canonical gate
            definition for MPFST. The canonical replication protocol is the meltdownFrac gate described on the main experimentalists page.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white" href="/experimentalists">
              <FileText className="w-4 h-4" /> View canonical protocol
            </Link>
            <Link className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold border border-gray-700 text-white hover:border-white" href="/MPFST-Publication-Manuscript-10.pdf" target="_blank">
              <Archive className="w-4 h-4" /> Canonical manuscript (v10)
            </Link>
          </div>
          <p className="text-amber-200 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Legacy mℓ/ mu–gamma–H framing is not the MPFST gate and should be used only for historical reproducibility.
          </p>
        </header>

        <Card className="bg-gray-900/80 border border-amber-800/70">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Archive className="w-5 h-5 text-amber-300" />
              Legacy protocol steps (summary)
            </h2>
            <p className="text-gray-200">
              The legacy pipeline framed coherence around a mu–gamma–H manifold and a derived score mℓ(mu,gamma,H). It was intended as an observational proxy across datasets, not as the canonical gate. Use only for reproducing prior analyses.
            </p>
            <p className="text-amber-200 text-sm">Warning: this content is archived and under reevaluation relative to the canonical meltdownFrac gate.</p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <ExperimentalistsPage />
        </div>
      </div>
    </div>
  );
}
