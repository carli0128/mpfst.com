import React from "react";
import Link from "next/link";
import { card as Card, CardContent } from "@/components/ui/card";
import CanonicalBanner from "@/components/CanonicalBanner";
import MotionDiv from "@/components/ui/MotionDiv";
import {
  Activity,
  Archive as ArchiveIcon,
  CheckCircle2,
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
              <span>Open theory + replication hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Multi-Plane Field Syntergic Theory (MPFST)
            </h1>
            <p className="text-lg text-gray-200 max-w-4xl">
              An 11-plane action/PDE proposal centered on a meltdown threshold + meltdownFrac gate used to model coherence transitions. Plane 9 is treated as a fractional nonlocal perturbation field d, and the gate is driven by the combined primary wave fields (Planes 4–8) plus the fractional nonlocal field. This site is a living preprint + replication archive.
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
            <Link href="#status" className="px-3 py-2 rounded border border-gray-800 hover:border-emerald-400/70 hover:text-white">
              Status
            </Link>
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

        <section id="status" className="space-y-6">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">Status &amp; limits</h2>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Working draft / not peer-reviewed; claims are scoped to the manuscripts and listed tests.</li>
                <li>Replication status is flagged per dossier (legend below); many items are exploratory or internally reproduced only.</li>
                <li>Standard Model embedding and cosmological closure remain open programs, treated separately from the empirical tests.</li>
                <li>Code, pipelines, and calibration procedures are provided where feasible; missing pieces are documented explicitly.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <h3 className="text-lg font-semibold">How to read MPFST (three layers)</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li><strong>Model definition:</strong> 11-plane PDE system with a Plane-9 fractional influence and a gate variable defined as a thresholded field fraction.</li>
                <li><strong>Operationalization:</strong> meltdownFrac (partial/full thresholds) as the gate state; mu–gamma–H appears only as an observable-level proxy in legacy material.</li>
                <li><strong>Empirical status:</strong> case studies with declared nulls, parameter calibration steps, and a replication legend (below); thresholds treated as estimable, not universal.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-emerald-800/60">
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">Evidence status legend</h3>
              <div className="flex flex-wrap gap-4 text-gray-200 text-sm">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> ✅ Replicated (independent reruns exist)</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-300" /> 🟡 Reproduced internally (awaiting independent replication)</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-300" /> 🧪 Exploratory (hypothesis-generating; methods shared)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">Operational coherence (definition vs proxy)</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li><strong>Model-internal (PDE):</strong> coherence is defined by meltdownFrac(t), the fraction of spatial sites where the multi-plane synergy field exceeds a fixed threshold (partial/full gates).</li>
                <li><strong>Data-analytic proxy:</strong> observational metrics (e.g., scaling exponents, coherence indices) are used as proxies when working with time-series; they do not define coherence in the theory.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border border-red-800/70">
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">Falsifiability / null controls</h3>
              <p className="text-gray-200 text-sm">
                Effects are considered non-supporting if they fail to track the operational coherence proxy (meltdownFrac or declared proxy) or persist under pre-specified null transformations (time/phase/label/graph shuffles, surrogate data). These nulls and thresholds should be declared before outcome inspection wherever possible.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">Terminology &amp; glossary (standard label → legacy alias)</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Plane-9 d: fractional nonlocal perturbation field (legacy: illusions-doping sabotage field).</li>
                <li>Plane-10 v: boundary regulator (reservoir) field (legacy: vantage-doping collector field).</li>
                <li>Primary wave fields u4–u8 (Planes 4–8) (legacy: occupant-doping fields).</li>
                <li>Graph priors: geometric graph priors (legacy: sacred templates; e.g., hexagonal packing / hierarchical modular graph / log-spiral octave embedding).</li>
                <li>h field: entropy-reservoir field (legacy: entropic back-wash / negative-entropy storage language).</li>
                <li>mel: normalized coherence order parameter (legacy: coherence slider).</li>
                <li>Sub-threshold burst event (legacy: synergy flicker); global coherence-locked arc (GCSA) (legacy: Global Crimson Synergy Arc).</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="canonical" className="space-y-8 mt-10">
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h2 className="text-2xl font-semibold">Aims &amp; scope</h2>
              </div>
              <p className="text-gray-200">
                MPFST is a proposed 11-plane lattice/action framework. Under explicit reduction assumptions in the manuscripts, it is constructed to yield an effective 4-D sector intended to mirror key structures of Einstein–Maxwell dynamics coupled to a Schrödinger-type matter description, plus a fractional-memory coherence block and a projection-defined gate. Parameter values used in the current drafts are constrained via a documented calibration procedure on public datasets (e.g., Casimir-scale constraints, cosmological observations, physiological time-series), with uncertainties noted for replication.
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Primary wave fields u4–u8 (Planes 4–8) form the active synergy domain (legacy: occupant-doping).</li>
                <li>Plane-9 fractional nonlocal perturbation field d introduces memory, nonlocal transport, and gate-like irreversibility (legacy: illusions-doping sabotage field).</li>
                <li>A candidate meltdown threshold (Mth) and a measurable gate state (meltdownFrac) classify partial versus full transitions; thresholds are estimable quantities, not asserted universals.</li>
              </ul>
              <p className="text-gray-200">
                This site is an open theory and replication archive: canonical manuscripts, replication protocols, case-study dossiers, and legacy materials.
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
                  <h4 className="font-semibold text-white">1) Gate variable: meltdownFrac (observable classification, not an exponent manifold).</h4>
                  <p>meltdownFrac is the fraction of a domain where the combined field amplitude exceeds a chosen fraction of the meltdown threshold.</p>
                  <div className="bg-black/40 border border-gray-800 rounded p-3 text-sm font-mono text-gray-100 space-y-1">
                    <p>M(x,t) = u4 + u5 + u6 + u7 + u8 + d</p>
                    <p>meltdownFrac(t) = (1/V) * integral[ H(|M(x,t)| - 0.8*Mth) dV ]</p>
                    <p>Defaults: partial threshold 0.5·Mth; full threshold 0.8·Mth. Treat these as estimable, report what you use.</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-white">2) Plane 9 is essential (fractional / nonlocal dynamics).</h4>
                  <p>Plane-9 fractional nonlocal perturbation field d is not optional; it provides the nonlocal influence and memory needed for the gate-like irreversibility in this formulation.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-white">3) Symbolic geometry = adjacency specification in code.</h4>
                  <p>Geometric graph priors (e.g., hexagonal packing, hierarchical modular graphs, log-spiral octave embeddings) map to explicit coupling/adjacency tensors that declare which planes couple, where, and with what phase dependence.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-white">4) HPC simulations are an exploratory tool, not the claim.</h4>
                  <p>Numerical solvers are used to explore the PDE space and generate testable signatures; claims are tied to transparent, independent replication with structured null controls.</p>
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
                <h3 className="text-xl font-semibold">What MPFST predicts (case studies to test)</h3>
              </div>
              <p className="text-gray-200">
                MPFST treats diverse anomalies as observational faces of the same gate crossing (partial or full meltdownFrac) under different physical scalings. Each dossier lists its evidence status (legend above).
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Neuroscience: state-dependent phase inversions and cross-band reorganizations near gate transitions.</li>
                <li>Plasmas: fast flicker events and edge/pedestal reorganizations as thresholded transitions.</li>
                <li>Gravitational-wave phenomenology: delayed echo-like structure as a gate-linked reorganization signature.</li>
                <li>Architecture / acoustics: resonance gains and phase windows when geometry aligns coupling topology.</li>
              </ul>
              <p className="text-gray-400 text-sm">Targets for replication under controlled nulls; not presented as settled conclusions.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold">Replication &amp; data policy</h3>
              </div>
              <ul className="list-disc ml-6 space-y-2 text-gray-200">
                <li>Public data first: analyses are designed to be re-runnable from open archives; where access is restricted, we provide synthetic/benchmark alternatives and document gaps.</li>
                <li>Transparent, pre-registered pipelines with logged parameter files and solver settings wherever possible.</li>
                <li>Structured null controls (phase-scrambled, time-shifted, or surrogate data) reported alongside effects.</li>
                <li>Multi-institution replication prioritized; code outputs are test generators, not evidence of empirical truth.</li>
                <li>HPC resources explore the PDE space; they are not treated as direct predictors.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        <section id="working-notes" className="space-y-8 mt-10">
          <Card className="bg-gray-900/80 border border-amber-800/70">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <ArchiveIcon className="w-5 h-5 text-amber-300" />
                <h3 className="text-xl font-semibold">Working notes / mappings (not peer-reviewed)</h3>
              </div>
              <p className="text-gray-200">
                Exploratory mappings built on top of the core PDE engine: MPFST ↔ QFT dictionary (measurement/adjacency/gauge structure), EFT/RG sketches, cosmology/GR connections, and avalanche/segmentation toolchains. Use them as hypotheses and code resources, not as settled claims.
              </p>
            </CardContent>
          </Card>
        </section>



        <section id="legacy" className="space-y-8 mt-12">
          <Card className="bg-gray-900/80 border border-amber-800/70">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <ArchiveIcon className="w-5 h-5 text-amber-300" />
                <h3 className="text-xl font-semibold">Legacy / archived materials (mu–gamma–H coherence proxy)</h3>
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
                        MPFST core theory (v9) — superseded historical snapshot
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
