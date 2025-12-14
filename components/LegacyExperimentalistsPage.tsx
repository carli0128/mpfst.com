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
  { id: "mission", label: "Mission" },
  { id: "apparatus", label: "Apparatus" },
  { id: "acquisition", label: "Acquisition" },
  { id: "calibration", label: "Calibration" },
  { id: "analysis", label: "Analysis" },
  { id: "controls", label: "Controls" },
  { id: "handoff", label: "Submission" },
];

export default function LegacyExperimentalistsPage() {
  useEffect(() => {
    const cleanup = initScrollNav({ offset: 140 });
    return () => cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <div className="max-w-5xl mx-auto px-4 lg:px-0 py-10 space-y-10">
        {/* LEGACY NOTICE BANNER */}
        <div className="rounded-lg border-2 border-amber-500/50 bg-amber-950/30 p-6 backdrop-blur">
          <h2 className="text-xl font-bold text-amber-200 mb-3">
            ⚠️ LEGACY / ARCHIVED PROTOCOL (µ–γ–H framework)
          </h2>
          <p className="text-slate-200 mb-3">
            This page describes the legacy µ–γ–H coherence meter protocol. It is
            preserved for transparency and historical reproducibility but is{" "}
            <span className="font-semibold">not the canonical formulation</span>.
          </p>
          <p className="text-slate-300 mb-3">
            For the canonical replication protocol based on meltdownFrac, see:{" "}
            <a
              href="/experimentalists"
              className="font-semibold text-emerald-300 hover:text-emerald-200 underline"
            >
              Canonical replication protocols
            </a>
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
              Field manual
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              For experimentalists deploying the MPFST protocol
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Use this page as the operational checklist when you want to
              instrument a platform with the MPFST coherence meter mℓ(µ, γ, H),
              run the two-gate projection test, and report avalanche statistics
              that line up with the public dossiers.
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
              href="mailto:lab@mpfst.com?subject=MPFST%20experimental%20handoff"
              className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
            >
              Coordinate a lab handoff
            </a>
          </div>
        </header>

        <nav
          className="sticky top-0 z-20 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent py-4"
          aria-label="Experimentalist sections"
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

        <section id="mission" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <BrainCircuit className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  What counts as a compliant MPFST experiment?
                </h2>
              </div>
              <p className="text-slate-300">
                Choose a platform where coherence, avalanches, or fractional
                memory are expected or contested. The MPFST programme asks that
                you log all raw acquisitions, publish the scripts that estimate
                (µ, γ, H), and share the gate trajectories mℓ(t), m1, m2 so that
                other teams can replay your run. If your apparatus can be moved
                or replicated off-site, plan for a traveling calibration bundle
                (noise source + reference sample) so the handoff retains the
                same gate settings.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="apparatus" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-sky-300">
                <Layers className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Minimum apparatus stack
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>
                  <span className="font-semibold text-slate-100">
                    Sensor chain:
                  </span>{" "}
                  simultaneous readings at ≥1 kHz for the driven channel,
                  auxiliary channels, and environmental monitors.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Analog front-end:
                  </span>{" "}
                  DC-coupled, flat phase across the capture band, with a
                  documented transfer function for de-embedding.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Timing:
                  </span>{" "}
                  disciplined clock (GPSDO or rubidium) with &lt;10 µs jitter
                  and PPS capture in the log for later alignment.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Reference path:
                  </span>{" "}
                  matched dummy load / dark channel to establish the gate-closed
                  spectrum in situ.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="acquisition" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-purple-300">
                <Activity className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Acquisition cadence
                </h2>
              </div>
              <ol className="list-decimal list-inside text-slate-300 space-y-1">
                <li>Warm up the instrument until drift &lt; 1%/hr.</li>
                <li>
                  Run a "gate closed" control with the reference sample and log
                  at least 10 minutes of data.
                </li>
                <li>
                  Switch to the active sample or field condition and log ≥1e6
                  samples per channel.
                </li>
                <li>
                  Capture environmental covariates (temperature, pressure,
                  vibration) on the same clock.
                </li>
                <li>
                  Archive raw binaries + JSON metadata (sample rate, gain,
                  filter settings, instrument serials).
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section id="calibration" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-pink-300">
                <Beaker className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Calibration bundle
                </h2>
              </div>
              <p className="text-slate-300">
                Provide a repeatable three-point calibration: (1) thermal noise
                source with known effective temperature, (2) fractional noise
                board that sets γ = 1.5 ± 0.02, and (3) a synthetic avalanche
                trace used to verify segmentation thresholds. Include STL or
                PCB files so other sites can fabricate the same boards.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="analysis" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-300">
                <ClipboardCheck className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Analysis deliverables
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>
                  Publish the notebook / CLI command that estimates (µ, γ, H)
                  and returns the mℓ trajectory.
                </li>
                <li>
                  Include plots for PSD fits, DFA-2 slopes, avalanche rank
                  plots with CSN fits, and Spectral Shell Monitor outputs.
                </li>
                <li>
                  Provide BCa intervals for each tail exponent and confirm they
                  overlap the theoretical fractional order within error bars.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="controls" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-rose-300">
                <ShieldCheck className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Controls & falsifiability
                </h2>
              </div>
              <p className="text-slate-300">
                Run at least one negative-control in which the gate should stay
                closed (shuffled labels, inverted drive, or thermalized sample).
                Report the flat mℓ trajectory alongside the active run. Add a
                structured null (IAAFT or phase-randomized surrogate) to show
                that avalanche tails collapse when coherence is removed.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="handoff" data-scroll-section className="scroll-section scroll-mt-36 space-y-4">
          <Card className="bg-slate-900/70 border border-slate-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-cyan-300">
                <BrainCircuit className="w-5 h-5" />
                <h2 className="text-2xl font-semibold text-white">
                  Submission & lab swaps
                </h2>
              </div>
              <p className="text-slate-300">
                Once your package includes raw data, metadata, calibration
                bundle, and notebooks, send the Zenodo/OSF link to
                lab@mpfst.com with a two-paragraph summary and any safety
                considerations. We coordinate peer swaps so another lab can
                install your apparatus or rerun the protocol on a mirrored rig.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
