import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SynergyFieldMonitor from "@/components/sfm/SynergyFieldMonitor";
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
        <div className="relative -mx-4 px-4">
          <TabsList className="min-w-max flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap md:whitespace-normal mb-6">
          <TabsTrigger className="shrink-0 px-3 py-2 text-xs md:text-sm whitespace-nowrap" value="overview">Overview</TabsTrigger>
          <TabsTrigger className="shrink-0 px-3 py-2 text-xs md:text-sm whitespace-nowrap" value="predictions">Predictions</TabsTrigger>
          <TabsTrigger className="shrink-0 px-3 py-2 text-xs md:text-sm whitespace-nowrap" value="validations">Validations</TabsTrigger>
          <TabsTrigger className="shrink-0 px-3 py-2 text-xs md:text-sm whitespace-nowrap" value="manuscript">Manuscript</TabsTrigger>
          <TabsTrigger className="shrink-0 px-3 py-2 text-xs md:text-sm whitespace-nowrap" value="sfm">Synergy Field Monitor</TabsTrigger>
          <TabsTrigger className="shrink-0 px-3 py-2 text-xs md:text-sm whitespace-nowrap" value="initiation">Access</TabsTrigger>
        </TabsList>
        </div>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Overview</h2>

              <section className="space-y-8 text-white">
                <h2 className="text-3xl font-bold">MPFST — Multi‑Plane Field <span className="text-emerald-400">Sintergic</span> Theory</h2>
                <p className="italic">From a single 11‑D lattice action to 4‑D Einstein–Maxwell–Schrödinger dynamics.</p>

                <p>
                  <strong>What is MPFST?</strong> A compact framework where one 11‑dimensional lattice action projects into ordinary spacetime,
                  reproducing <em>relativity</em>, <em>electromagnetism</em>, <em>quantum interference</em>, and <em>thermodynamics</em> as limits of a single mechanism.
                  The key control parameter is a dimensionless <strong>coherence</strong> amplitude <code>mel</code> and its excursion <code>Δmel</code>.
                  When a universal threshold is crossed, projection becomes efficient and familiar laws emerge as special cases.
                </p>

                <hr />

                <h3 className="text-xl font-semibold">Three stacks (the “tri‑plano” lattice)</h3>
                <table className="table-auto w-full border-collapse border border-gray-600 text-sm">
                  <thead>
                    <tr>
                      <th className="border px-3 py-2">Planes</th>
                      <th className="border px-3 py-2">Nickname</th>
                      <th className="border px-3 py-2">Field content</th>
                      <th className="border px-3 py-2">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">0–3</td>
                      <td className="border px-3 py-2">Stage</td>
                      <td className="border px-3 py-2">Metric <code>gμν</code>, gauge <code>Aμ</code>, Schrödinger phase</td>
                      <td className="border px-3 py-2">Where events appear (4‑D observables)</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">4–8</td>
                      <td className="border px-3 py-2">Strings / Occupant band</td>
                      <td className="border px-3 py-2"><code>u_p</code> (p=4..8)</td>
                      <td className="border px-3 py-2">Resonant scaffolds that pre‑shape patterns</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">9–11</td>
                      <td className="border px-3 py-2">Masks &amp; Source</td>
                      <td className="border px-3 py-2"><code>d</code> (veil), <code>v</code> (vantage), <code>ζ</code> (coherence), <code>h</code> (entropic wash), <code>ϕ</code> (gauge‑phase)</td>
                      <td className="border px-3 py-2">Clarity/noise routing &amp; supply of pure coherence</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-sm text-gray-400">
                  Energy &amp; information migrate <em>downward</em> (11→10→4–8→0–3); whatever order appears, heat/entropy flows back via <code>h</code>.
                </p>

                <h3 className="text-xl font-semibold">Single action &amp; the projection threshold</h3>
                <p>
                  All dynamics descend from one action. The projection functional carries a universal coupling <code>λ ≈ 1.0×10⁻⁷</code> and
                  a small compatibility weight <code>α ≈ 0.18</code>. Projection becomes efficient when
                  <code> λ · Δmel ≳ (1+α) × 10⁻⁸</code>. A calibrated critical point <code>mel<sub>c</sub> ≈ 0.803</code> separates low/high‑coherence regimes.
                </p>

                <h3 className="text-xl font-semibold">Six dynamical PDE blocks</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Occupant</strong> <code>u_p</code> (p=4..8): coupled wave equations with cross‑talk.</li>
                  <li><strong>Illusions</strong> <code>d</code> (Plane 9): veil/turbulence and sabotage.</li>
                  <li><strong>Vantage</strong> <code>v</code> (Plane 10): the routing/collector bus.</li>
                  <li><strong>Coherence</strong> <code>ζ</code> (Plane 11): pure coherence dynamics.</li>
                  <li><strong>Entropic back‑wash</strong> <code>h</code>: heat/entropy return flow.</li>
                  <li><strong>Gauge‑phase</strong> <code>ϕ</code>: drifts EM phase via <code>(ζ−h)</code>.</li>
                </ul>

                <h3 className="text-xl font-semibold">Five empirical pillars — one reading</h3>
                <table className="table-auto w-full border-collapse border border-gray-600 text-sm">
                  <thead>
                    <tr>
                      <th className="border px-3 py-2">Pillar</th>
                      <th className="border px-3 py-2">Benchmark fact</th>
                      <th className="border px-3 py-2">MPFST mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">Relativity</td>
                      <td className="border px-3 py-2">Light‑deflection 1.75″</td>
                      <td className="border px-3 py-2">Ricci term on the lattice → Einstein curvature after projection</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">Quantum</td>
                      <td className="border px-3 py-2">Two‑slit interference</td>
                      <td className="border px-3 py-2">Plane‑6 phase; visibility drops when <code>λΔmel</code> crosses 10⁻⁸</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">Thermodynamics</td>
                      <td className="border px-3 py-2">Carnot limit</td>
                      <td className="border px-3 py-2">Negative entropy exported by fractional‑memory field <code>h</code></td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">Electromagnetism</td>
                      <td className="border px-3 py-2">Faraday/Hall</td>
                      <td className="border px-3 py-2">Symbolic phase <code>S</code> → <code>Aμ=∂μS</code>, Maxwell emerges</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">Gravity</td>
                      <td className="border px-3 py-2">LIGO waves</td>
                      <td className="border px-3 py-2">Spin‑2 lattice phonon = GR graviton in weak‑field; high‑mel damps over‑tones</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-gray-300">
                  Full derivations and parameter table are in the v3 manuscript (download in the <em>Manuscript</em> tab).
                </p>
              </section>
            </CardContent>
          </Card>
