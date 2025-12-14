import React from "react";
import Link from "next/link";
import { card as Card, CardContent } from "@/components/ui/card";
import CanonicalBanner from "@/components/CanonicalBanner";
import { AlertTriangle, Beaker, Compass, FileText, ShieldCheck } from "lucide-react";

export default function Experimentalists() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <CanonicalBanner />
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <header className="py-10 space-y-5">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Canonical replication</p>
            <h1 className="text-3xl md:text-4xl font-bold">Replication protocols for experimentalists (canonical, v10)</h1>
            <p className="text-gray-200 text-lg">
              Recommended workflows for testing MPFST using the canonical gate definition (meltdown threshold + meltdownFrac). Older protocols that compute mu, gamma, H and mℓ are preserved as legacy proxies and are not the canonical definition of coherence in MPFST.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              href="/MPFST-Publication-Manuscript-10.pdf"
              target="_blank"
              rel="noopener"
            >
              <FileText className="w-4 h-4" /> Read canonical manuscript (v10)
            </a>
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold border border-gray-700 text-white hover:border-white"
              href="/#legacy"
            >
              <AlertTriangle className="w-4 h-4" /> Legacy archive (mu–gamma–H)
            </Link>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-gray-300">
            <Link href="#protocol-a" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Protocol A
            </Link>
            <Link href="#protocol-b" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Protocol B (proxy)
            </Link>
            <Link href="#replication-standard" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Replication standard
            </Link>
            <Link href="#legacy-callout" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Legacy protocol
            </Link>
          </nav>
        </header>

        <section id="protocol-a" className="space-y-8">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold">Protocol A: Simulation-true gate state (recommended workflow)</h2>
              </div>
              <p className="text-gray-200 text-sm">
                Goal: derive the canonical gate state directly from simulated fields. Report all parameter files and solver settings; use the same gate definition across runs.
              </p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-200">
                <li>
                  Define the combined synergy amplitude (canonical):
                  <div className="bg-black/40 border border-gray-800 rounded p-3 mt-2 text-sm font-mono text-gray-100 space-y-1">
                    <p>M(x,t) = u4(x,t) + u5(x,t) + u6(x,t) + u7(x,t) + u8(x,t) + d(x,t)</p>
                  </div>
                </li>
                <li>
                  Compute partial and full gate fractions (defaults, report what you use):
                  <div className="bg-black/40 border border-gray-800 rounded p-3 mt-2 text-sm font-mono text-gray-100 space-y-1">
                    <p>partial_meltdownFrac(t) = fraction of domain where M(x,t) &gt; 0.5*Mth</p>
                    <p>full_meltdownFrac(t) = fraction of domain where M(x,t) &gt; 0.8*Mth</p>
                  </div>
                </li>
                <li>
                  Classify system state using these thresholds (or documented alternatives):
                  <ul className="list-disc ml-6 space-y-1">
                    <li>No transition: partial = 0 and full = 0</li>
                    <li>Partial transition: partial &gt; 0 and full = 0</li>
                    <li>Full transition: full &gt; 0</li>
                  </ul>
                </li>
                <li>
                  Minimum reporting: gating thresholds used, spatial/temporal resolution, solver settings, and any boundary/initial condition choices. Optional upgrades: sensitivity analysis across nearby thresholds; cross-check with structured nulls.
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section id="protocol-b" className="space-y-8 mt-8">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold">Protocol B: Experimental gate proxy (for real-world datasets)</h2>
              </div>
              <p className="text-gray-200">
                Because u4..u8 and d are latent model fields, experimental data should use an explicit proxy variable S(t) designed to track "synergy amplitude" in a modality-appropriate way. Requirements vary by modality (EEG/MEG/LFP/optics/mechanics); deviations are reportable parameters, not failures.
              </p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-200">
                <li>
                  Define S(t) before analysis (pre-registration).
                  <ul className="list-disc ml-6 space-y-1">
                    <li>EEG: weighted sum of band-limited amplitude envelopes plus a phase-alignment term.</li>
                    <li>Plasma: edge/pedestal instability amplitude proxy plus fast transient detector.</li>
                    <li>GW strain: post-merger residual or echo-energy proxy in defined windows.</li>
                  </ul>
                </li>
                <li>
                  Thresholding (tiered guidance):
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Minimum: declare the threshold rule in advance (baseline window or physically motivated criterion).</li>
                    <li>Recommended: report sensitivity across a small, preregistered range.</li>
                    <li>Optional (high-precision): external calibration or disciplined clocking to validate timing/latency.</li>
                  </ul>
                </li>
                <li>
                  Define proxy_meltdownFrac on a rolling window: proxy_meltdownFrac = fraction of samples (or TF bins) in window where S exceeds threshold. Report window length and hop size.
                </li>
                <li>
                  Run structured nulls: phase-scrambled controls, time-shift controls, and surrogate data matched on power spectrum where appropriate.
                </li>
                <li>
                  Minimum viable reporting: sampling rate and latency characteristics, preprocessing (filtering/referencing/artifact handling), threshold rule, and null controls used. Optional: hardware coherence validation and independent reruns across sites.
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section id="replication-standard" className="space-y-8 mt-8">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold">Replication standard</h2>
              </div>
              <p className="text-gray-200">
                MPFST is intended to be evaluated by independent teams using transparent pipelines, structured nulls, and explicit preregistration where possible. Code outputs are test generators, not empirical proof. HPC tooling assists exploration of the PDE system but is not a magic predictor.
              </p>
              <p className="text-gray-400 text-sm">Modality-specific defaults can be adapted; changes should be logged and treated as parameters for comparison, not as protocol breaks.</p>
            </CardContent>
          </Card>
        </section>

        <section id="legacy-callout" className="space-y-8 mt-8">
          <Card className="bg-gray-900/80 border border-amber-800/70">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
                <h2 className="text-xl font-semibold">Legacy protocol (archived)</h2>
              </div>
              <p className="text-gray-200">
                The prior mu–gamma–H experimental protocol is archived for transparency and historical reproducibility. It is under reevaluation relative to the canonical meltdownFrac gate and should be treated as an observational proxy, not the definition of coherence.
              </p>
              <Link className="underline text-amber-200 hover:text-amber-100" href="/legacy/experimentalists-manifold">
                View the legacy mu–gamma–H protocol
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
