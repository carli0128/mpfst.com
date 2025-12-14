import React from "react";
import Link from "next/link";
import { card as Card, CardContent } from "@/components/ui/card";
import CanonicalBanner from "@/components/CanonicalBanner";
import MotionDiv from "@/components/ui/MotionDiv";
import {
  Activity,
  Archive as ArchiveIcon,
  Compass,
  FileText,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const primaryCta =
  "inline-flex items-center gap-2 px-4 py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white";
const secondaryCta =
  "inline-flex items-center gap-2 px-4 py-2 rounded font-semibold border border-gray-600 text-white hover:border-white";
const tertiaryCta =
  "inline-flex items-center gap-2 px-4 py-2 rounded font-semibold border border-gray-800 text-gray-200 hover:border-emerald-400 hover:text-white";

export default function MPFSTWebsite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <CanonicalBanner />

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <header className="py-10 space-y-8">
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="w-4 h-4" />
              <span>MeltdownFrac + Plane 9 gated</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Multi-Plane Field Synergy Theory (MPFST)
            </h1>
            <p className="text-lg text-gray-200 max-w-4xl">
              An 11-plane action/PDE framework centered on a single gate mechanism—meltdown threshold + meltdownFrac—used to model coherence
              transitions and "synergy reorganizations" across domains. Plane 9 is essential; the gate is driven by the combined occupant +
              illusions field sum.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className={primaryCta} href="/MPFST-Publication-Manuscript-10.pdf" target="_blank" rel="noopener">
                <FileText className="w-4 h-4" /> Read canonical manuscript (v10)
              </a>
              <Link className={secondaryCta} href="/experimentalists">
                <Compass className="w-4 h-4" /> Replication protocols (canonical)
              </Link>
              <Link className={tertiaryCta} href="/#legacy">
                <ArchiveIcon className="w-4 h-4" /> Legacy archive (v9 + mu–gamma–H tools)
              </Link>
            </div>
          </MotionDiv>

          <nav className="flex flex-wrap gap-3 text-sm text-gray-300">
            <Link href="#canonical" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Canonical
            </Link>
            <Link href="#replication" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Replication
            </Link>
            <Link href="#legacy" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Legacy
            </Link>
            <Link href="#archive" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Archive
            </Link>
          </nav>
        </header>

        <section id="canonical" className="space-y-8">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h2 className="text-2xl font-semibold">Aims &amp; scope</h2>
              </div>
              <p className="text-gray-200">
                MPFST is presented as a transdisciplinary framework that models coupled field dynamics across an 11-plane lattice and organizes
                coherence transitions using a single gate variable derived from the PDEs: meltdownFrac.
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Occupant-doping fields (Planes 4–8) form the active synergy domain.</li>
                <li>Illusions-doping (Plane 9) is a fractional/nonlocal influence that introduces memory, nonlocal transport, and irreversible gating.</li>
                <li>A universal meltdown threshold (Mth) and a measurable gate state (meltdownFrac) classify partial versus full transitions.</li>
              </ul>
              <p className="text-gray-200">
                This site hosts the canonical manuscript, replication protocols, and an openly versioned archive of supporting and legacy materials.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold">Canonical mechanics (v10)</h3>
              </div>
              <div className="space-y-4 text-gray-200">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1) The gate variable is meltdownFrac (not an exponent manifold).</h4>
                  <p>meltdownFrac is defined as the fraction of a domain where the combined field amplitude exceeds a fixed fraction of the meltdown threshold.</p>
                  <div className="bg-black/40 border border-gray-800 rounded p-3 text-sm font-mono text-gray-100 space-y-1">
                    <p>M(x,t) = u4 + u5 + u6 + u7 + u8 + d</p>
                    <p>meltdownFrac(t) = (1/V) * integral[ H(|M(x,t)| - 0.8*Mth) dV ]</p>
                    <p>partial_meltdownFrac uses 0.5*Mth; full_meltdownFrac uses 0.8*Mth.</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-white">2) Plane 9 is essential (fractional / nonlocal dynamics).</h4>
                  <p>Plane-9 illusions-doping is not optional. It introduces nonlocal influence and gate-like irreversibility that drives coherence transitions.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-white">3) Symbolic geometry is an adjacency specification in code.</h4>
                  <p>Symbolic overlays (Tree-of-Life, Flower-of-Life, etc.) encode coupling topology: which planes couple, where, and with what phase dependence.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-white">4) HPC simulations are a disclosed implementation tool—not the definition.</h4>
                  <p>Numerical solvers explore the PDE system and generate testable signatures, but predictions must be evaluated via transparent, independent replication and structured null controls.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="replication" className="space-y-8 mt-10">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold">What MPFST predicts (examples to test)</h3>
              </div>
              <p className="text-gray-200">
                MPFST treats diverse anomalies as observational faces of the same gate crossing (partial or full meltdownFrac) under different physical scalings.
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Neuroscience: state-dependent phase inversions and cross-band reorganizations near gate transitions.</li>
                <li>Plasmas: fast flicker events and edge/pedestal reorganizations as thresholded transitions.</li>
                <li>Gravitational-wave phenomenology: delayed echo-like structure as a gate-linked reorganization signature.</li>
                <li>Architecture / acoustics: resonance gains and phase windows when geometry aligns coupling topology.</li>
              </ul>
              <p className="text-gray-400 text-sm">These are targets for replication under controlled nulls, not settled conclusions.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold">Replication &amp; data policy</h3>
              </div>
              <p className="text-gray-200">MPFST is offered for evaluation through transparent, preregistered pipelines and explicit null controls.</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Transparent, pre-registered analyses with logged parameter files and solver settings.</li>
                <li>Structured null controls (phase-scrambled, time-shifted, or surrogate data) alongside effects.</li>
                <li>Multi-institution replication wherever possible; code outputs are test generators, not proof.</li>
                <li>HPC is a parametric resource to explore the PDE space; it is not a direct predictor of outcomes.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="legacy" className="space-y-8 mt-12">
          <Card className="bg-gray-900/80 border border-amber-800/70">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <ArchiveIcon className="w-5 h-5 text-amber-300" />
                <h3 className="text-xl font-semibold">Legacy / archived materials (mu–gamma–H coherence meter)</h3>
              </div>
              <p className="text-gray-200">
                Some prior MPFST material used a mu–gamma–H coherence meter and a derived score mℓ(mu,gamma,H) as an observational proxy layer. This layer is now considered legacy and is under reevaluation relative to the canonical gate definition (meltdownFrac).
              </p>
              <p className="text-gray-200">
                It remains available for transparency and historical reproducibility, but it is not the canonical formulation.
              </p>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-amber-200 font-semibold">Legacy links</p>
                <ul className="list-disc ml-6 space-y-2 text-gray-200">
                  <li>
                    <a
                      className="underline text-amber-200 hover:text-amber-100"
                      href="https://doi.org/10.5281/zenodo.17776044"
                      target="_blank"
                      rel="noopener"
                    >
                      Legacy mu–gamma–H toolkit (DOI, archived)
                    </a>
                    <span className="block text-amber-300 text-sm">Warning: describes the mu/gamma/H pipeline; not canonical.</span>
                  </li>
                  <li>
                    <Link className="underline text-amber-200 hover:text-amber-100" href="/legacy/experimentalists-manifold">
                      Legacy experimentalists guide (mu–gamma–H protocol)
                    </Link>
                  </li>
                  <li>MPFST complements (v9-era)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="archive" className="space-y-8 mt-12">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <ArchiveIcon className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold">Archive</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-gray-200">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Canonical</h4>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>
                      <a className="underline text-emerald-300 hover:text-emerald-200" href="/MPFST-Publication-Manuscript-10.pdf" target="_blank" rel="noopener">
                        MPFST Publication Manuscript (v10) — canonical reference
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Prior core / historical snapshots</h4>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>
                      <a className="underline text-gray-200 hover:text-white" href="/MPFST-V9.pdf" target="_blank" rel="noopener">
                        MPFST core theory (v9) — historical snapshot
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Legacy analyses (under reevaluation)</h4>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>
                      <Link className="underline hover:text-white" href="/legacy/experimentalists-manifold">
                        Legacy experimental protocols (mu–gamma–H)
                      </Link>
                    </li>
                    <li>MPFST complements (v9-era)</li>
                    <li>Any cross-domain dossiers that depend on mℓ / mu–gamma–H</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center mt-16 text-gray-500 text-sm">
          &copy; 2025 Carlos W. Freeman | MPFST.com | Canonical reference: MPFST Publication Manuscript (v10)
        </footer>
      </div>
    </div>
  );
}
