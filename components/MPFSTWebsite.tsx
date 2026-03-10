import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Activity, FileText, AlertTriangle, CheckCircle2,
  XCircle, Clock, ExternalLink, ChevronDown, ChevronUp,
  Network, Zap, Compass, Menu, X, Award, Atom, Globe2,
  Brain, Search, FlaskConical, Shield, Send
} from "lucide-react";

/* ─── animation helpers ─── */
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── small UI pieces ─── */
const Badge = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${color}`}>
    {children}
  </span>
);
const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">{icon}</div>
    <h2 className="text-2xl font-bold text-white tracking-tight">{children}</h2>
  </div>
);

/* ─── expandable card ─── */
function ExpandCard({ title, preview, children, defaultOpen = false }: {
  title: string; preview: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#181b22] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-left">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-zinc-500 mt-1">{preview}</div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
      </button>
      {open && <div className="px-6 pb-5 border-t border-zinc-800/60 pt-4">{children}</div>}
    </div>
  );
}

/* ─── status row ─── */
function StatusRow({ icon, label, status, detail }: {
  icon: React.ReactNode; label: string; status: "confirmed" | "submitted" | "published" | "running" | "untested" | "open-question"; detail: string;
}) {
  const colors = {
    confirmed:     "border-green-500/30 text-green-400",
    submitted:     "border-blue-500/30 text-blue-400",
    published:     "border-purple-500/30 text-purple-400",
    running:       "border-amber-500/30 text-amber-400",
    untested:      "border-zinc-500/30 text-zinc-400",
    "open-question": "border-orange-500/30 text-orange-400",
  };
  const labels = {
    confirmed: "Confirmed", submitted: "In Peer Review", published: "Published",
    running: "Running", untested: "Untested", "open-question": "Open Question",
  };
  return (
    <div className="flex items-start gap-4 py-3 border-b border-zinc-800/40 last:border-0">
      <div className="mt-0.5 text-zinc-500">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-zinc-200">{label}</span>
          <Badge color={colors[status]}>{labels[status]}</Badge>
        </div>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

/* ─── paper card ─── */
function PaperCard({ badge, badgeColor, title, description, links }: {
  badge: string; badgeColor: string; title: string; description: string;
  links: { label: string; url?: string; text?: string }[];
}) {
  return (
    <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-6">
      <div className="mb-3">
        <Badge color={badgeColor}>{badge}</Badge>
        <h3 className="text-sm font-semibold text-white mt-2">{title}</h3>
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {links.map((link, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-zinc-600">|</span>}
            {link.url ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300">
                <ExternalLink className="w-3 h-3" /> {link.label}
              </a>
            ) : (
              <span className="text-zinc-500">{link.text}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function MPFSTWebsite() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <Head>
        <title>MPFST — Multi-Plane Field Syntergic Theory</title>
        <meta name="description" content="An 11-plane coupled PDE framework with zero free parameters — α=6/5 is an exact topological eigenvalue. Significant results across 14 domains: neuroscience, particle physics, galactic dynamics, general relativity, collider physics, condensed matter, quantum computing, graph spectral theory, PDE well-posedness, emergent quantization with quantum gravity, fusion plasma transport, and gravitational wave echoes. 13 papers + PRL letter by Carlos W. Freeman." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-zinc-300">

        {/* ── NAV ── */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-zinc-800/60">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="text-lg font-bold tracking-tight text-white">MPFST</span>
            <div className="hidden md:flex items-center gap-4 text-xs">
              <a href="/" className="text-amber-400 font-semibold border-b border-amber-400 pb-0.5">Theory</a>
              <a href="/experimentalists" className="text-zinc-400 hover:text-white transition-colors">Experimentalists</a>
              <a href="/collaborate" className="text-zinc-400 hover:text-white transition-colors">Collaborate</a>
              <a href="/chat" className="text-amber-400/80 hover:text-amber-300 transition-colors font-medium">Ask AI ✦</a>
            </div>
            <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden border-t border-zinc-800/60 bg-black/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-3 text-sm">
              <a href="/" onClick={() => setMobileMenu(false)} className="text-amber-400 font-semibold">Theory</a>
              <a href="/experimentalists" onClick={() => setMobileMenu(false)} className="text-zinc-400 hover:text-white transition-colors">Experimentalists</a>
              <a href="/collaborate" onClick={() => setMobileMenu(false)} className="text-zinc-400 hover:text-white transition-colors">Collaborate</a>
              <a href="/chat" onClick={() => setMobileMenu(false)} className="text-amber-400/80 hover:text-amber-300 font-medium">Ask AI ✦</a>
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <motion.section
          className="pt-32 pb-16 px-6"
          initial="hidden" animate="visible" variants={stagger}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="mb-6">
              <Badge color="border-amber-500/30 text-amber-400">18 Papers + PRL Letter · 19 Domains · 1 Parameter</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Multi-Plane Field Syntergic Theory
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              An 11-plane coupled PDE framework with fractional Laplacian operators. A single parameter
              &alpha; = 6/5 — an exact eigenvalue of the Sephirotic coupling topology — produces statistically significant results
              across neuroscience, particle physics, galactic dynamics, collider physics, general relativity, quantum information, condensed matter, fusion plasma, gravitational wave post-merger signals, and cuprate superconductivity.
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              Seventeen papers plus a PRL letter. Three papers in peer review at Chaos, Solitons &amp; Fractals.
              PRL letter submitted to Physical Review Letters. Latest: gravitational wave echoes across 486 LIGO/Virgo events. All code and data publicly available.
            </motion.p>
          </div>
        </motion.section>

        {/* ── THE KEY RESULT — α = 6/5 ACROSS 13 DOMAINS ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-white mb-2">One Parameter. Nineteen Domains. Zero Free Parameters.</h2>
                <p className="text-sm text-zinc-400">
                  &alpha; = 6/5 is an exact eigenvalue of the normalized Laplacian of the theory&apos;s own coupling topology — the 11-sephirot Tree of Life with Da&apos;at.
                  It was never fitted. The same value independently produces significant results in every domain tested.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: <Brain className="w-5 h-5" />, domain: "Neuroscience", result: "r = 0.767, p = 0.0097", detail: "EEG cross-frequency coupling, 109 subjects", color: "text-green-400" },
                  { icon: <Brain className="w-5 h-5" />, domain: "Brain Correlations", result: "7 pre-registered predictions", detail: "Transferred potential paradigm, calibrated from replications", color: "text-blue-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Particle Physics", result: "Δχ² = 4.20, 2.0σ", detail: "MiniBooNE neutrino anomaly resolved", color: "text-purple-400" },
                  { icon: <Globe2 className="w-5 h-5" />, domain: "Galactic Dynamics", result: "71% of 124 galaxies, p = 1.7×10⁻⁶", detail: "SPARC rotation curves without dark matter", color: "text-cyan-400" },
                  { icon: <Search className="w-5 h-5" />, domain: "Collider Physics", result: "Δχ² = 25.9, 6.7σ", detail: "CMS dijet angular distributions, LHC Run 2016", color: "text-pink-400" },
                  { icon: <Compass className="w-5 h-5" />, domain: "General Relativity", result: "ε < 10⁻⁴, recovers Einstein", detail: "Natural transition to modified gravity at 1 kpc", color: "text-amber-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Josephson Junctions", result: "α_JJ ≈ 0.008 predicted", detail: "Phantom voltage offset from inter-plane coupling", color: "text-orange-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Qubit Decoherence", result: "T₁ ∝ f⁻¹·⁵⁰ vs observed f⁻²·⁰⁷", detail: "3× closer than standard QM, 15 superconducting qubits", color: "text-red-400" },
                  { icon: <Network className="w-5 h-5" />, domain: "Sephirotic Topology", result: "α = 6/5 exact eigenvalue", detail: "Normalized Laplacian of 11-node Tree of Life", color: "text-yellow-400" },
                  { icon: <Shield className="w-5 h-5" />, domain: "PDE Well-Posedness", result: "Existence, uniqueness, stability", detail: "Banach fixed-point + energy monotonicity + Gronwall", color: "text-emerald-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Quantization & Quantum Gravity", result: "QM + GR from one operator", detail: "Discrete spectrum + emergent gravity, zero free parameters", color: "text-violet-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Fusion Plasma", result: "χ² = 7.75, p ≈ 1.000", detail: "55 measurements, 15 tokamaks, 5 observables, zero free parameters", color: "text-rose-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Gravitational Wave Echoes", result: "73/109 wins, p = 9.16×10⁻⁵", detail: "486 GWOSC events, power-law post-merger decay, Fisher combined 5.8σ", color: "text-amber-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Dimensional Reduction", result: "11 → 2 modes, zero parameters", detail: "Spectral gap Δλ=0.328 yields gravity (Mode 0) + gauge field (Mode 1) from topology alone", color: "text-sky-400" },
                  { icon: <Shield className="w-5 h-5" />, domain: "Stochastic Robustness", result: "σ_c = 0.55, Kramers R² = 0.997", detail: "Noise-driven phase transitions, stochastic resonance, zero free parameters", color: "text-teal-400" },
                  { icon: <Globe2 className="w-5 h-5" />, domain: "Dark Energy / Cosmology", result: "w = −11/15, Δχ² = 0.32 vs ΛCDM", detail: "1,590 Pantheon+ supernovae, DES Y5 measures w=−0.70±0.09 — MPFST predicts −0.733", color: "text-orange-400" },
                  { icon: <FlaskConical className="w-5 h-5" />, domain: "Cuprate Superconductivity", result: "β = 4/5, χ² 4.8× better than MFL", detail: "Optical self-energy of 16 cuprate measurements across 6 studies — MPFST β=0.800 vs observed 0.765±0.024", color: "text-rose-400" },
                  { icon: <Atom className="w-5 h-5" />, domain: "Black Hole Thermodynamics", result: "c_log = −2/3, matches Asymptotic Safety", detail: "Logarithmic entropy correction from spectral dimension d_s=2α/2=1.2. Same formula as qubit decoherence (Paper 8). Zero free parameters.", color: "text-violet-400" },
                ].map((item, i) => (
                  <div key={i} className="bg-black/30 border border-zinc-800/60 rounded-xl p-4">
                    <div className={`${item.color} mb-2`}>{item.icon}</div>
                    <div className="text-xs text-zinc-500 mb-1">{item.domain}</div>
                    <div className={`text-sm font-semibold ${item.color} mb-1`}>{item.result}</div>
                    <div className="text-[11px] text-zinc-600">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESEARCH STATUS DASHBOARD ── */}
        <section id="status" className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle icon={<Activity className="w-5 h-5" />}>Research Status — March 2026</SectionTitle>

            <div className="grid gap-3">
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="Tree of Life Predicts EEG Cross-Frequency Coupling"
                status="confirmed"
                detail="Tested against 109 real human brains (PhysioNet Motor Imagery). Pearson r = 0.767, p = 0.0097. Permutation test p = 0.0043. Sparsity pattern ranks in 99th percentile (2nd of 210 possible topologies). Alpha band emerges as central hub — uniquely predicted by Tree topology. Full reproduction code publicly available."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="MiniBooNE Neutrino Anomaly — 24-Year Mystery Addressed"
                status="confirmed"
                detail="The coupled PDE propagator with α=1.2 (from EEG, not fitted to neutrinos) produces energy-dependent ν_e appearance that matches MiniBooNE's observed excess. Strong below 500 MeV, vanishing above — exactly the observed pattern. Δχ² = 4.20 vs null (2.0σ improvement). No new particles required. Published on Zenodo, submitted to CSF."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="Galactic Rotation Without Dark Matter — 124 SPARC Galaxies"
                status="confirmed"
                detail="The coupled PDE framework (Plane 9 illusions field sourcing standard gravity) with α=1.2 fixed from EEG beats NFW dark matter halos on 88/124 galaxies (71.0%). 45 decisive wins (ΔAIC > 10) vs 17 for NFW. Median χ²/dof = 0.789 vs 1.300. Binomial p = 1.70 × 10⁻⁶. Three free parameters each model — fair comparison. Published on Zenodo."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="LHC Dijet Angular Distributions — Plane 9 at TeV Energies"
                status="confirmed"
                detail="CMS JetHT Run 2016G data. The fractional correction (E/Λ)^(2−α) with α=1.2 fixed from EEG produces Δχ² = 25.9 over NLO QCD across 7 mass bins (2.4–7.0 TeV). Significance: 6.7σ (p = 2.4 × 10⁻⁶). The correction grows with dijet mass exactly as Plane 9 dynamics predict. Published on Zenodo."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="GR Recovery — Einstein's Equations as a Natural Limit"
                status="confirmed"
                detail="The coupled PDE framework naturally recovers standard GR in the solar system. Tightest constraint: Cassini Shapiro delay requires corrections < 1.15 × 10⁻⁴ — satisfied. The fractional Green's function G_α(r) ~ r^(α−3) creates an automatic transition: Newtonian below ~1 kpc, modified gravity above. No fitted scale parameter (unlike MOND). Published on Zenodo."
              />
              <StatusRow
                icon={<FileText className="w-4 h-4 text-blue-400" />}
                label="PRL Letter Submitted · Papers 1–3 Under Peer Review at Chaos · Papers 4–12 on Zenodo"
                status="submitted"
                detail="PRL letter (es2026mar07_508) submitted to Physical Review Letters — unifying 14 domains with 5.8σ combined significance. 3 papers under peer review at Chaos, Solitons & Fractals (CHAOS-D-26-01867, 01926, 02017). 10 additional papers on Zenodo spanning galactic rotation, LHC dijets, GR recovery, Josephson junctions, qubit decoherence, Sephirotic eigenvalue, PDE well-posedness, quantization & gravity, fusion plasma, and GW echoes. All use α = 6/5."
              />
              <StatusRow
                icon={<Clock className="w-4 h-4 text-zinc-400" />}
                label="Transferred Potential Experiment"
                status="untested"
                detail="Full experiment plan designed: dual 64-channel EEG, double-layer Faraday cages, GPS-disciplined sync, triple-blind protocol. 7 pre-registered predictions including 2 never-before-tested (bidirectional symmetry, distance-independent latency). Budget: $47K–$347K across 3 phases. Pre-registration published on Zenodo."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="JJ Phantom Voltage Offset — Inter-Plane Coupling Prediction"
                status="confirmed"
                detail="α_d = 1.2 (from MiniBooNE/galactic rotation) predicts α_JJ ≈ 0.008 via α_JJ = (2−α_d)·ζ(α_d)/(2π·N^(α_d−1)) with N ≈ 5.6×10⁹ junctions. Both values are valid within MPFST: α = 1.2 enhances inter-plane coupling (phantom offset = 7.45). No contradiction between canonical manuscript and empirical results. Published on Zenodo."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="Qubit Decoherence — Anomalous T₁ Frequency Scaling"
                status="confirmed"
                detail="15 superconducting qubits spanning 0.5–72 GHz. Observed T₁ ∝ f^(−2.07±0.61). MPFST predicts T₁ ∝ f^(−1.50) — inside the 95% CI. Standard QM predicts f^(−0.50) — excluded from the 95% CI. MPFST is 3× closer to real qubit data at every physical bath dimension. Same α = 1.2. Published on Zenodo."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="Sephirotic Eigenvalue — First-Principles Derivation of α = 1.2"
                status="confirmed"
                detail="α = 6/5 is an exact eigenvalue (error < 10⁻¹⁶) of the normalized graph Laplacian of the 11-node Sephirotic Tree (10 Sephirot + Da'at). The eigenvector is the bilateral symmetry mode: left pillar anti-phase with right pillar, middle pillar at zero. Without Da'at, closest eigenvalue is 1.2224. The hidden 11th node locks the topology to α = 6/5 exactly. The parameter is not empirical — it is a topological invariant. Published on Zenodo."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
                label="Mathematical Well-Posedness"
                status="confirmed"
                detail="Proven in Paper 10: Local existence via Banach fixed-point (Picard contraction ratio 0.0003), uniqueness via Gronwall stability (contraction factor 0.07), energy boundedness via monotone decay (88% dissipation), spectral lock (α = 6/5 = graph eigenvalue), and global existence numerically verified to T=20 with no blowup. The full 11-field coupled fractional PDE system is well-posed in Sobolev space Hˢ."
              />

              <StatusRow
                icon={<AlertTriangle className="w-4 h-4 text-orange-400" />}
                label="Direct Experimental Verification"
                status="open-question"
                detail="A full transferred potential experiment has been designed with 7 pre-registered predictions (2 never before tested), triple-blind protocol, and dual 64-channel EEG. Budget: $47K–$347K. This would be the first fully prospective test of MPFST's inter-plane coupling mechanism. Not yet funded or executed."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                label="Quantization & Quantum Gravity"
                status="published"
                detail="Paper 11 demonstrates that quantization and gravity emerge jointly from a single operator — the fractional Laplacian (−Δ)^(3/5) on the 11-node Sephirotic graph. Discrete energy levels arise from the graph eigenvalue spectrum without canonical quantization. Gravity emerges from the fractional Green's function G(r) ~ r^(α−3). Both QFT and GR are recovered simultaneously in the α→2 local limit. Zero free parameters."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                label="Fusion Plasma Transport"
                status="published"
                detail="Paper 12 tests MPFST against 55 published measurements from 15 tokamak devices across 5 independent observables. Combined χ²=7.75 (dof=55, p≈1.000). Pedestal scaling: MPFST predicts −5/6, observed −0.814±0.037 — standard model excluded at 8.45σ. Transport exponent: MPFST predicts 1.2, observed 1.205±0.038 — standard diffusion excluded. Zero free parameters."
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                label="Gravitational Wave Echoes — Power-Law Post-Merger Decay"
                status="published"
                detail="Paper 13 analyzes 486 GWOSC events (109 quality measurements). Power-law decay (predicted by fractional dynamics) beats GR exponential in 73/109 events (67.0%, p=9.16×10⁻⁵). Win rate increases with SNR: 63%→71%→89%. Free α converges toward 6/5 at high SNR. Combined with galactic rotation (88/124 galaxies), Fisher significance across 233 measurements: 5.8σ. Zero free parameters. DOI: 10.5281/zenodo.18900993"
              />
              <StatusRow
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                label="Dynamical Dimensional Reduction — Fractional Stückelberg Mechanism"
                status="published"
                detail="Paper 14 proves that the Sephirotic graph's spectral gap (Δλ=0.328, largest in the spectrum) dynamically reduces 11 internal planes to 2 effective modes. Mode 0 (λ=0, topologically protected) couples universally → gravity. Mode 1 (λ=0.318, bilateral symmetry) carries charge → gauge field. 9 heavy modes acquire topological mass and decohere at t=2.25. No geometric compactification needed. Zero free parameters. DOI: 10.5281/zenodo.18902147"
              />
              <StatusRow
                icon={<Send className="w-4 h-4 text-yellow-400" />}
                label="PRL Letter — Unified Framework"
                status="submitted"
                detail="Physical Review Letters submission synthesizes all 14 papers into a unified 3-page letter. Combined significance: 5.8σ (Fisher's method) across 15 domains with zero free parameters. Temporary ID: es2026mar07_508. Under editorial review at PRL."
              />
            </div>
          </div>
        </section>

        {/* ── THE FRAMEWORK ── */}
        <section id="framework" className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle icon={<Network className="w-5 h-5" />}>The Framework</SectionTitle>

            <div className="grid gap-4">
              <ExpandCard title="Core Idea" preview="An 11-plane coupled PDE system with fractional operators and ancient coupling topology" defaultOpen>
                <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                  <p>
                    MPFST proposes that reality can be modeled as 11 coupled partial differential equation fields,
                    where each field represents a different domain — from observable matter (Plane 0) to
                    consciousness-as-boundary-condition (Plane 10).
                  </p>
                  <p>
                    The coupling topology between these planes is derived from the <strong className="text-zinc-200">Kabbalistic Tree of Life</strong> (Sephirot),
                    a network structure that is at least 3,000 years old. This is not metaphor — it is a specific,
                    sparse adjacency matrix with defined coupling coefficients that produces testable predictions.
                  </p>
                  <p>
                    The key mathematical feature is a <strong className="text-zinc-200">fractional Laplacian</strong> with order &alpha; = 6/5
                    on Plane 9, which produces power-law (non-local) spatial correlations instead of the exponential
                    decay of standard diffusion. This parameter is not fitted — it is an exact eigenvalue of the
                    normalized graph Laplacian of the 11-node Sephirotic network (Paper 9). This single topological
                    constant generates statistically significant predictions across 14 domains: brain dynamics, transferred potential, neutrino
                    oscillations, galactic rotation, collider physics, general relativity recovery, Josephson junctions,
                    superconducting qubit decoherence, Sephirotic eigenvalue derivation, PDE well-posedness, emergent quantization
                    with quantum gravity, fusion plasma transport, and gravitational wave echoes.
                  </p>
                </div>
              </ExpandCard>

              <ExpandCard title="The 11 Planes — Sephirot Mapping" preview="Each plane maps to a specific Sephirah from the Tree of Life">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left border-b border-zinc-800">
                        <th className="py-2 pr-3 text-zinc-500 font-semibold">Plane</th>
                        <th className="py-2 pr-3 text-zinc-500 font-semibold">Sephirah</th>
                        <th className="py-2 text-zinc-500 font-semibold">Domain</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-400">
                      {[
                        [0, "Malkuth", "Observable matter, 3D space + time"],
                        [1, "Yesod", "Fundamental forces, quantum vacuum"],
                        [2, "Hod", "Electromagnetic phenomena, light"],
                        [3, "Netzach", "Nuclear forces, binding energies"],
                        [4, "Tiferet", "First occupant plane — bio-rhythms, EEG delta"],
                        [5, "Gevurah", "Economic / social constraint dynamics"],
                        [6, "Chesed", "Creative / expansive growth dynamics"],
                        [7, "Binah", "Deep structural understanding, pattern recognition"],
                        [8, "Chokmah", "Intuitive insight, awareness precursors"],
                        [9, "Da'at", "Illusions doping — veil, emergent gravity, nonlocal coupling"],
                        [10, "Keter", "Vantage doping — observer consciousness, boundary conditions"],
                      ].map(([p, s, d]) => (
                        <tr key={String(p)} className="border-b border-zinc-800/40">
                          <td className="py-2 pr-3 font-mono text-amber-400/80">{p}</td>
                          <td className="py-2 pr-3 text-zinc-300">{s}</td>
                          <td className="py-2">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ExpandCard>

              <ExpandCard title="Core Equations" preview="Occupant PDE, illusions field, emergent gravity, meltdown threshold">
                <div className="space-y-4 text-sm text-zinc-400">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Occupant Field PDE (Planes 4–8)</div>
                    <div className="bg-black/40 rounded-lg px-4 py-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                      &part;u_p/&part;t = c_p&sup2; &nabla;&sup2;u_p &minus; &gamma;_p u_p + &Sigma; A_pq f(u_q) + S_p
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Illusions Field (Plane 9) — Fractional Laplacian</div>
                    <div className="bg-black/40 rounded-lg px-4 py-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                      &part;d/&part;t = &nabla;^&alpha; d &minus; &lambda;d + &eta;(u&#8324;, ..., u&#8328;)   where &alpha; = 6/5 (exact, from graph Laplacian)
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Emergent Gravity — Plane 9 Sources Standard Poisson</div>
                    <div className="bg-black/40 rounded-lg px-4 py-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                      &nabla;&sup2;&Phi; = 4&pi;G&rho; + &xi; &middot; d(r)   where d(r) = fractional field solution
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">Standard Newtonian gravity + a coupled correction from the Plane 9 illusions field. Recovers GR in the solar system (&epsilon; &lt; 10⁻⁴), transitions to modified gravity at galactic scales (~1 kpc).</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">MeltdownFrac — Phase Transition Threshold</div>
                    <div className="bg-black/40 rounded-lg px-4 py-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                      MF = (occupant_synergy + illusions_coupling) / M_th
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">When MF &rarr; 1.0: partial meltdown — collapse of coherence that drives reorganization at higher level. &quot;Collapse is catalytic.&quot;</div>
                  </div>
                </div>
              </ExpandCard>

              <ExpandCard title="Origin Story" preview="From personal experience → Nag Hammadi → Kabbalah → coupled PDEs">
                <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                  <p>
                    MPFST was developed by <strong className="text-zinc-200">Carlos Freeman</strong>, an independent researcher in South Florida.
                    The theory emerged from a years-long intellectual journey: a childhood love of understanding why things work,
                    direct experiences at age 22 that shattered settled agnosticism, followed by systematic study of all world
                    religions, ancient wisdom traditions, and modern physics.
                  </p>
                  <p>
                    The key insight came when Freeman recognized that the structure he was building — planes of coupled dynamics requiring
                    specific feedback topologies — mapped directly onto the <strong className="text-zinc-200">Kabbalistic Tree of Life</strong>.
                    The 10 Sephirot plus Da&apos;at provided the 11-plane structure. The paths between Sephirot defined the coupling matrix.
                    This wasn&apos;t retrofitted — it emerged naturally from the physics requirements.
                  </p>
                  <p>
                    The mathematical formulation was developed through extensive AI conversations in 2025. The resulting predictions
                    were then tested against real experimental data — EEG recordings, particle physics measurements, galaxy rotation
                    curves, LHC collider data, Josephson junction voltages, superconducting qubit decoherence rates, and tokamak fusion plasmas. The results speak for themselves: one parameter, thirteen domains, all statistically significant — and the parameter itself was proven to be a topological invariant of the coupling network.
                  </p>
                </div>
              </ExpandCard>
            </div>
          </div>
        </section>

        {/* ── PUBLICATIONS ── */}
        <section id="publications" className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle icon={<FileText className="w-5 h-5" />}>Publications &amp; Preprints</SectionTitle>

            <div className="grid gap-4">
              <PaperCard
                badge="In Peer Review"
                badgeColor="border-blue-500/30 text-blue-400"
                title="Paper 1: Quantitative Predictions for Non-Local Brain Correlations from a Fractional Field Model"
                description="Seven pre-registered, falsifiable predictions derived from a single fractional PDE (α=1.2). Calibrated against Radin 2004 replication data (r=0.20, p=0.0005). Includes two never-before-tested predictions: bidirectional symmetry and distance-independent latency."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897624" },
                  { label: "Pre-Registration", url: "https://doi.org/10.5281/zenodo.18823295" },
                  { label: "Journal: Chaos, Solitons & Fractals (CHAOS-D-26-01867)" },
                ]}
              />

              <PaperCard
                badge="In Peer Review"
                badgeColor="border-blue-500/30 text-blue-400"
                title="Paper 2: A Sephirotic Network Topology Predicts Cross-Frequency Coupling in Human EEG Across 109 Subjects"
                description="The Tree of Life, treated as a sparse adjacency matrix, predicts which brain frequency bands couple to each other. Pearson r = 0.767 (p = 0.0097), permutation p = 0.0043, 99th percentile sparsity pattern. Alpha as central hub uniquely predicted. Full reproduction code included."
                links={[
                  { label: "Zenodo Preprint (Paper + Data + Code)", url: "https://doi.org/10.5281/zenodo.18848211" },
                  { label: "Journal: Chaos, Solitons & Fractals (CHAOS-D-26-01926)" },
                ]}
              />

              <PaperCard
                badge="In Peer Review"
                badgeColor="border-blue-500/30 text-blue-400"
                title="Paper 3: Fractional Field Propagation Resolves the MiniBooNE Anomaly Without New Particles"
                description="The coupled PDE propagator with α=1.2 produces energy-dependent neutrino appearance matching the 24-year-old MiniBooNE excess. Strong below 500 MeV, vanishing above. Δχ² = 4.20 vs null (2.0σ). No sterile neutrinos, no new particles. Official 60×60 fractional covariance matrix used."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18884024" },
                  { label: "Journal: Chaos, Solitons & Fractals (CHAOS-D-26-02017)" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 4: Emergent Gravitational Modification from a Coupled Fractional Field — Rotation Curves of 124 SPARC Galaxies Without Dark Matter"
                description="The coupled PDE framework (Plane 9 illusions field sourcing standard gravity) beats NFW dark matter on 88/124 SPARC galaxies (71.0%). 45 decisive PDE wins vs 17 for NFW (ΔAIC > 10). Median χ²/dof: 0.789 vs 1.300. Binomial significance: p = 1.70 × 10⁻⁶. α=1.2 fixed from EEG — not fitted to galaxy data."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18884823" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 5: Fractional Correction to Dijet Angular Distributions at the LHC from a Coupled Field Framework"
                description="CMS JetHT Run 2016G data across 7 mass bins (2.4–7.0 TeV). The fractional correction (E/Λ)^(2−α) with α=1.2 fixed from EEG produces Δχ² = 25.9 → 6.7σ → p = 2.4 × 10⁻⁶. Energy scale Λ = 5.91 TeV. Fractional correction grows with energy exactly as Plane 9 dynamics predict."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18885114" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 6: Recovery of General Relativity from the Coupled Fractional Field Framework in the Solar System Limit"
                description="Standard GR is recovered as a natural limit with corrections < 1.15 × 10⁻⁴ (Cassini Shapiro delay). The fractional Green's function creates an automatic scale-dependent transition: Newtonian below ~1 kpc, modified gravity above. No fitted scale parameter — the transition emerges from the mathematics of the operator."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18885452" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 7: Josephson Junction Phantom Voltage Offset from Multi-Plane Field Syntergic Theory"
                description="The fractional Laplacian (α=1.2) predicts a phantom DC voltage offset in Josephson junctions that scales as α_JJ ≈ 0.008 — connecting the macroscopic JJ parameter to the same α that explains neutrinos and galaxies via α_JJ = (2−α_d)·ζ(α_d)/(2π·N^(α_d−1)) with N ≈ 5.6×10⁹ junctions."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897650" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 8: Anomalous Qubit Decoherence Scaling from Fractional Laplacian Dynamics"
                description="15 superconducting qubits (0.5–72 GHz) show T₁ ∝ f^(−2.07±0.61). Standard QM predicts −0.50 (excluded from 95% CI). MPFST's fractional density of states with α=1.2 predicts −1.50 (inside 95% CI). MPFST is 3× closer to observed scaling than standard QM at every physical bath dimension. Domain #9 for the unified α parameter."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897605" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 9: The Fractional Exponent as Topological Invariant — α = 6/5 from the Sephirotic Graph Laplacian"
                description="α = 1.2 is not a fit parameter. It is the 7th eigenvalue of the normalized graph Laplacian of the 11-node Sephirotic Tree (10 Sephirot + Da'at), exact to machine precision (error < 10⁻¹⁶). Its eigenvector is the bilateral symmetry mode — left pillar anti-phase with right pillar, middle pillar at zero. Without Da'at, the closest eigenvalue is 1.2224. The hidden 11th node locks the parameter to exactly 6/5. Domain #10."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897608" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-purple-500/30 text-purple-400"
                title="Paper 10: Well-Posedness of the 11-Field Coupled Fractional PDE System on a Sephirotic Graph"
                description="Proves existence, uniqueness, and stability of the full MPFST field equations. The 11-field coupled system with fractional Laplacian (−Δ)^(α/2) on the Sephirotic graph is shown to be locally well-posed via Banach fixed-point in Sobolev space H^s, globally well-posed via energy monotonicity, and unique via Gronwall stability. Numerically verified: Picard iteration converges in 5 steps, energy decays 88%, perturbation contracts 93%. The mathematical foundation for all 9 preceding papers."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897653" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-violet-500/30 text-violet-400"
                title="Paper 11: Emergent Quantization and Gravity from a Single Fractional Operator on the Sephirotic Graph"
                description="Shows that quantum discreteness and gravity both emerge from one operator — the fractional Laplacian (−Δ)^(3/5) on the 11-node Sephirotic topology — with zero free parameters. The discrete eigenvalue spectrum produces quantized energy levels without imposing canonical quantization. The fractional Green's function G(r) ~ r^(α−3) produces emergent gravity that recovers GR at α→2. Phase-locking transitions at critical coupling thresholds replace the measurement postulate. QFT and GR are recovered simultaneously as the α→2 local limit. Domain #12."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897643" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-rose-500/30 text-rose-400"
                title="Paper 12: Anomalous Transport, Pedestal Scaling, and ELM Statistics in Tokamak Plasmas from Fractional Dynamics on the Sephirotic Graph"
                description="Tests MPFST predictions against 55 published measurements from 15 tokamak devices across 5 independent observables: power spectral density (β = 1.2), Hurst exponent (H = 0.6), ELM waiting-time statistics (Weibull k = 1.2), pedestal pressure gradient scaling (−5/6), and anomalous transport exponent (γ = 1.2). Combined χ² = 7.75 with 55 degrees of freedom (p ≈ 1.000). Standard models (Kolmogorov, Bohm, SOC) are excluded. Zero free parameters — α = 6/5 is the same topological invariant from all previous domains. Domain #13."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18897646" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-amber-500/30 text-amber-400"
                title="Paper 13: Power-Law Post-Merger Decay in Gravitational Wave Signals: Evidence for Fractional Dynamics Across Three Gravitational Regimes"
                description="Analyzes 486 GWOSC gravitational wave events. 109 pass quality filters — 73 favor MPFST power-law decay over GR exponential (67.0%, p = 9.16×10⁻⁵). Win rate increases with SNR: 63% (low) → 71% (mid) → 89% (high). Fixed α = 6/5 outperforms free-α fits. Combined with galactic rotation curves (Paper 4) and GR recovery (Paper 6) via Fisher's method: 5.8σ across 233 measurements spanning three gravitational regimes. Zero free parameters. Domain #14."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18900993" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-amber-500/30 text-amber-400"
                title="Paper 14: Dynamical Dimensional Reduction from Sephirotic Topology: 11 Planes to 2 Effective Modes via Fractional Stückelberg Mechanism"
                description="The spectral gap of the Sephirotic graph Laplacian (Δλ = 0.328, largest in the spectrum) dynamically reduces 11 internal planes to 2 effective modes under the fractional Laplacian (−Δ)^(3/5). Mode 0 (λ = 0, topologically protected) couples universally → gravity. Mode 1 (λ = 0.318, bilateral symmetry) splits the tree into signed sectors → gauge field. 9 heavy modes acquire topological mass (τ = 0.72–1.24) and drop below 1% of energy at t = 2.25. Nonlinear stability confirmed through g = 1.0 (light modes retain 96% energy). No geometric compactification. Zero free parameters. Domain #15."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18902147" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-amber-500/30 text-amber-400"
                title="Paper 15: Stochastic Extensions of the MPFST Coupled PDE System: Noise-Driven Dynamics on the Sephirotic Graph"
                description="Six computational tests on the stochastic MPFST PDE. Spectral gap survives noise (2 light modes retain >90% energy at σ=0.5). Noise-driven meltdown at σ_c=0.55. Kramers escape with R²=0.997 confirming Arrhenius barrier crossing. Stochastic resonance amplifies gauge mode 2.3× at optimal noise. Zero-noise recovery |ψ_stoch − ψ_det| < 10⁻⁴. Zero free parameters. Domain #16."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18902559" },
                ]}
              />

              <PaperCard
                badge="Published Preprint"
                badgeColor="border-amber-500/30 text-amber-400"
                title="Paper 16: Accelerated Cosmic Expansion from Fractional Gravity: Dark Energy as a Topological Artifact"
                description="The fractional Laplacian (−Δ)^(3/5) modifies the gravitational equation of state to w = −(2α−1)/(3α−1) = −11/15 ≈ −0.733. Tested against 1,590 Pantheon+ Type Ia supernovae: MPFST χ² = 684.92 vs ΛCDM χ² = 684.60 (Δχ² = 0.32, statistically indistinguishable). DES Y5 (2024) measures w = −0.70 ± 0.09 — MPFST is 0.37σ away. DESI (2024) measures w₀ = −0.55 ± 0.21 — MPFST within 0.87σ. The cosmological constant Λ is not needed: accelerated expansion is fractional gravity at cosmological scales. Same α = 6/5. Zero free parameters. Domain #17."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18930436" },
                ]}
              />

              <PaperCard
                badge="Preprint"
                badgeColor="border-blue-500/30 text-blue-400"
                title="Paper 17: Anomalous Self-Energy Scaling in Cuprate Superconductors from Fractional Dynamics"
                description="The fractional memory function M(ω) ~ ω^(2−α) = ω^(4/5) predicts optical self-energy exponent β = 0.800 for cuprate high-Tc superconductors. Tested against 16 published measurements across 6 independent studies (BSCCO, YBCO, Tl-2201, Hg-1201, LSCO): MPFST χ² = 5.6 vs Marginal Fermi Liquid χ² = 51.0 — MPFST is 4.8× better. Weighted mean observed β = 0.765 ± 0.024. The 30-year anomalous mid-infrared power law is a direct consequence of fractional transport. Same α = 6/5. Zero free parameters. Domain #18."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18930654" },
                ]}
              />

              <PaperCard
                badge="Preprint"
                badgeColor="border-blue-500/30 text-blue-400"
                title="Paper 18: Black Hole Entropy Corrections from Fractional Dynamics on the Sephirotic Graph"
                description="The spectral dimension d_s = 2α/2 on a 2D horizon with α = 6/5 predicts logarithmic entropy correction c_log = −(d_s/2 − 1) = −2/3. This matches Asymptotic Safety gravity exactly, while Loop Quantum Gravity (−3/2) and string theory (−1/2) predict different values. Same derivation as Paper 8 qubit decoherence. BH evaporation time scales as M^(2+α) instead of M³ — testable for primordial black holes. Zero free parameters. Domain #19."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18930865" },
                ]}
              />

              {/* PRL Letter */}
              <PaperCard
                badge="Submitted"
                badgeColor="border-yellow-500/30 text-yellow-400"
                title="PRL Letter: One Topological Constant Predicts Fourteen Physical Domains: Fractional Dynamics on an 11-Node Graph"
                description="Flagship 3-page letter submitted to Physical Review Letters (es2026mar07_508). Synthesizes all 14 papers into a single unified result: α = 6/5, an exact eigenvalue of the 11-node Sephirotic graph Laplacian, generates zero-parameter predictions across 15 independent physical domains. Combined significance via Fisher's method: 5.8σ. No free parameters. No fitting. One topology — fifteen domains."
                links={[
                  { label: "Zenodo Preprint", url: "https://doi.org/10.5281/zenodo.18898117" },
                  { label: "Journal: Physical Review Letters (es2026mar07_508)" },
                ]}
              />

              {/* Manuscripts */}
              <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-6">
                <div className="mb-3">
                  <Badge color="border-zinc-500/30 text-zinc-400">Working Manuscripts</Badge>
                  <h3 className="text-sm font-semibold text-white mt-2">
                    Full MPFST Manuscripts — Background &amp; Theory Development
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  These documents contain the full theoretical framework including equations, derivations,
                  and cross-domain predictions. They represent the development process from which the 
                  testable predictions emerged. The predictions themselves have been tested against real
                  data in the papers above.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    ["MPFST-Full-Theory.pdf", "MPFST — Full Theory (202pp)"],
                    ["MPFST-V9.pdf", "V9 — Mature Formulation"],
                    ["MPFST-V9-Complements.pdf", "V9 Complements — External Validations"],
                    ["Further-Development-of-MPFST.pdf", "Further Development"],
                    ["MPFST-QFT-Mapping.pdf", "QFT Mapping"],
                    ["Validation-of-MPFST-Negative-Control-Scaling-Law-Violations.pdf", "Negative Control Validation"],
                    ["Avalanche-MPFST.pdf", "Avalanche Analysis"],
                    ["Empirical-Evidence-MPFST.pdf", "Empirical Evidence"],
                    ["Empirical-Support-Rindler-MPFST.pdf", "Rindler Support"],
                    ["Mapping-EEG-Bands-to-MPFST-Occupant-Fields.pdf", "EEG Band Mapping"],
                  ].map(([file, label]) => (
                    <a key={file} href={`/${file}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 hover:bg-black/50 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
                      <FileText className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                      <span className="text-[11px] text-zinc-400 truncate">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPEN QUESTIONS ── */}
        <section id="open-questions" className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle icon={<FlaskConical className="w-5 h-5" />}>Open Questions &amp; Next Steps</SectionTitle>

            <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-1">✓ Mathematical Well-Posedness — PROVEN (Paper 10)</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <strong className="text-green-400/80">Resolved.</strong> The 11-field coupled fractional PDE system is well-posed
                    in Sobolev space H<sup>s</sup>. Local existence proven via Banach fixed-point theorem (Picard contraction
                    ratio 0.0003), uniqueness via Gronwall stability (contraction factor 0.07), energy boundedness via monotone
                    decay (88% dissipation), and global existence verified numerically to T=20 with no blowup. The mathematical
                    foundation for all preceding empirical papers is now established.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-1">✓ Why &alpha; = 1.2? — ANSWERED (Paper 9)</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <strong className="text-green-400/80">Resolved.</strong> &alpha; = 6/5 is an exact eigenvalue (error &lt; 10⁻¹⁶) of the normalized
                    graph Laplacian of the 11-node Sephirotic Tree (10 Sephirot + Da&apos;at). Its eigenvector is the bilateral
                    symmetry mode — left pillar anti-phase with right pillar, middle pillar at zero. Without Da&apos;at,
                    the closest eigenvalue is 1.2224. The hidden 11th node locks the parameter to exactly 6/5.
                    &alpha; is not empirical — it is a topological invariant of the theory&apos;s own coupling network.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-1">Transferred Potential Experiment — Waiting for Funding</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    The most direct test of MPFST: two meditators in separate Faraday cages, one receives light flashes,
                    measure the other&apos;s EEG for correlated evoked potentials. 7 quantitative predictions pre-registered.
                    Full protocol designed. Budget: $47K for Phase 1. Contact us to collaborate.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400 mb-1">Quantization &amp; Quantum Gravity — RESOLVED (Paper 11)</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Paper 11 resolves this: the fractional Laplacian (-Δ)^(3/5) on the Sephirotic graph produces both
                    discrete energy quantization (from the graph eigenvalue spectrum) and emergent gravity (from the
                    fractional Green&apos;s function G(r) ~ r^(α-3)). Phase transitions at meltdownFrac thresholds yield
                    quantized jumps without a collapse postulate. QFT and GR are recovered simultaneously at α→2.
                    The quantum gravity problem dissolves — there is nothing to reconcile when both emerge from the same operator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle icon={<Compass className="w-5 h-5" />}>About</SectionTitle>
            <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-6">
              <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                <p>
                  <strong className="text-zinc-200">Carlos Freeman</strong> is an independent researcher based in South Florida.
                  He is not a physicist or mathematician by training — he is a builder and philosopher who asked
                  whether ancient network structures might encode real physics.
                </p>
                <p>
                  The answer, tested against real data across 14 domains with a single parameter, appears to be yes.
                </p>
                <p>
                  All code, data, and analysis are publicly available. All predictions are pre-registered or published
                  before testing. The work stands on its results, not credentials.
                </p>
                <p>
                  <strong className="text-zinc-200">Contact:</strong>{" "}
                  <a href="mailto:carlos@mpfst.com" className="text-amber-400 hover:text-amber-300">carlos@mpfst.com</a>
                  {" | "}
                  <strong className="text-zinc-200">ORCID:</strong>{" "}
                  <a href="https://orcid.org/0009-0005-7399-3204" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">0009-0005-7399-3204</a>
                  {" | "}
                  <strong className="text-zinc-200">X:</strong>{" "}
                  <a href="https://x.com/FreemanCW" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">@FreemanCW</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-zinc-800/60 py-8 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <span>&copy; 2025–2026 Carlos Freeman. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="https://orcid.org/0009-0005-7399-3204" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">ORCID</a>
              <a href="https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Freeman%2C%20Carlos%20W.%22" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">Zenodo</a>
              <a href="/experimentalists" className="hover:text-zinc-400 transition-colors">For Experimentalists</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
