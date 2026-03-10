import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Activity, FileText, CheckCircle2,
  ExternalLink, Network, Zap, Menu, X, Brain, FlaskConical, Star, Users
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const Badge = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${color}`}>
    {children}
  </span>
);

function NumberCard({ number, label, sub }: { number: string; label: string; sub?: string }) {
  return (
    <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-5 text-center">
      <div className="text-3xl font-bold text-amber-400 mb-1">{number}</div>
      <div className="text-sm font-medium text-zinc-200">{label}</div>
      {sub && <div className="text-xs text-zinc-500 mt-1">{sub}</div>}
    </div>
  );
}

export default function CollaboratePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <Head>
        <title>Collaborate — MPFST Research</title>
        <meta name="description" content="Join the MPFST research effort. Eighteen domains validated with one parameter. Open collaboration opportunities for experimentalists, mathematicians, and physicists." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-zinc-300">

        {/* NAV */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-zinc-800/60">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors">MPFST</a>
            <div className="hidden md:flex items-center gap-4 text-xs">
              <a href="/" className="text-zinc-400 hover:text-white transition-colors">Theory</a>
              <a href="/experimentalists" className="text-zinc-400 hover:text-white transition-colors">Experimentalists</a>
              <a href="/collaborate" className="text-amber-400 font-semibold border-b border-amber-400 pb-0.5">Collaborate</a>
            </div>
            <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-zinc-800/60 px-6 py-4 flex flex-col gap-3 text-sm">
              <a href="/" className="text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenu(false)}>Theory</a>
              <a href="/experimentalists" className="text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenu(false)}>Experimentalists</a>
              <a href="/collaborate" className="text-amber-400 font-semibold" onClick={() => setMobileMenu(false)}>Collaborate</a>
            </div>
          )}
        </nav>

        {/* HERO */}
        <motion.section className="pt-32 pb-16 px-6" initial="hidden" animate="visible" variants={stagger}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="mb-6">
              <Badge color="border-amber-500/30 text-amber-400">Open Collaboration</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Eighteen Domains. One Parameter.<br />We Need Collaborators.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              A coupled PDE framework with a single fractional exponent (&alpha;&nbsp;=&nbsp;6/5) has produced
              statistically significant results across eighteen domains — neuroscience, particle physics, astrophysics,
              condensed matter, quantum computing, and general relativity. &alpha;&nbsp;=&nbsp;6/5 is now proven to be an
              exact eigenvalue of the Sephirotic graph Laplacian (Paper&nbsp;9), and the full PDE system has been
              proven well-posed (Paper&nbsp;10). The data is public. The code is open.
            </motion.p>
          </div>
        </motion.section>

        {/* NUMBERS */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <NumberCard number="18" label="Domains Tested" sub="Brains to qubits" />
              <NumberCard number="1" label="Free Parameter" sub="\u03B1 = 6/5 (exact eigenvalue)" />
              <NumberCard number="18" label="Papers Published" sub="+ PRL Letter submitted" />
              <NumberCard number="6.7\u03C3" label="Strongest Signal" sub="LHC dijet correction" />
            </div>
          </div>
        </section>

        {/* THE STATE OF PLAY */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400"><Activity className="w-5 h-5" /></div>
              What Exists Today
            </h2>

            <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-6 space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                MPFST is an 11-plane coupled PDE framework where each plane represents a scale of physical
                or informational dynamics. The planes are coupled through a sparse adjacency matrix derived
                from an ancient network topology (the Kabbalistic Tree of Life), and the PDE operators include
                fractional Laplacians (order &alpha;&nbsp;&asymp;&nbsp;1.2) to capture long-range spatial correlations.
              </p>
              <p>
                What started as a single EEG prediction has expanded to eighteen independent domains, all using
                the same &alpha;&nbsp;=&nbsp;1.2 measured from human brains. The framework was developed by
                Carlos Freeman, an independent researcher. The mathematical foundations are being formalized
                alongside the empirical program — not the other way around.
              </p>
              <p>
                <strong className="text-zinc-200">This is not a finished theory.</strong> It is a framework with
                an unusually strong empirical track record that needs independent verification, mathematical
                formalization, and experimental testing. All results are published with full code and data.
              </p>
            </div>
          </div>
        </section>

        {/* COLLABORATION OPPORTUNITIES */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400"><Users className="w-5 h-5" /></div>
              Collaboration Opportunities
            </h2>

            <div className="space-y-4">

              {/* Experimentalists */}
              <div className="bg-[#181b22] border border-green-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400 flex-shrink-0">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      EEG Experimentalists — Transferred Potential Replication
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      The highest-priority experiment: test the 7 pre-registered predictions for non-local
                      brain correlations. Requires dual 64-channel EEG systems, Faraday cages, and GPS-disciplined
                      synchronization. The original effect (Grinberg 1994) has been replicated 3 times with
                      p&nbsp;&lt;&nbsp;0.001. Our model adds 7 quantitative predictions that have never been tested.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-green-500/20 text-green-400">
                        <CheckCircle2 className="w-3 h-3" /> Pre-registration published
                      </Badge>
                      <Badge color="border-blue-500/20 text-blue-400">
                        Full experiment plan available
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mathematicians */}
              <div className="bg-[#181b22] border border-amber-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
                    <Network className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Mathematicians — Dimensional Reduction &amp; Extensions
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      PDE well-posedness is <strong className="text-green-400">proven</strong> (Paper&nbsp;10): existence via Banach fixed-point
                      in Sobolev H<sup>s</sup>, uniqueness via Gronwall stability, global existence via energy monotonicity.
                      Remaining open problems: the 11D &rarr; 4D dimensional reduction (Stückelberg-inspired mechanism),
                      stochastic PDE extensions, and infinite-dimensional limits.
                    </p>
                    <div className="bg-black/40 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-amber-300 mb-3 overflow-x-auto">
                      &part;&psi;<sub>k</sub>/&part;t = (&minus;&Delta;)<sup>&alpha;/2</sup> &psi;<sub>k</sub> + &Sigma;<sub>j&isin;N(k)</sub> g<sub>kj</sub> F(&psi;<sub>j</sub>), &ensp; &alpha; = 6/5
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The mathematical foundation is established. What remains is extending the framework:
                      rigorous 11&rarr;4 reduction, stochastic forcing, and connections to fractional Sobolev embedding theory.
                    </p>
                  </div>
                </div>
              </div>

              {/* Particle physicists */}
              <div className="bg-[#181b22] border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Particle Physicists — Independent LHC &amp; Neutrino Analysis
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      Two results need independent verification by domain experts. The LHC dijet analysis
                      uses CMS open data and shows a 6.7&sigma; deviation from NLO QCD. The MiniBooNE analysis
                      shows a 2.0&sigma; improvement using official HEPData. Both use &alpha;&nbsp;=&nbsp;1.2 from
                      EEG without refitting. These results need to be checked by people who work with this
                      data professionally.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-purple-500/20 text-purple-400">CMS JetHT Run2016G</Badge>
                      <Badge color="border-purple-500/20 text-purple-400">MiniBooNE HEPData</Badge>
                      <Badge color="border-purple-500/20 text-purple-400">All analysis code public</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Astrophysicists */}
              <div className="bg-[#181b22] border border-cyan-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Astrophysicists — Gravity Across Three Scales
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      The coupled PDE framework now covers gravity across 11 orders of magnitude with zero free
                      parameters. Galactic rotation curves: outperforms NFW on 71% of 124 SPARC galaxies. GR recovery:
                      natural transition at ~1&nbsp;kpc. Gravitational wave echoes: power-law post-merger tails detected
                      in 73/109 LIGO/Virgo events (3.7&sigma;). Combined Fisher significance across all three gravity
                      datasets: 5.8&sigma;. These results need verification by people familiar with SPARC systematics,
                      LIGO matched filtering, and modified gravity phenomenology.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-cyan-500/20 text-cyan-400">SPARC database</Badge>
                      <Badge color="border-cyan-500/20 text-cyan-400">LIGO/Virgo GWOSC</Badge>
                      <Badge color="border-cyan-500/20 text-cyan-400">Combined 5.8σ</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Condensed Matter / Quantum Physicists */}
              <div className="bg-[#181b22] border border-rose-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Condensed Matter &amp; Quantum Physicists — JJ Phantom Voltage &amp; Qubit Decoherence
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      Two testable predictions in condensed matter. Josephson junction arrays: the fractional PDE predicts
                      a phantom voltage offset at zero bias current (Paper&nbsp;7), with a mapping from the cosmological
                      &alpha;&nbsp;=&nbsp;1.2 to the JJ scale. Superconducting qubits: observed T<sub>1</sub>&nbsp;&prop;&nbsp;f<sup>&minus;2.07&plusmn;0.61</sup> across
                      15 IBM devices — MPFST predicts &minus;1.50 (inside 95% CI), standard QM predicts &minus;0.50 (excluded).
                      Both need independent lab verification.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-rose-500/20 text-rose-400">IBM Quantum data</Badge>
                      <Badge color="border-rose-500/20 text-rose-400">JJ phantom voltage testable</Badge>
                      <Badge color="border-rose-500/20 text-rose-400">Standard QM excluded at 95% CI</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plasma Physicists */}
              <div className="bg-[#181b22] border border-orange-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 flex-shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Plasma Physicists — Fusion Transport With Zero Free Parameters
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      55 published measurements from 15 tokamak devices across 5 independent observables. Combined
                      &chi;&sup2;&nbsp;=&nbsp;7.75 with 55 degrees of freedom (p&nbsp;&asymp;&nbsp;1.0). Zero free parameters — &alpha;&nbsp;=&nbsp;6/5
                      is a topological invariant. Standard models (Kolmogorov, Kraichnan, Bohm, SOC) are all excluded.
                      Pedestal scaling: MPFST predicts &minus;5/6, observed &minus;0.814&plusmn;0.037 — standard &minus;0.5 excluded at 8.45&sigma;.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-orange-500/20 text-orange-400">15 tokamaks, 55 measurements</Badge>
                      <Badge color="border-orange-500/20 text-orange-400">Standard models excluded</Badge>
                      <Badge color="border-orange-500/20 text-orange-400">χ² = 7.75, p ≈ 1.0</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cosmologists */}
              <div className="bg-[#181b22] border border-indigo-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Cosmologists — Dark Energy Without &Lambda;
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      The fractional Laplacian predicts an equation of state w&nbsp;=&nbsp;&minus;11/15&nbsp;&asymp;&nbsp;&minus;0.733 — no free parameters.
                      Tested against 1,590 Pantheon+ Type&nbsp;Ia supernovae: &Delta;&chi;&sup2;&nbsp;=&nbsp;0.32 vs &Lambda;CDM (statistically indistinguishable).
                      DES&nbsp;Y5 measured w&nbsp;=&nbsp;&minus;0.70&plusmn;0.09 (MPFST 0.37&sigma; away). DESI measured w&#8320;&nbsp;=&nbsp;&minus;0.55&plusmn;0.21 (MPFST 0.87&sigma; away).
                      Black hole entropy correction c<sub>log</sub>&nbsp;=&nbsp;&minus;2/3 converges with Asymptotic Safety.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-indigo-500/20 text-indigo-400">Pantheon+ 1,590 SNe</Badge>
                      <Badge color="border-indigo-500/20 text-indigo-400">w = −11/15 zero parameters</Badge>
                      <Badge color="border-indigo-500/20 text-indigo-400">Converges with Asymptotic Safety</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuprate / High-Tc */}
              <div className="bg-[#181b22] border border-pink-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      High-T<sub>c</sub> Superconductivity — Anomalous Self-Energy
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      Fractional memory function M(&omega;)&nbsp;~&nbsp;&omega;<sup>4/5</sup> predicts optical self-energy exponent &beta;&nbsp;=&nbsp;0.800.
                      16 published measurements from 6 independent studies across 5 cuprate families. MPFST &chi;&sup2;&nbsp;=&nbsp;5.6
                      vs marginal Fermi liquid &chi;&sup2;&nbsp;=&nbsp;51.0 — MPFST is 4.8&times; better. MFL (&beta;&nbsp;=&nbsp;1.0) excluded at 9.8&sigma;.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="border-pink-500/20 text-pink-400">6 studies, 5 cuprate families</Badge>
                      <Badge color="border-pink-500/20 text-pink-400">MFL excluded at 9.8σ</Badge>
                      <Badge color="border-pink-500/20 text-pink-400">ARPES + optical + Raman</Badge>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400"><FileText className="w-5 h-5" /></div>
              What We Bring to a Collaboration
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Full Data Access",
                  desc: "Every dataset, every analysis script, every statistical test — published on Zenodo with DOIs. No paywalls, no gatekeeping.",
                  icon: "📊"
                },
                {
                  title: "Pre-Registered Predictions",
                  desc: "7 quantitative predictions for the transferred potential experiment, published before data collection. No post-hoc fitting.",
                  icon: "📋"
                },
                {
                  title: "Computational Resources",
                  desc: "GPU infrastructure for large-scale simulations. Currently running 1M-step coupled PDE simulations on NVIDIA Blackwell hardware.",
                  icon: "🖥️"
                },
                {
                  title: "Theoretical Framework",
                  desc: "The full 11-plane PDE system with coupling matrices, fractional operators, and dimensional reduction scaffolding. Ready for rigorous formalization.",
                  icon: "📐"
                },
              ].map(({ title, desc, icon }) => (
                <div key={title} className="bg-[#181b22] border border-zinc-800 rounded-xl p-5">
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#181b22] border border-amber-500/20 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
                If you work in any of these areas and want to verify, challenge, or extend any of
                these results — we want to hear from you. Skepticism is welcome. Rigor is the point.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:carlos@mpfst.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors">
                  carlos@mpfst.com
                </a>
                <a href="https://orcid.org/0009-0005-7399-3204" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-700 transition-colors">
                  <ExternalLink className="w-4 h-4" /> ORCID Profile
                </a>
                <a href="https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Freeman%2C%20Carlos%20W.%22" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-700 transition-colors">
                  <ExternalLink className="w-4 h-4" /> All Papers on Zenodo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-800/60 py-8 px-6 text-center">
          <p className="text-xs text-zinc-600">
            MPFST &mdash; Multi-Plane Field Syntergic Theory &mdash; Carlos W. Freeman &mdash;{" "}
            <a href="https://orcid.org/0009-0005-7399-3204" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-amber-400">
              ORCID 0009-0005-7399-3204
            </a>
          </p>
        </footer>

      </div>
    </>
  );
}
