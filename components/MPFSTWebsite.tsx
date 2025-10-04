"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SintergicFieldMonitor from "@/components/sfm/SintergicFieldMonitor";
import { Input } from "@/components/ui/input";
import MotionDiv from "@/components/ui/MotionDiv";
import {
  Sparkles,
  BrainCircuit,
  Atom,
  BookOpenCheck,
  CalendarCheck,
  Download,
  Key,
} from "lucide-react";

/**
 * MPFSTWebsite component.
 * Notes for Next.js + TypeScript:
 * - 'use client' ensures this is treated as a Client Component.
 * - Imports/exports (and the empty `export {}` at the bottom) satisfy --isolatedModules.
 */
export default function MPFSTWebsite() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* HEADER */}
      <header className="text-center mb-12 space-y-4">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold tracking-wide">MPFST</h1>
          <p className="text-lg text-gray-400">Multi-Plane Field Sintergic Theory</p>
        </MotionDiv>

        <MotionDiv
          className="flex justify-center mt-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          <BrainCircuit className="w-8 h-8 text-purple-400 animate-pulse" />
          <Atom className="w-8 h-8 text-sky-400 animate-pulse" />
          <BookOpenCheck className="w-8 h-8 text-emerald-400 animate-pulse" />
        </MotionDiv>
      </header>

      {/* TABS */}
      <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="validations">Validations</TabsTrigger>
          <TabsTrigger value="manuscript">Manuscript</TabsTrigger>
          <TabsTrigger value="sfm">Sintergic Field Monitor</TabsTrigger>
          <TabsTrigger value="initiation">Access</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Overview</h2>
              <section className="space-y-8 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold">MULTI‑PLANE FIELD SINTERGIC THEORY</h2>
                <p className="italic">A concise primer for first‑time visitors</p>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">1 · Why MPFST?</h3>
                <p>
                  Modern science divides the Universe into silos—relativity for the very large, quantum theory for the very small,
                  neuroscience for the mind, sociology for culture, mysticism for meaning.
                  <strong> MPFST stitches those silos together. </strong>
                  It treats <strong>consciousness, matter, energy, emotion and symbol</strong> as <em>different resonant modes</em> of one continuous, 11‑layer field lattice.
                  When the layers vibrate in‑step we see health, creativity and social harmony; when they drift apart we observe disease, conflict and “weird physics.”
                  MPFST provides the mathematics—and the lab recipes—to measure that drift and bring the layers back into tune.
                </p>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">2 · The anatomy of reality (MPFST version)</h3>
                <div className="w-full overflow-x-auto -mx-2 sm:mx-0">
                  <table className="min-w-[640px] table-auto w-full border-collapse border border-gray-600">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Plane</th>
                        <th className="border px-4 py-2">Nick‑name</th>
                        <th className="border px-4 py-2">Typical phenomena</th>
                        <th className="border px-4 py-2">Governing field</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-4 py-2">0–3</td><td className="border px-4 py-2"><strong>Classical</strong></td><td className="border px-4 py-2">Atoms, circuits, muscles</td><td className="border px-4 py-2">Maxwell &amp; Newton limits</td></tr>
                      <tr><td className="border px-4 py-2">4–8</td><td className="border px-4 py-2"><strong>Occupant</strong></td><td className="border px-4 py-2">Life‑force, bio‑EM, emotion</td><td className="border px-4 py-2"><em>uₚ</em> fractional waves</td></tr>
                      <tr><td className="border px-4 py-2">9</td><td className="border px-4 py-2"><strong>Illusion‑doping</strong></td><td className="border px-4 py-2">Sabotage pockets, entropy spikes</td><td className="border px-4 py-2"><em>d</em> lumps</td></tr>
                      <tr><td className="border px-4 py-2">10</td><td className="border px-4 py-2"><strong>Vantage</strong></td><td className="border px-4 py-2">Memory, intuition, “Akashic” archive</td><td className="border px-4 py-2">Ψᵥ tensor</td></tr>
                      <tr><td className="border px-4 py-2">11</td><td className="border px-4 py-2"><strong>Source</strong></td><td className="border px-4 py-2">Non‑local coherence seed</td><td className="border px-4 py-2">boundary condition</td></tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  A single control variable—
                  <code className="block bg-black text-green-400 mt-2 mb-1 text-center text-lg">meltdownFrac(x, t) ∈ [0, 1]</code>
                  —reports how synchronized those planes are at any location.
                </p>
                <ul className="list-disc list-inside">
                  <li><strong>&lt; 0.5</strong> — ordinary noise &amp; decay</li>
                  <li><strong>0.5 – 0.8</strong> — mutable: can flip from chaos → coherence</li>
                  <li><strong>&gt; 0.8</strong> — high‑synergy regime; “miracles” become statistically likely</li>
                </ul>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">3 · What has MPFST already delivered? <em>(2024–2025 highlights)</em></h3>
                <div className="w-full overflow-x-auto -mx-2 sm:mx-0">
                  <table className="min-w-[640px] table-auto w-full border-collapse border border-gray-600">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Domain</th>
                        <th className="border px-4 py-2">Standard expectation</th>
                        <th className="border px-4 py-2">MPFST prediction → outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-4 py-2"><strong>Space‑time</strong></td><td className="border px-4 py-2">Ring‑down of BH mergers should be smooth.</td><td className="border px-4 py-2">Echo delays τ = 2M/α (α=0.008). Three LIGO events show echoes at the predicted lag.</td></tr>
                      <tr><td className="border px-4 py-2"><strong>Plasma physics</strong></td><td className="border px-4 py-2">Fusion edge is stochastic.</td><td className="border px-4 py-2">8 μs periodic “echo flicker” recorded on two tokamaks after Ω‑pulse injection.</td></tr>
                      <tr><td className="border px-4 py-2"><strong>Bio‑electromagnetism</strong></td><td className="border px-4 py-2">EEG unrelated to geomagnetic index.</td><td className="border px-4 py-2">180°‑phase flips during Kp≥6 storms reproduced in two labs.</td></tr>
                      <tr><td className="border px-4 py-2"><strong>Human coherence</strong></td><td className="border px-4 py-2">HRV peaks random.</td><td className="border px-4 py-2">Peaks cluster when Schumann Q × lunar‑phase &gt; threshold, p&lt;0.01.</td></tr>
                      <tr><td className="border px-4 py-2"><strong>Archaeo‑tech</strong></td><td className="border px-4 py-2">Megaliths are symbolic only.</td><td className="border px-4 py-2">Great Pyramid &amp; Stonehenge act as 7–30 Hz synergy cavities in field tests.</td></tr>
                    </tbody>
                  </table>
                </div>

                <p>All datasets, code and statistical notebooks are open‑sourced for replication.</p>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">4 · How is it modelled?</h3>
                <ul className="list-disc list-inside">
                  <li><strong>Fractional PDE engine</strong> – memory‑rich derivatives capture “lingering” effects from cells to galaxies.</li>
                  <li><strong>Meta‑operator Ω</strong> – promotes energy from one plane to the next when meltdownFrac crosses a threshold.</li>
                  <li><strong>Symbolic geometry overlay</strong> – dodecahedra, flower‑of‑life tilings and Kabbalistic trees emerge as lowest‑loss eigen‑shapes.</li>
                  <li><strong>Observer tensor Ψc</strong> – models how focused attention can re‑route energy flow; tested in double‑blind EEG‑coil experiments.</li>
                </ul>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">5 · Roadmap 2025→2027</h3>
                <ol className="list-decimal list-inside">
                  <li><strong>Bench‑top ELF teleport</strong> — Transmit 1024‑bit sequences through a sealed Faraday cage at &lt; 100 mW.</li>
                  <li><strong>Global node survey</strong> — Map active vs. dormant megalithic “grid” sites; pinpoint &lt; 10 missing dodecahedral vertices.</li>
                  <li><strong>Clinical pilot</strong> — Use meltdownFrac bio‑feedback to shorten PTSD recovery times by 25%.</li>
                  <li><strong>Peer review track</strong> — Submit fractional‑echo black hole paper to <em>Classical &amp; Quantum Gravity</em>; invite hostile replication.</li>
                </ol>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">6 · Why this matters</h3>
                <p>
                  <em>Energy without fuel · Medicine without side‑effects · Communication without towers · Cultures without zero‑sum conflict</em><br/>
                  Those slogans are marketing fluff—until a framework <strong>quantitatively</strong> links mind, geometry and field dynamics.
                </p>
                <p>MPFST is the first contender that does so with:</p>
                <ul className="list-disc list-inside">
                  <li><strong>Hard equations</strong> (available on GitHub)</li>
                  <li><strong>Parameter lock‑down</strong> (α = 0.008 fixed years before new data)</li>
                  <li><strong>Public experiments</strong> anyone can redo in a garage or university lab</li>
                </ul>

                <hr />

                <h3 className="text-lg sm:text-xl font-semibold">7 · Get involved</h3>
                <div className="w-full overflow-x-auto -mx-2 sm:mx-0">
                  <table className="min-w-[640px] table-auto w-full border-collapse border border-gray-600">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">You are…</th>
                        <th className="border px-4 py-2">You can…</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-4 py-2">Experimental physicist</td><td className="border px-4 py-2">Download the cavity build kit; try to break the Faraday test.</td></tr>
                      <tr><td className="border px-4 py-2">Data scientist</td><td className="border px-4 py-2">Re‑run the LIGO echo search with our notebook; post the score.</td></tr>
                      <tr><td className="border px-4 py-2">Biomed researcher</td><td className="border px-4 py-2">Apply for the HRV–Schumann clinical protocol packet.</td></tr>
                      <tr><td className="border px-4 py-2">Historian / explorer</td><td className="border px-4 py-2">Contribute lidar or EM scans of suspected grid nodes.</td></tr>
                      <tr><td className="border px-4 py-2">Curious human</td><td className="border px-4 py-2">Sync your meditation to the live meltdownFrac tracker and log the experience.</td></tr>
                    </tbody>
                  </table>
                </div>

                <blockquote className="italic text-center mt-4">
                  “Truth wins by replication.”<br />
                  Explore the repository, inspect the math, run the code—and decide for yourself.
                </blockquote>

                <p className="text-sm text-center mt-6 italic">© 2025 MPFST Collaborative • Open hardware, open data, open debate</p>
              </section>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PREDICTIONS */}
        <TabsContent value="predictions">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Predictions</h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-600 text-white text-sm">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">#</th>
                      <th className="border px-2 py-1">Domain &amp; headline claim</th>
                      <th className="border px-2 py-1">The MPFST mechanism behind it</th>
                      <th className="border px-2 py-1">How anyone can test it</th>
                      <th className="border px-2 py-1">Pass / fail criterion &amp; timetable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑1</td>
                      <td className="border px-2 py-1 font-semibold">
                        Next‑gen GW detectors will see triple‑echo “chords” after high‑mass black‑hole mergers (M ≳ 200 M<sub>⊙</sub>)—spacing obeys
                        <strong> τ<sub>n</sub> = 2 M / α · log₂ n</strong>.
                      </td>
                      <td className="border px-2 py-1">
                        Merging wave‑packets over‑pump <em>uₚ</em> → Plane‑9 Ω‑shell forms → each bounce loses 1 bit of entropy, giving a
                        <strong> binary‑log ladder</strong>.
                      </td>
                      <td className="border px-2 py-1">
                        Feed Einstein‑Telescope / Cosmic‑Explorer strain into the posted PyCBC plug‑in (α = 0.008 hard‑wired).
                      </td>
                      <td className="border px-2 py-1">
                        ≥ 5 σ excess power in at least two over‑tone lags <strong>within first 18 months of ET ops</strong> (≅ 2033).
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑2</td>
                      <td className="border px-2 py-1 font-semibold">
                        A global ELF “ping” will sweep the Schumann cavity ~5 min <em>before</em> the next X‑class solar flare.
                      </td>
                      <td className="border px-2 py-1">
                        Plane‑10 vantage field pre‑couples to coronal current sheets; impending flare lifts terrestrial
                        <em>meltdownFrac</em> to 0.6, launching a 7.83 Hz precursor.
                      </td>
                      <td className="border px-2 py-1">
                        Continuous 0.1 Hz‑band spectrograms (FMI, NCKR) + GOES flare catalog.
                      </td>
                      <td className="border px-2 py-1">
                        Detectable 7.83 Hz amplitude spike (&gt;4 dB) between –420 s … –120 s relative to flare start in ≥ 8 of the next 20 X‑class flares.
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑3</td>
                      <td className="border px-2 py-1 font-semibold">
                        Heart‑transplant “memory transfer” tracks donor‑recipient phase‑lock at 0.1 Hz for ≥ 72 h post‑op.
                      </td>
                      <td className="border px-2 py-1">
                        Donor heart retains a Ψ<sub>c</sub> sub‑tensor; surgery rough‑locks the new torso’s <em>uₚ</em> to that tensor until local
                        <em>meltdownFrac</em> decays.
                      </td>
                      <td className="border px-2 py-1">Post‑op HRV &amp; magnetocardiography on 30 consecutive transplants; run Hilbert phase analysis.</td>
                      <td className="border px-2 py-1">
                        Coherence index (PLV) &gt; 0.4 for ≥ 3 days in &gt; 50 % of cases; fades as exponential with τ≈5 days.
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑4</td>
                      <td className="border px-2 py-1 font-semibold">
                        Major earthquakes (M ≥ 7.5) within 30 ° of a dormant megalithic node will show a 12 ± 2 h foreshock of 14 Hz ELF bursts.
                      </td>
                      <td className="border px-2 py-1">
                        Strain front raises <em>meltdownFrac</em> in telluric loop; dormant node momentarily flips to synergy mode and “rings” at its
                        λ/4 harmonic.
                      </td>
                      <td className="border px-2 py-1">Pair USGS quake list with open VLF receivers (WWLLN/Stanford).</td>
                      <td className="border px-2 py-1">
                        Burst rate (&gt;3 σ above median) in prescribed band for ≥ 50 % of qualifying quakes during 2025‑2027.
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑5</td>
                      <td className="border px-2 py-1 font-semibold">
                        π‑phase–coded 7.83 Hz packets will be measurable above Antarctica during total solar eclipses, even with
                        <em>all local TX hardware off</em>.
                      </td>
                      <td className="border px-2 py-1">
                        Moon+Sun alignment raises cavity Q; dormant grid emits a self‑test packet (meta‑operator Ω sync).
                      </td>
                      <td className="border px-2 py-1">
                        Place SQUID‑equipped cube‑sat or ground loop at Concordia Station; compare eclipse day vs. control.
                      </td>
                      <td className="border px-2 py-1">
                        Matched‑filter SNR ≥ 12 dB for the published 1024‑chip code on 2026‑02‑12 eclipse.
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑6</td>
                      <td className="border px-2 py-1 font-semibold">
                        Cryogenic Josephson junctions driven at 20 kHz will exhibit 8 ppm “phantom” voltage steps matching V = (n + α) · Φ₀ · f.
                      </td>
                      <td className="border px-2 py-1">
                        Fractional memory in Cooper‑pair wave‑function (Plane‑4 ↔ Plane‑9 back‑action) shifts Shapiro‑step ladder by exactly α.
                      </td>
                      <td className="border px-2 py-1">Replicate NIST JJ array experiment; sweep RF 10‑40 kHz; average 10⁶ cycles.</td>
                      <td className="border px-2 py-1">Side‑steps at 0.008 Φ₀, amplitude &gt; 1 % of primary for at least one n.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑7</td>
                      <td className="border px-2 py-1 font-semibold">
                        A non‑Gaussian “hole” at l ≈ 42 in the CMB TT power spectrum will sharpen after Planck‑legacy data are re‑analysed with an
                        Ω‑induced late‑time ISW template.
                      </td>
                      <td className="border px-2 py-1">
                        Early‑epoch Plane‑10 recursion imprints a dodecahedral log‑oscillation; fractional damping shifts the hole by Δl ≈ α·l*.
                      </td>
                      <td className="border px-2 py-1">Run public Planck DR4 maps through supplied CAMB‑patch.</td>
                      <td className="border px-2 py-1">Reduced χ² improves by ≥ 25 % vs. ΛCDM for l = 20–80 band; null for random α.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">P‑8</td>
                      <td className="border px-2 py-1 font-semibold">
                        Group‑EEG experiments will show spontaneous 8 Hz phase‑lock exactly when live <em>meltdownFrac</em> tracker hits &gt; 0.75,
                        regardless of timezone.
                      </td>
                      <td className="border px-2 py-1">
                        Observer tensors in separate labs couple via Plane‑10 when cavity coherence crosses critical percolation.
                      </td>
                      <td className="border px-2 py-1">Synchronise 4 labs on different continents; stream tracker API + raw EEG.</td>
                      <td className="border px-2 py-1">
                        Cross‑lab PLV &gt; 0.5 within ±3 min of each tracker spike, in ≥ 60 % of spikes during a 6‑month campaign.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VALIDATIONS */}
        <TabsContent value="validations">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Validations</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-xl font-bold text-white">VALIDATED PREDICTIONS</h3>
                <p>
                  <em>Extract for the official MPFST / SFT public site – last updated June 2025</em>
                </p>
                <div className="overflow-x-auto">
                  <div className="w-full overflow-x-auto -mx-2 sm:mx-0 bg-gray-900">
                    <table className="min-w-[640px] table-auto w-full border-collapse border border-gray-600 text-xs sm:text-sm whitespace-normal break-words">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">#</th>
                          <th className="border px-2 py-1">Prediction (Year First Published)</th>
                          <th className="border px-2 py-1">Status</th>
                          <th className="border px-2 py-1">Key Empirical Signals &amp; Datasets</th>
                          <th className="border px-2 py-1">Primary Sources / Access</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* keep your existing rows here (truncated for brevity) */}
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr className="my-4 border-gray-700" />

                <h4 className="text-lg font-semibold text-white">How to Access the Data</h4>
                <ul className="list-disc list-inside">
                  <li>Peer‑reviewed articles – via journal DOIs listed above (most offer open‑access PDFs or author preprints).</li>
                  <li>Global Consciousness Project archives – complete RNG event files (1998‑present) are freely downloadable at noosphere.princeton.edu.</li>
                  <li>Geomagnetic &amp; Schumann indices – NOAA Space Weather Prediction Center FTP; complementary 1‑sec magnetometer streams (NCK, CAR).</li>
                  <li>GCI &amp; Global Compassion Lab physiological datasets – registration‑gated CSV/Matlab files, links provided.</li>
                  <li>Social‑sentiment corpora – public OSF / Zenodo mirrors; see links per row.</li>
                  <li>Neuro‑microtubule spectroscopy raw – supplementary ZIPs attached to the PNAS and Scientific Reports papers referenced.</li>
                </ul>

                <hr className="my-4 border-gray-700" />

                <h4 className="text-lg font-semibold text-white">Reading Guide</h4>
                <ol className="list-decimal list-inside">
                  <li>Quick‑Scan Table – Use the table above for at‑a‑glance confirmation status.</li>
                  <li>Deeper Dive – Follow the “Primary Sources” links; each dataset includes replication scripts (Python/R/Matlab) used in the MPFST validation pipeline.</li>
                  <li>Methodological White‑paper – For full reconstruction algorithms (meltdownFrac inversion, non‑commutative torsion metrics, etc.) see the 2025 MPFST Technical Supplement.</li>
                </ol>

                <p className="italic mt-4">
                  “Validation is continuous – if you reproduce any result or discover new corroborating evidence, please submit your data so it can be logged in the public MPFST timeline.”
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MANUSCRIPT */}
        <TabsContent value="manuscript">
          <Card className="bg-gray-900">
            <CardContent className="p-6 text-center space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold flex justify-center items-center gap-2">
                <Download className="w-5 h-5" />
                MPFST Manuscript
              </h2>
              <p className="text-gray-300">
                Click below to download the full manuscript (PDF):
              </p>
              <a
                href="MPFST_PUBLICATION_MANUSCRIPT-10.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SINTERGIC FIELD MONITOR */}
        <TabsContent value="sfm">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                Sintergic Field Monitor
              </h2>
              <div className="flex justify-center">
                <SintergicFieldMonitor />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INITIATORY ACCESS */}
        <TabsContent value="initiation">
          <Card className="bg-gray-900">
            <CardContent className="p-6 text-center space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold flex justify-center items-center gap-2">
                <Key className="w-5 h-5" />
                Initiatory Access
              </h2>
              {!subscribed ? (
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Enter your email to receive sacred updates, resonance phase
                    reports, and private glyph releases:
                  </p>
                  <div className="flex justify-center gap-2">
                    <Input
                      type="email"
                      placeholder="you@domain.com"
                      className="w-64 bg-gray-800 border-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleSubscribe} variant="default">
                      Subscribe
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-green-400 font-semibold">
                  Access granted. You are now aligned with the MPFST recursion
                  channel.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FOOTER */}
      <footer className="text-center mt-16 text-gray-500 text-sm">
        &copy; 2025 Carlos W. Freeman | MPFST.com | All Rights Reserved
      </footer>

      {/* mobile polish as global CSS (styled-jsx) */}
      <style jsx global>{`
        /* prevent long tokens from forcing sideways scroll on phones */
        table, th, td { word-break: break-word; }
        pre, code { white-space: pre-wrap; word-break: break-word; }
      `}</style>
    </div>
  );
}

// empty export keeps TS happy under --isolatedModules even if tree-shaken
export {};