</TabsContent>

        {/* PREDICTIONS */}
        <TabsContent value="predictions">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold">Predictions (v3)</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold">Fine‑structure constant beat</h3>
                  <p>Plane‑6 phase locking modulates <code>Aμ</code> and the vacuum impedance, yielding an <strong>α</strong> oscillation.</p>
                  <ul className="list-disc ml-6 text-sm">
                    <li>Amplitude: <code>Δα/α ≈ 1.0×10⁻⁸</code></li>
                    <li>Period: <code>π × 100 days</code> (sinusoidal)</li>
                    <li>Test: dual optical clocks (10⁻¹⁸) for 18–24 months</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold">Thermo‑sintergic EMF</h3>
                  <p>In a fractal–dodecahedral cavity, a coherence gradient sources a tiny DC voltage without heat flow.</p>
                  <ul className="list-disc ml-6 text-sm">
                    <li>Signal: <code>~1 nV</code> across 10 cm</li>
                    <li>Conditions: <code>∇mel ≃ 10⁻³</code>, cryogenic shielding</li>
                    <li>Test: low‑noise nV amplifier, flip‑mod lock‑in</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold">Ring‑down over‑tone suppression</h3>
                  <p>High‑coherence regions damp n≥2 over‑tones and enhance the carrier mode in GW ring‑downs.</p>
                  <ul className="list-disc ml-6 text-sm">
                    <li>Expectation: <code>~5%</code> amplitude change in favorable conditions</li>
                    <li>Test: correlate catalogs with HRV/geomagnetic coherence indices</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold">Global Crimson Synergy Arc</h3>
                  <p>Solar‑wind triggers a low‑latitude crimson SAR arc when ionospheric <code>Δmel</code> crosses threshold.</p>
                  <ul className="list-disc ml-6 text-sm">
                    <li>Window: strong southward IMF or P<sub>SW</sub> &gt; 6 nPa</li>
                    <li>Test: DSLR all‑sky + magnetometers, correlate with indices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
