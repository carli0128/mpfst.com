import React, { useEffect } from "react";
import Link from "next/link";
import { card as Card, CardContent } from "@/components/ui/card";
import MotionDiv from "@/components/ui/MotionDiv";
import { initScrollNav } from "@/lib/scrollNav";
import {
  Activity,
  Beaker,
  BrainCircuit,
  ClipboardCheck,
  Layers,
  ShieldCheck,
} from "lucide-react";

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "protocol-a", label: "Protocol A" },
  { id: "protocol-b", label: "Protocol B" },
  { id: "replication", label: "Replication" },
  { id: "legacy-link", label: "Legacy protocol" },
];

export default function ExperimentalistsPage() {
  useEffect(() => {
    const cleanup = initScrollNav({ offset: 140 });
    return () => cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <div className="max-w-5xl mx-auto px-4 lg:px-0 py-10 space-y-10">
        {/* CANONICAL BANNER */}
        <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-950/30 p-6 backdrop-blur">
          <h2 className="text-xl font-bold text-emerald-200 mb-3">
            CANONICAL REPLICATION PROTOCOLS (v10)
          </h2>
          <p className="text-slate-200">
            This page summarizes how to test MPFST using the canonical gate
            definition: meltdown threshold + meltdownFrac. Older protocols that
            compute µ, γ, H and mℓ are preserved as{" "}
            <a
              href="/legacy/experimentalists-manifold"
              className="font-semibold text-amber-300 hover:text-amber-200 underline"
            >
              legacy
            </a>{" "}
            but are not the canonical definition of coherence in MPFST.
          </p>
        </div>

        <header className="space-y-6 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">
              Canonical protocols
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Replication protocols for experimentalists (canonical, v10)
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Test MPFST using the canonical gate definition based on
              meltdownFrac and the meltdown threshold. These protocols enable
              independent verification and structured replication.
            </p>
          </MotionDiv>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-700 px-6 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              ← Back to the MPFST journal
            </Link>
            <a
              href="mailto:lab@mpfst.com?subject=MPFST%20canonical%20replication"
              className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
            >
              Coordinate replication
            </a>
          </div>
        </header>

        <nav
          className="sticky top-0 z-20 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent py-4"
          aria-label="Protocol sections"
        >
          <ul className="flex flex-wrap gap-2" data-scroll-nav>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  data-scroll-link={section.id}
                  className="scroll-pill rounded-full border border-slate-700/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300 transition data-[active=true]:bg-emerald-500 data-[active=true]:text-white"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section id="intro" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <BrainCircuit className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Page title + intro
                </h2>
              </div>
              <p className="text-slate-300">
                This page summarizes how to test MPFST using the canonical gate
                definition: meltdown threshold + meltdownFrac. Older protocols
                that compute µ, γ, H and mℓ are preserved as legacy but are not
                the canonical definition of coherence in MPFST.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="protocol-a" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-sky-300">
                <Layers className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Protocol A: Simulation-true gate state (meltdownFrac)
                </h2>
              </div>
              <ol className="list-decimal list-inside text-slate-300 space-y-3">
                <li>
                  <span className="font-semibold text-slate-100">
                    Compute the combined synergy amplitude:
                  </span>
                  <div className="ml-6 mt-2 p-3 bg-slate-950/60 rounded border border-slate-700 font-mono text-sm">
                    M(x,t) = u4(x,t) + u5(x,t) + u6(x,t) + u7(x,t) + u8(x,t) +
                    d(x,t)
                  </div>
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Compute partial and full gate fractions (recommended):
                  </span>
                  <div className="ml-6 mt-2 p-3 bg-slate-950/60 rounded border border-slate-700 font-mono text-sm space-y-1">
                    <div>
                      partial_meltdownFrac(t) = fraction of domain where M(x,t)
                      &gt; 0.5·Mth
                    </div>
                    <div>
                      full_meltdownFrac(t) = fraction of domain where M(x,t)
                      &gt; 0.8·Mth
                    </div>
                  </div>
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Classify system state:
                  </span>
                  <ul className="ml-6 mt-2 list-disc list-inside text-slate-300 space-y-1">
                    <li>No transition: partial=0 and full=0</li>
                    <li>Partial transition: partial&gt;0 and full=0</li>
                    <li>Full transition: full&gt;0</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Validate invariances:
                  </span>
                  <ul className="ml-6 mt-2 list-disc list-inside text-slate-300 space-y-1">
                    <li>
                      The same gate definition must be used across runs.
                    </li>
                    <li>
                      Parameter files and solver settings must be logged and
                      reproducible.
                    </li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section id="protocol-b" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-purple-300">
                <Activity className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Protocol B: Experimental gate proxy (for real-world datasets)
                </h2>
              </div>
              <p className="text-slate-300">
                Because u4..u8 and d are latent model fields, experimental data
                must use an explicit proxy variable S(t) designed to track
                "synergy amplitude" in a domain-appropriate way.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">
                    Minimum requirements for an acceptable proxy protocol:
                  </h3>
                  <ol className="list-decimal list-inside text-slate-300 space-y-2">
                    <li>
                      <span className="font-semibold">
                        Define S(t) before analysis (pre-registration).
                      </span>{" "}
                      Examples:
                      <ul className="ml-6 mt-1 list-disc list-inside text-sm">
                        <li>
                          EEG: a weighted sum of band-limited amplitude
                          envelopes + a phase-alignment term.
                        </li>
                        <li>
                          Plasma: an edge/pedestal instability amplitude proxy +
                          fast transient detector.
                        </li>
                        <li>
                          GW strain: a post-merger residual/echo-energy proxy in
                          defined windows.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-semibold">
                        Define a threshold rule BEFORE looking at outcomes.
                      </span>
                      <ul className="ml-6 mt-1 list-disc list-inside text-sm">
                        <li>
                          If you cannot directly map Mth, use a physically
                          motivated threshold OR a preregistered baseline window
                          to set thresholds.
                        </li>
                        <li>
                          Report sensitivity analyses across a small,
                          prespecified range.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-semibold">
                        Define proxy_meltdownFrac on a rolling window:
                      </span>
                      <div className="ml-6 mt-2 p-3 bg-slate-950/60 rounded border border-slate-700 font-mono text-sm">
                        proxy_meltdownFrac = fraction of samples (or TF bins) in
                        window where S exceeds threshold.
                      </div>
                    </li>
                    <li>
                      <span className="font-semibold">Run structured nulls:</span>
                      <ul className="ml-6 mt-1 list-disc list-inside text-sm">
                        <li>phase-scrambled controls</li>
                        <li>time-shift controls</li>
                        <li>
                          surrogate data matched on power spectrum (where
                          appropriate)
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-semibold">Report:</span>
                      <ul className="ml-6 mt-1 list-disc list-inside text-sm">
                        <li>effect sizes</li>
                        <li>null distributions</li>
                        <li>robustness to preprocessing choices</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="replication" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-pink-300">
                <ShieldCheck className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Replication standard
                </h2>
              </div>
              <p className="text-slate-300">
                MPFST is intended to be evaluated by independent teams using
                transparent pipelines, structured nulls, and explicit
                preregistration where possible. Code outputs are not treated as
                empirical proof; they are test generators.
              </p>
              <div className="rounded-lg border border-amber-500/50 bg-amber-950/20 p-4">
                <h3 className="font-semibold text-amber-200 mb-2">
                  HPC is not a magic predictor
                </h3>
                <p className="text-slate-300 text-sm">
                  High-performance computing simulations are a disclosed
                  implementation tool for exploring the PDE system and
                  generating testable signatures. The canonical claim is:
                  predictions must be evaluated via transparent, independent
                  replication and structured null controls—not accepted based on
                  code output alone.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="legacy-link" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-300">
                <ClipboardCheck className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Legacy protocol (archived)
                </h2>
              </div>
              <p className="text-slate-300">
                The prior µ–γ–H experimental protocol is archived for
                transparency:
              </p>
              <a
                href="/legacy/experimentalists-manifold"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-amber-500 rounded-md text-amber-200 hover:bg-amber-500/10 transition"
              >
                View legacy µ–γ–H protocol
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
