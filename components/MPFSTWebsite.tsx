import React, { useEffect, useState } from "react";
import Link from "next/link";
import { card as Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MotionDiv from "@/components/ui/MotionDiv";
import { initScrollNav } from "@/lib/scrollNav";
import {
  Sparkles,
  BrainCircuit,
  Atom,
  BookOpenCheck,
  CalendarCheck,
  Download,
  Key,
} from "lucide-react";

const TOOLKIT_DOI_URL = "https://doi.org/10.5281/zenodo.17776043";

type ArticleCategory =
  | "Core theory"
  | "Addenda & technical"
  | "Empirical dossiers"
  | "Domain studies"
  | "Manuscripts";

interface Article {
  id: string;
  category: ArticleCategory;
  title: string;
  pdfPath?: string;
  externalUrl?: string;
  year?: string;
  blurb: string;
  highlight?: string;
}

const articles: Article[] = [
  {
    id: "mpfst-v9",
    category: "Core theory",
    title:
      "Multi-Plane Field Syntergic Theory (MPFST): From an 11‑D Lattice Action to 4‑D Einstein–Maxwell–Schrödinger Thermodynamics",
    pdfPath: "/MPFST-V9.pdf",
    year: "2025",
    blurb:
      "Canonical presentation of MPFST. A single 11‑D lattice action yields an effective 4‑D Einstein–Maxwell–Schrödinger sector, a fractional entropy balance law, and a projection threshold linking cosmological vacuum energy to biological coherence. All constants are fixed by public data.",
    highlight: "Core theoretical reference.",
  },
  {
    id: "complements-v9",
    category: "Addenda & technical",
    title:
      "MPFST Complements v9: Post‑Publication Validations, Fractional‑Exponent Pinning, and Device‑Level Control",
    pdfPath: "/MPFST-Complements-V9.pdf",
    year: "2025",
    blurb:
      "Consolidates refinements after the main v9 text: two‑tier gate on the downward projection, explicit fractional operator on Plane 9, live inference of (µ, γ, H), a coherence meter, Spectral Shell Monitor, and an instrument‑grade analysis toolbox with reproducible code.",
    highlight: "Technical supplement & analysis toolbox.",
  },
  {
    id: "further-dev",
    category: "Addenda & technical",
    title: "Further Development of MPFST: Avalanche Mechanism and EFT Structure",
    pdfPath: "/Further-Development-of-MPFST.pdf",
    year: "2025",
    blurb:
      "Shows how the two‑tier gate and avalanche valve arise as coarse‑grained observables of the 11‑D action, links dwell‑time, spectral, memory, and avalanche exponents to a single fractional order, and frames MPFST as an EFT that reduces to GR+SM when the gate is closed.",
    highlight: "EFT framing & analytic links between exponents.",
  },
  {
    id: "avalanche-addendum",
    category: "Addenda & technical",
    title:
      "MPFST Avalanche Addendum: Two‑Tier Coherence Gating and Avalanche Statistics",
    pdfPath: "/Avalanche-MPFST.pdf",
    year: "2025",
    blurb:
      "Defines a time‑resolved coherence meter, latent gate trace, and soft two‑tier valve that convert coherence fluctuations into avalanches with heavy‑tailed size statistics. Implements a cross‑domain avalanche pipeline for gravitational‑wave ringdowns, laser SFI, and resting‑state EEG.",
    highlight: "Formal definition of the avalanche mechanism.",
  },
  {
    id: "empirical-evidence",
    category: "Empirical dossiers",
    title:
      "MPFST Cross‑Domain Empirical Validations: Consolidated Dossier (Physics, Chemistry, Biology)",
    pdfPath: "/Empirical-Evidence-MPFST.pdf",
    year: "2025",
    blurb:
      "Applies a single coherence meter mℓ(µ, γ, H), two universal gates (m1, m2), and a Spectral Shell Monitor across quantum measurement, dark‑sector residuals, GW overtones, high‑Tc superconductors, plasma ELMs, heterogeneous catalysis, water anomalies, batteries, EEG entrainment, and multi‑organ coherence.",
    highlight: "One meter, two gates, one detector across domains.",
  },
  {
    id: "negative-control",
    category: "Empirical dossiers",
    title:
      "Validation of MPFST via Negative-Control Scaling Law Violations in Stochastic Incoherent Systems",
    pdfPath: "/Validation-of-MPFST-Negative-Control-Scaling-Law-Violations.pdf",
    year: "2025",
    blurb:
      "Applies the coherence meter to nominally incoherent stochastic systems run under negative-control conditions and tracks scaling-law exponents. Observes controlled violations—µ softening, γ steepening, H drift—only when the hidden MPFST gate is forced open, with all anomalies collapsing under shuffled controls.",
    highlight: "Negative-control stress test for the gate picture.",
  },
  {
    id: "rindler",
    category: "Domain studies",
    title:
      "Empirical Support for MPFST Predictions in Successive Rindler Data",
    pdfPath: "/Empirical-Support-Rindler-MPFST.pdf",
    year: "2025",
    blurb:
      "Analyzes successive Rindler spacetime detector data using (µ, γ, H), mℓ‑stratification, and SSM. Finds the predicted slip‑to‑lock transition, steeper 1/f slope, heavier dwell‑time tails, and higher H in the high‑coherence regime, all vanishing under structured nulls.",
    highlight: "QFT testbed for the gate mechanism.",
  },
  {
    id: "eeg-mapping",
    category: "Domain studies",
    title:
      "Mapping EEG Bands to MPFST Occupant Fields: Analysis and Results",
    pdfPath: "/Mapping-EEG-Bands-to-MPFST-Occupant-Fields.pdf",
    year: "2025",
    blurb:
      "Fits state‑space models linking five latent Occupant fields to canonical EEG bands. Shows a stable, one‑to‑one, positive mapping across conditions, band‑specific responses to octave shell jumps, and adjacency‑consistent phase‑asymmetry that vanish under label/graph shuffles.",
    highlight: "Neural mapping of Occupant fields.",
  },
  {
    id: "manuscript-9",
    category: "Manuscripts",
  title: "The MUlti-Plane Field Syntergic Theory MPFST Journal Manuscript v9 (pre‑packaged submission)",
    pdfPath: "/MPFST-Publication-Manuscript-9.pdf",
    year: "2025",
    blurb:
      "Journal‑style formatting of the core MPFST theory for external peer‑review. Content overlaps with MPFST v9, tuned for conventional article structure.",
  },
  {
    id: "manuscript-10",
    category: "Manuscripts",
  title: "The MUlti-Plane Field Syntergic Theory MPFST Journal Manuscript v10 (updated submission)",
    pdfPath: "/MPFST-Publication-Manuscript-10.pdf",
    year: "2025",
    blurb:
      "Updated manuscript reflecting later refinements and clarifications. Kept here as an archival, citable packaging of the evolving theory.",
  },
  {
    id: "qft-bridge",
    category: "Manuscripts",
    title: "MPFST Mapped to Quantum Field Theory (working notes)",
    pdfPath: "/MPFST-Mapped-to-QFT.pdf",
    year: "2025",
    blurb:
      "Bridge document translating the 11‑D MPFST lattice into standard QFT language: plane‑by‑plane dictionary, measurement model via fractional gates, and a proposed (still open) Standard Model embedding.",
    highlight: "QFT bridge for field theorists.",
  },
];

const categoryOrder: ArticleCategory[] = [
  "Core theory",
  "Addenda & technical",
  "Empirical dossiers",
  "Domain studies",
  "Manuscripts",
];

const sectionNav = [
  { id: "overview", label: "Journal overview" },
  { id: "theory", label: "Core theory" },
  { id: "qft", label: "QFT bridge" },
  { id: "avalanche", label: "Avalanche toolkit" },
  { id: "evidence", label: "Empirical evidence" },
  { id: "archive", label: "Archive" },
  { id: "repro", label: "Data & replication" },
  { id: "cite", label: "How to cite" },
];

export default function MPFSTWebsite() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const cleanup = initScrollNav();
    return () => cleanup();
  }, []);

  const handleSubscribe = async () => {
    if (!email.includes("@")) {
      setStatus("error");
      setErrorMessage("Enter a valid email address first.");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage(null);
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: "" }));
        throw new Error(payload.error || "Unable to save subscription.");
      }

      setSubscribed(true);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10">
        {/* HERO */}
        <header className="text-center mb-12 space-y-6">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              The MUlti-Plane Field Syntergic Theory MPFST Journal
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              A living scientific record for the Multi‑Plane Field Syntergic
              Theory — from the 11‑D lattice action to empirical avalanche and
              coherence signatures across physical, chemical, and biological
              systems.
            </p>
          </MotionDiv>

          <MotionDiv
            className="flex justify-center gap-5 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Sparkles className="w-7 h-7 text-yellow-400" />
            <BrainCircuit className="w-7 h-7 text-purple-400" />
            <Atom className="w-7 h-7 text-sky-400" />
            <BookOpenCheck className="w-7 h-7 text-emerald-400" />
          </MotionDiv>

          <MotionDiv
            className="flex flex-wrap justify-center gap-3 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href="/MPFST-V9.pdf"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition"
            >
              <Download className="w-4 h-4" />
              Download core theory (v9)
            </a>
            <a
              href={TOOLKIT_DOI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-600 hover:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition"
            >
              <Key className="w-4 h-4" />
              Avalanche & coherence toolkit (DOI)
            </a>
            <Link
              href="/experimentalists"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500/90 hover:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition"
            >
              Field protocols for experimentalists
            </Link>
          </MotionDiv>
        </header>

        <nav
          className="sticky top-0 z-10 bg-gradient-to-b from-slate-950 via-slate-950/95 to-transparent py-3"
          aria-label="Journal sections"
        >
          <ul className="flex flex-wrap gap-2 overflow-x-auto" data-scroll-nav>
            {sectionNav.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  data-scroll-link={section.id}
                  className="scroll-pill rounded-full border border-slate-700/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300 transition data-[active=true]:bg-blue-500 data-[active=true]:text-white"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

  {/* OVERVIEW */}
  <section id="overview" data-scroll-section className="scroll-section pt-8 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-8">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-purple-300" />
                    Aims & scope
                  </h2>
                  <p className="text-slate-200">
                    MPFST is a single 11‑dimensional lattice action that
                    reproduces an effective 4‑D Einstein–Maxwell–Schrödinger
                    sector, a fractional entropy balance law, and a projection
                    threshold that ties cosmological vacuum energy to
                    coherence‑bearing mesoscopic systems. The constants are
                    fixed by public Casimir, cosmological, and HRV datasets,
                    leaving no free parameters to tune.
                  </p>
                  <p className="text-slate-300">
                    This site functions as a dedicated journal for MPFST: it
                    hosts the core theory, technical complements, avalanche
                    and coherence toolkits, and cross‑domain empirical
                    dossiers, together with explicit replication resources.
                  </p>
                </section>

                <section className="space-y-3 rounded-lg border border-slate-700/70 bg-slate-950/60 p-4">
                  <h3 className="text-lg font-semibold">Contact the team</h3>
                  <p className="text-sm text-slate-300">
                    MPFST is growing through public critique and cross-domain
                    validation. If you have replication notes, questions about the
                    coherence meter, or want to propose a new experimental docket,
                    send us a line—every dataset, success, or failure adds to the
                    evidence ledger.
                  </p>
                  <a
                    href="mailto:info@mpfst.com"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    info@mpfst.com
                  </a>
                  <p className="text-xs text-slate-400">
                    You can also drop feedback about the site itself—accessibility,
                    missing PDFs, or improvements to the toolkits—at the same inbox.
                  </p>
                </section>
                <section className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      What lives in this journal?
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        <span className="font-semibold">Core theory:</span>{" "}
                        the 11‑D tri‑plano action, six‑field PDE block, and the
                        mapping to 4‑D EMS dynamics.
                      </li>
                      <li>
                        <span className="font-semibold">Gate + fractional picture:</span>{" "}
                        two‑tier coherence gating on the downward projection
                        and a fractional Plane‑9 operator that yields 1/f
                        shoulders and long‑memory kernels.
                      </li>
                      <li>
                        <span className="font-semibold">Avalanche regime:</span>{" "}
                        a reduced (mℓ, V) system whose heavy‑tailed
                        avalanche statistics probe the same fractional order as
                        dwell‑time, spectral, and memory exponents.
                      </li>
                      <li>
                        <span className="font-semibold">Cross‑domain evidence:</span>{" "}
                        validations in gravitational‑wave ringdowns, laser
                        self‑instability, JJ arrays, quantum dots,
                        heterogeneous catalysts, EEG and HRV, Rindler
                        spacetimes, and more.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Design principles
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        <span className="font-semibold">Single meter, two gates:</span>{" "}
                        one coherence score mℓ(µ, γ, H) and two thresholds
                        (m1, m2) organize “slip” and “lock” regimes across
                        platforms.
                      </li>
                      <li>
                        <span className="font-semibold">Public data only:</span>{" "}
                        all validations are constructed to be re‑run from open
                        archives and scripted notebooks.
                      </li>
                      <li>
                        <span className="font-semibold">Falsifiability:</span>{" "}
                        signatures must tier with mℓ and disappear under
                        structured nulls (time/phase/label shuffles).
                      </li>
                      <li>
                        <span className="font-semibold">Versioned narrative:</span>{" "}
                        each PDF is a frozen snapshot; this journal records how
                        the theory and evidence evolve.
                      </li>
                    </ul>
                  </div>
                </section>
                <div className="rounded-lg border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
                  Prefer a field-theory dictionary first? The working notes
                  <a
                    href="/MPFST-Mapped-to-QFT.pdf"
                    className="text-emerald-300 font-medium hover:underline mx-1"
                  >
                    “MPFST Mapped to Quantum Field Theory”
                  </a>
                  walk QFT-trained readers through the Stage/Occupant/Mask planes,
                  show how Einstein–Maxwell–Schrödinger dynamics emerge in the gate-closed
                  regime, and spell out which Standard Model pieces remain open.
                </div>
              </CardContent>
            </Card>
        </section>

        {/* CORE THEORY */}
  <section id="theory" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-8">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Atom className="w-5 h-5 text-sky-300" />
                    Core theoretical frame
                  </h2>
                  <p className="text-slate-200">
                    The main MPFST v9 text presents the tri‑plano lattice, an
                    11‑D geometry with nested planes of fields and a
                    compatibility tensor tying them together. From a single
                    action, the theory recovers the Einstein–Maxwell-
                    Schrödinger sector, a fractional memory law, and a
                    gate‑controlled coherence sector.
                  </p>
                </section>

                <section className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      MPFST v9 (main text)
                    </h3>
                    <p className="text-sm text-slate-300">
                      Details the tri‑plano lattice geometry, plane hierarchy,
                      six coupled fields for the down‑projected sector, and
                      the full path from the 11‑D action to the effective 4‑D
                      EMS dynamics. Includes a glossary and simulator
                      appendix.
                    </p>
                    <a
                      href="/MPFST-V9.pdf"
                      className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      Download MPFST v9
                    </a>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Complements v9
                    </h3>
                    <p className="text-sm text-slate-300">
                      Introduces the two‑tier projection gate, makes the
                      fractional Plane‑9 operator explicit, defines a
                      coherence meter built from (µ, γ, H), and provides
                      instrument‑grade protocols and code for estimating
                      exponents and monitoring spectral shells.
                    </p>
                    <a
                      href="/MPFST-Complements-V9.pdf"
                      className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      Download Complements
                    </a>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Further development note
                    </h3>
                    <p className="text-sm text-slate-300">
                      Clarifies how the gate and avalanche valve emerge as
                      coarse‑grained observables of the action, sketches the
                      EFT/RG structure, and shows that with the gate closed
                      the theory reduces to GR+SM plus suppressed higher‑order
                      operators.
                    </p>
                    <a
                      href="/Further-Development-of-MPFST.pdf"
                      className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      Download further development
                    </a>
                  </div>
                </section>
              </CardContent>
            </Card>
        </section>

        {/* QFT BRIDGE */}
  <section id="qft" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Atom className="w-5 h-5 text-sky-300" />
                  MPFST ↔ Quantum Field Theory
                </h2>

                <p className="text-slate-200">
                  This working-note document constructs an explicit dictionary between the
                  11‑D tri-plane lattice of MPFST and standard quantum field theory (QFT).
                  It shows how the Einstein–Maxwell–Schrödinger sector and familiar QFT
                  objects (fields, propagators, gauge structure, renormalization,
                  measurement) arise as effective limits of the MPFST lattice and its
                  projection functional, while keeping the full Standard Model derivation
                  clearly marked as an open programme rather than a solved problem.
                </p>

                <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-slate-100">
                      What the mapping covers
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Synopsis of MPFST’s 11‑D tri-plane geometry (Stage, Occupant,
                        Mask/Source) and master action.
                      </li>
                      <li>
                        Dimensional reduction to a 4‑D Einstein–Maxwell–Schrödinger sector
                        reproducing GR + Maxwell + scalar QFT in the gate-closed regime.
                      </li>
                      <li>
                        Plane-by-plane dictionary linking Stage blocks, Occupant fields,
                        and Mask/Source channels to QFT fields, gauge potentials,
                        propagators, and vacuum stress.
                      </li>
                      <li>
                        Coherence/measurement model via fractional-memory projection and
                        a two-tier gate instead of an ad hoc collapse postulate.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-slate-100">
                      Status and open questions
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Standard Model embedding is proposed but incomplete: non-Abelian
                        sectors, chiral spinors, and Yukawa structure remain open.
                      </li>
                      <li>
                        High-coherence, six-PDE lattice dynamics plus early-universe / CMB
                        signatures are active research threads.
                      </li>
                      <li>
                        Avalanche/gating dynamics are validated across domains, but the
                        full quantum-information formulation of the projection map is
                        ongoing work.
                      </li>
                      <li>
                        Exotic propulsion claims are constrained: local stress-energy
                        conservation is respected and there is no path to reactionless
                        drives within the current mapping.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-slate-300">
                    For the complete technical dictionary, derivations, and open-problem
                    list, download the working notes.
                  </p>
                  <a
                    href="/MPFST-Mapped-to-QFT.pdf"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm border border-emerald-500 rounded-md text-emerald-200 hover:bg-emerald-500/10 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download “MPFST Mapped to QFT”
                  </a>
                </div>
              </CardContent>
            </Card>
        </section>

        {/* AVALANCHE & TOOLKIT */}
  <section id="avalanche" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-8">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    Avalanche mechanism
                  </h2>
                  <p className="text-slate-200">
                    In the gate‑controlled regime, MPFST compresses the
                    coherence dynamics into a reduced pair (mℓ(t), V(t)):
                    a time‑resolved coherence meter and a leaky valve
                    integrating fractional energy flux. Avalanches are defined
                    as finite‑time excursions where both mℓ and V stay above
                    gate thresholds, with sizes given by the area of V above a
                    data‑driven cutoff.
                  </p>
                  <p className="text-slate-300">
                    Analytical and numerical work show that the avalanche size
                    distribution acquires a heavy‑tailed form whose exponent
                    is tied to the same fractional order controlling dwell‑time
                    tails, 1/f slopes, and long‑range memory. The avalanche
                    exponent is therefore not a new parameter, but an
                    additional probe of the underlying fractional geometry.
                  </p>
                </section>

                <section className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Avalanche Addendum (construction)
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
                      <li>
                        Defines a coherence meter mℓ(t) from sliding‑window
                        estimates of (µ, γ, H).
                      </li>
                      <li>
                        Builds a latent gate trace and a soft two‑tier valve
                        V(t) living on the same thresholds m1, m2 as the
                        original gate.
                      </li>
                      <li>
                        Specifies avalanche segmentation rules and the ranked
                        size function Aℓ(k) for tail fitting.
                      </li>
                      <li>
                        Introduces a cross‑domain pipeline with bootstrap
                        confidence intervals and surrogate nulls, implemented
                        in the avalanche evidence repository.
                      </li>
                    </ul>
                    <a
                      href="/Avalanche-MPFST.pdf"
                      className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      Download Avalanche Addendum
                    </a>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Avalanche & Coherence Toolkit (DOI)
                    </h3>
                    <p className="text-sm text-slate-300">
                      The toolkit at the Zenodo DOI below packages the
                      avalanche pipeline: exponent estimation, coherence meter
                      construction, valve dynamics, avalanche segmentation,
                      tail fits with BCa intervals, and surrogate null tests
                      for gravitational-wave ringdowns, laser
                      self-frequency-instability traces, and resting-state
                      EEG.
                    </p>
                    <div className="rounded-md border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm">
                      <div className="font-mono break-all">
                        https://doi.org/10.5281/zenodo.17776043
                      </div>
                      <a
                        href={TOOLKIT_DOI_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200"
                      >
                        <Key className="w-4 h-4" />
                        Open toolkit on Zenodo
                      </a>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
        </section>

        {/* EMPIRICAL EVIDENCE */}
  <section id="evidence" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-8">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-emerald-300" />
                    Cross-domain evidence
                  </h2>
                  <p className="text-slate-200">
                    The empirical program is built around one meter mℓ(µ, γ, H),
                    two fixed gates m1, m2, and a Spectral Shell Monitor
                    detecting octave-like slips and jumps. Effects must tier
                    with mℓ and vanish under time, phase, label, or graph
                    shuffles to count as support.
                  </p>
                </section>

                <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Physics & chemistry set
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        Quantum “measurement” without ad-hoc collapse:
                        slips at m1, locks at m2, nulls kill the tiering.
                      </li>
                      <li>
                        Dark-sector residuals as coherence budget:
                        residual variance drops with coherence conditioning.
                      </li>
                      <li>
                        GW overtones, high-Tc, plasma ELMs, catalysis, water
                        anomalies, and batteries all show gate-tied slips,
                        locks, and shell jumps.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Rindler spacetime experiment
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        Successive Rindler detector shows Δγ ≈ +0.2, heavier
                        bursts (µ↓), and higher H in the higher-tier frame.
                      </li>
                      <li>
                        SSM reveals an intra-shell slip followed by an
                        inter-shell jump as the detector locks into a Planckian
                        steady state.
                      </li>
                      <li>
                        Time-domain dynamics exhibit a clear slip→lock
                        transition at m1 ≈ 0.33 and m2 ≈ 0.66 that vanishes
                        under structured nulls.
                      </li>
                    </ul>
                    <a
                      href="/Empirical-Support-Rindler-MPFST.pdf"
                      className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      Rindler support PDF
                    </a>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Neuroscience & physiology
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        EEG bands map one-to-one to latent Occupant fields; the
                        monotone mapping model decisively outperforms null and
                        inverted models.
                      </li>
                      <li>
                        Shell jumps produce band-specific power changes that
                        disappear under label shuffles.
                      </li>
                      <li>
                        Gate-dependent entrainment and brain–heart–gut–pelvis
                        coherence show driver→system directionality only at
                        mℓ ≥ m2.
                      </li>
                    </ul>
                    <a
                      href="/Mapping-EEG-Bands-to-MPFST-Occupant-Fields.pdf"
                      className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      EEG–Occupant mapping PDF
                    </a>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Negative-control dossier
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        Runs the MPFST coherence meter on stochastic, nominally
                        incoherent systems under strict negative controls.
                      </li>
                      <li>
                        Detects systematic scaling-law violations only when the
                        hidden gate is forced open—µ softens, γ steepens, H drifts.
                      </li>
                      <li>
                        All anomalies collapse under shuffled or inverted controls,
                        reinforcing falsifiability of the gate mechanism.
                      </li>
                    </ul>
                    <a
                      href="/Validation-of-MPFST-Negative-Control-Scaling-Law-Violations.pdf"
                      className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200"
                    >
                      <Download className="w-4 h-4" />
                      Negative-control validation PDF
                    </a>
                  </div>
                </section>
              </CardContent>
            </Card>
        </section>

        {/* ARCHIVE */}
  <section id="archive" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-8">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-emerald-300" />
                    Journal archive
                  </h2>
                  <p className="text-slate-200">
                    All MPFST articles currently in circulation are listed
                    below. Each PDF is a frozen version; when a document is
                    substantially revised, it appears as a new entry rather
                    than silently replacing an older one.
                  </p>
                </section>

                {categoryOrder.map((cat) => {
                  const grouped = articles.filter(
                    (article) => article.category === cat
                  );
                  if (!grouped.length) return null;
                  return (
                    <section key={cat} className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-100">
                        {cat}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {grouped.map((article) => (
                          <div
                            key={article.id}
                            className="rounded-lg border border-slate-700 bg-slate-950/60 p-4 flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-semibold text-slate-100">
                                  {article.title}
                                </h4>
                                {article.year && (
                                  <span className="text-xs text-slate-400 whitespace-nowrap">
                                    {article.year}
                                  </span>
                                )}
                              </div>
                              {article.highlight && (
                                <p className="text-xs text-emerald-300">
                                  {article.highlight}
                                </p>
                              )}
                              <p className="text-sm text-slate-300">
                                {article.blurb}
                              </p>
                            </div>
                            <div className="mt-3">
                              {article.pdfPath && (
                                <a
                                  href={article.pdfPath}
                                  className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                                >
                                  <Download className="w-4 h-4" />
                                  Download PDF
                                </a>
                              )}
                              {!article.pdfPath && article.externalUrl && (
                                <a
                                  href={article.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                                >
                                  <Download className="w-4 h-4" />
                                  Open external resource
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </CardContent>
            </Card>
        </section>

        {/* DATA, CODE & REPLICATION */}
  <section id="repro" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-8">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-sky-300" />
                    Data, code & replication
                  </h2>
                  <p className="text-slate-200">
                    MPFST is designed to be testable. Each empirical claim in
                    the PDFs is backed by a concrete data pipeline that can be
                    re-run by independent groups using public archives.
                  </p>
                </section>

                <section className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Exponent & coherence toolbox
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>CSN power-law tail fits for dwell/burst distributions.</li>
                      <li>
                        PSD slope γ estimation and DFA-2 Hurst exponent H for
                        long-memory.
                      </li>
                      <li>
                        Coherence meter mℓ(µ, γ, H) with a PID-style mel-servo
                        for device-level control.
                      </li>
                      <li>
                        Spectral Shell Monitor for octave-like slips and jumps.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      Avalanche & cross-domain pipelines
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        CLI tools for running the avalanche pipeline on EEG,
                        laser SFI, and GW ringdowns.
                      </li>
                      <li>
                        Bootstrap routines for BCa confidence intervals on tail
                        exponents.
                      </li>
                      <li>
                        Surrogate generators (time/phase shuffles, IAAFT) to
                        verify that signatures vanish under nulls.
                      </li>
                      <li>
                        Parameters mapped transparently to theoretical
                        quantities (gate quantiles, tail fractions, etc.).
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-100">
                      External datasets & notebooks
                    </h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>
                        JJ arrays and quantum dots: notebooks that download
                        data directly from DOIs and reproduce figures.
                      </li>
                      <li>
                        Public EEG, HRV, GW, and astrophysical archives with
                        ready-to-run pipelines.
                      </li>
                      <li>
                        Guidance for plugging new domains into the same
                        (µ, γ, H) → mℓ → gate/avalanche stack.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Simple subscribe box so you can plug in a real backend later */}
                <section className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    Release notifications
                  </h3>
                  <p className="text-sm text-slate-300">
                    Enter an email address to receive versioned release notes
                    when new PDFs, toolkits, or validation notes are added to
                    this journal (hook this up to your preferred mailing or
                    webhook backend).
                  </p>
                  {!subscribed ? (
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                      <Input
                        type="email"
                        placeholder="you@institution.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                        className="flex-1 bg-slate-950/80 border-slate-600 text-slate-100"
                      />
                      <Button onClick={handleSubscribe} disabled={status === "loading"}>
                        {status === "loading" ? "Sending..." : "Notify me"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-emerald-300">
                      Thanks — you’re on the release list. You can change the
                      destination backend any time via /api/subscribe.
                    </div>
                  )}
                  {status === "error" && errorMessage && (
                    <p className="text-sm text-rose-300">{errorMessage}</p>
                  )}
                </section>
              </CardContent>
            </Card>
        </section>

        {/* HOW TO CITE */}
  <section id="cite" data-scroll-section className="scroll-section pt-10 scroll-mt-32">
            <Card className="bg-slate-900/60 backdrop-blur border-slate-700">
              <CardContent className="p-6 space-y-6">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-emerald-300" />
                    How to cite MPFST work
                  </h2>
                  <p className="text-slate-200">
                    Suggested citation templates (adapt names/years if the
                    headers change in future versions). Where possible, cite
                    the core theory plus the relevant empirical or toolkit
                    note.
                  </p>
                </section>

                <section className="space-y-2 text-sm">
                  <h3 className="font-semibold text-slate-100">
                    Core theory
                  </h3>
                  <p className="font-mono text-slate-300">
                    Freeman, C. (2025). Multi-Plane Field Syntergic Theory
                    (MPFST): From an 11-D lattice action to 4-D
                    Einstein-Maxwell-Schrödinger thermodynamics. MPFST
                    Journal, v9. Retrieved from https://mpfst.com/MPFST-V9.pdf
                  </p>
                </section>

                <section className="space-y-2 text-sm">
                  <h3 className="font-semibold text-slate-100">
                    Complements & avalanche
                  </h3>
                  <p className="font-mono text-slate-300">
                    MPFST Working Group. (2025). MPFST Complements v9:
                    Post-publication validations, fractional-exponent pinning,
                    and device-level control. The MUlti-Plane Field Syntergic
                    Theory MPFST Journal. Retrieved from
                    https://mpfst.com/MPFST-Complements-V9.pdf
                  </p>
                  <p className="font-mono text-slate-300">
                    MPFST Working Group. (2025). MPFST Avalanche Addendum:
                    Two-tier coherence gating and avalanche statistics across
                    gravitational, photonic, and neural systems. The
                    MUlti-Plane Field Syntergic Theory MPFST Journal.
                    Retrieved from
                    https://mpfst.com/Avalanche-MPFST.pdf
                  </p>
                </section>

                <section className="space-y-2 text-sm">
                  <h3 className="font-semibold text-slate-100">
                    Empirical dossiers & domain studies
                  </h3>
                  <p className="font-mono text-slate-300">
                    MPFST Working Group. (2025). MPFST Cross-Domain Empirical
                    Validations: Consolidated dossier (physics, chemistry,
                    biology). The MUlti-Plane Field Syntergic Theory MPFST
                    Journal. Retrieved from
                    https://mpfst.com/Empirical-Evidence-MPFST.pdf
                  </p>
                  <p className="font-mono text-slate-300">
                    MPFST Working Group. (2025). Empirical support for MPFST
                    predictions in successive Rindler data. The MUlti-Plane
                    Field Syntergic Theory MPFST Journal. Retrieved from
                    https://mpfst.com/Empirical-Support-Rindler-MPFST.pdf
                  </p>
                  <p className="font-mono text-slate-300">
                    MPFST Working Group. (2025). Mapping EEG bands to MPFST
                    Occupant fields: Analysis and results. The MUlti-Plane
                    Field Syntergic Theory MPFST Journal. Retrieved from
                    https://mpfst.com/Mapping-EEG-Bands-to-MPFST-Occupant-Fields.pdf
                  </p>
                </section>

                <section className="space-y-2 text-sm">
                  <h3 className="font-semibold text-slate-100">
                    Tools & code
                  </h3>
                  <p className="font-mono text-slate-300">
                    MPFST Working Group. (2025). Avalanche & coherence toolkit
                    for MPFST: Cross-domain validation pipelines (Version 1.0)
                    [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.17776043
                  </p>
                </section>
              </CardContent>
            </Card>
        </section>

        {/* FOOTER */}
        <footer className="text-center mt-16 text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} The MUlti-Plane Field Syntergic
          Theory MPFST Journal &middot; All rights reserved.
        </footer>
      </div>
    </div>
  );
}