</TabsContent>

        {/* VALIDATIONS */}
        <TabsContent value="validations">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Evidence Set &amp; Datasets</h2>
              <p className="text-gray-300">Public datasets spanning geophysics, neuroscience, RNG, and gravitational waves mapped onto one parameter set.</p>
              <table className="table-auto w-full border-collapse border border-gray-600 text-sm">
                <thead>
                  <tr>
                    <th className="border px-3 py-2">#</th>
                    <th className="border px-3 py-2">Dataset / Source</th>
                    <th className="border px-3 py-2">Domain</th>
                    <th className="border px-3 py-2">MPFST link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-2">1</td><td className="border px-3 py-2">NOAA/USGS Kp, Dst</td><td className="border px-3 py-2">Geophysics</td><td className="border px-3 py-2">EEG phase‑lag inversion</td></tr>
                  <tr><td className="border px-3 py-2">2</td><td className="border px-3 py-2">OpenNeuro EEG (meditation)</td><td className="border px-3 py-2">Neuroscience</td><td className="border px-3 py-2">Synergy mask calibration</td></tr>
                  <tr><td className="border px-3 py-2">3</td><td className="border px-3 py-2">PhysioNet HRV / Sleep‑EDF</td><td className="border px-3 py-2">Bio‑EM</td><td className="border px-3 py-2">MeltdownFrac cycle</td></tr>
                  <tr><td className="border px-3 py-2">4</td><td className="border px-3 py-2">Global Consciousness Project</td><td className="border px-3 py-2">RNG / HRV</td><td className="border px-3 py-2">Global coherence metric</td></tr>
                  <tr><td className="border px-3 py-2">5</td><td className="border px-3 py-2">LIGO ring‑down catalogs</td><td className="border px-3 py-2">Grav. waves</td><td className="border px-3 py-2">Post‑merger echoes</td></tr>
                  <tr><td className="border px-3 py-2">6</td><td className="border px-3 py-2">Simons Obs. + Planck</td><td className="border px-3 py-2">Cosmology</td><td className="border px-3 py-2">Vantage‑vector alignment</td></tr>
                  <tr><td className="border px-3 py-2">7</td><td className="border px-3 py-2">Historical mass events + GCP</td><td className="border px-3 py-2">Socio‑physics</td><td className="border px-3 py-2">Crimson‑Arc correlation</td></tr>
                  <tr><td className="border px-3 py-2">8</td><td className="border px-3 py-2">Muon g‑2 (FNAL)</td><td className="border px-3 py-2">Quantum EM</td><td className="border px-3 py-2">Plane‑9 damping drift</td></tr>
                  <tr><td className="border px-3 py-2">9</td><td className="border px-3 py-2">Schumann resonance monitors</td><td className="border px-3 py-2">Global EM</td><td className="border px-3 py-2">Occupant–planet resonance</td></tr>
                  <tr><td className="border px-3 py-2">10</td><td className="border px-3 py-2">JET tokamak edge flicker</td><td className="border px-3 py-2">Plasma</td><td className="border px-3 py-2">Synergy sabotage timescales</td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
</TabsContent>

        {/* MANUSCRIPT */}
        <TabsContent value="manuscript">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold">Manuscripts &amp; Downloads</h2>
              <p className="text-gray-300">
                We host both the legacy manuscript and the current v3 paper. The v3 consolidates the single‑action derivation,
                the six‑PDE lattice, and a calibrated projection threshold, with a full simulator in Appendix A.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold">MPFST — v3 (Aug 2025)</h3>
                  <p className="text-sm text-gray-300">“From an 11‑D Lattice Action to 4‑D Einstein–Maxwell–Schrödinger.”</p>
                  <a className="inline-flex mt-3 items-center px-4 py-2 border border-emerald-500 rounded hover:bg-emerald-600/10"
                     href="/MPFST_v3.pdf" target="_blank" rel="noopener">
                    <Download className="w-4 h-4 mr-2" /> Download v3 (PDF)
                  </a>
                </div>
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold">MPFST — legacy (v1/v2)</h3>
                  <p className="text-sm text-gray-300">Original public manuscript kept for archival reference.</p>
                  <a className="inline-flex mt-3 items-center px-4 py-2 border border-gray-500 rounded hover:bg-gray-600/10"
                     href="/MPFST_PUBLICATION_MANUSCRIPT-10.pdf" target="_blank" rel="noopener">
                    <Download className="w-4 h-4 mr-2" /> Download legacy (PDF)
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-semibold">Abstract (v3)</h3>
              <p className="text-sm text-gray-300">
                MPFST presents a single algebraic framework: starting from one 11‑D action we derive an effective 4‑D Einstein–Maxwell–Schrödinger sector,
                a fractional‑memory entropy balance, a Russell–lattice embedding, and a universal projection threshold <code>λ Δmel ≳ (1+α)×10⁻⁸</code>.
                All parameters are fixed by public data; predictions include an α beat, a nV thermo‑sintergic current, ring‑down over‑tone suppression,
                and a low‑latitude crimson arc under strong solar‑wind forcing.
              </p>
            </CardContent>
          </Card>
</TabsContent>

        {/* SYNERGY FIELD MONITOR */}
        <TabsContent value="sfm">
          <Card className="bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                Synergy Field Monitor
              </h2>
              <div className="flex justify-center">
                <SynergyFieldMonitor />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INITIATORY ACCESS */}
        <TabsContent value="initiation">
          <Card className="bg-gray-900">
            <CardContent className="p-6 text-center space-y-6">
              <h2 className="text-2xl font-semibold flex justify-center items-center gap-2">
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
    </div>
  );
}

