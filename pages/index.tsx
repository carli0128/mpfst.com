import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { STATS, PAPERS, FIELDS, DOMAINS, PRL, zenodoUrl } from "@/components/data";
import { FileText, Globe2, Atom, ArrowRight, ExternalLink } from "lucide-react";

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">{value}</div>
    <div className="text-sm text-zinc-500 mt-1 font-medium">{label}</div>
  </div>
);

export default function Home() {
  return (
    <Layout>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
              <Atom className="w-3.5 h-3.5" />
              Open Research — All Papers on Zenodo
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              One Number.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Thirty Domains.
              </span><br />
              Zero Free Parameters.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-4">
              α = 6/5 is the sixth eigenvalue of an 11-node graph. Not fitted, not tuned — a topological invariant.
              Plugged into a fractional Laplacian, it reproduces published experimental data across
              particle physics, astrophysics, neuroscience, condensed matter, plasma physics, biology,
              cosmology, and atomic physics.
            </p>
            <p className="text-sm text-zinc-600 mb-10">
              Multi-Plane Field Syntergic Theory · {STATS.author} · <a href={`https://orcid.org/${STATS.orcid}`} target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400">ORCID</a>
            </p>

            {/* Stats bar */}
            <div className="flex justify-center gap-8 sm:gap-16 mb-12">
              <Stat value={`${STATS.papers}`} label="Papers" />
              <Stat value={`${STATS.domains}`} label="Domains" />
              <Stat value="0" label="Free Parameters" />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/overview" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors">
                What is MPFST? <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/papers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-colors border border-zinc-700">
                <FileText className="w-4 h-4" /> Read the Papers
              </Link>
              <Link href="/experimentalists" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800/50 text-zinc-300 font-semibold hover:bg-zinc-700/50 transition-colors border border-zinc-800">
                <Globe2 className="w-4 h-4" /> Reproduce It
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Core Idea (brief) ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#12141a] border border-zinc-800/60 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white mb-6">The Core Idea</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Take an 11-node graph inspired by the Kabbalistic Tree of Life (10 Sephirot + Da'at, 24 edges).
                Compute its normalized graph Laplacian. The sixth eigenvalue is <strong className="text-amber-400">exactly 6/5</strong> — 
                a mathematical fact with error below 10⁻¹⁶.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Now replace the standard Laplacian ∇² in physics equations with the fractional
                Laplacian (-Δ)<sup>α/2</sup> where α = 6/5. This single substitution — with zero adjustable
                parameters — generates predictions that match published experimental data across {STATS.domains} independent domains.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                This is not a fit. The parameter was derived from pure graph theory before any experimental comparison was made.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#0a0b0f] rounded-xl p-5 border border-zinc-800/40">
                <div className="text-xs text-zinc-600 font-mono mb-2">THE OPERATOR</div>
                <div className="text-2xl font-mono text-amber-400 text-center py-3">(-Δ)<sup>3/5</sup></div>
                <div className="text-xs text-zinc-500 text-center">Fractional Laplacian with α = 6/5</div>
              </div>
              <div className="bg-[#0a0b0f] rounded-xl p-5 border border-zinc-800/40">
                <div className="text-xs text-zinc-600 font-mono mb-2">THE GRAPH</div>
                <div className="text-sm text-zinc-400 text-center py-2">
                  11 nodes · 24 edges<br />
                  <span className="text-zinc-500">λ₆ = 1.200000000000000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Fields at a glance ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Fields Covered</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {FIELDS.map(f => (
            <span key={f.name}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{ borderColor: f.color + "40", color: f.color, backgroundColor: f.color + "10" }}>
              {f.name}
              <span className="ml-1 opacity-60">({f.papers.length})</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── Strongest results ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-2">Strongest Results</h2>
        <p className="text-sm text-zinc-500 mb-6">Selected papers with the highest statistical significance</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[12, 26, 28, 2, 8, 27].map(id => {
            const p = PAPERS.find(pp => pp.id === id)!;
            return (
              <a key={id} href={zenodoUrl(p.doi)} target="_blank" rel="noopener noreferrer"
                className="group bg-[#12141a] border border-zinc-800/60 rounded-xl p-5 hover:border-amber-500/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono text-zinc-600">Paper {p.id}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-700 group-hover:text-amber-500 transition-colors" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">{p.shortTitle}</div>
                <div className="text-xs text-zinc-500 mb-3">{p.field}</div>
                <div className="text-xs text-amber-400/80 font-mono leading-relaxed">{p.keyResult}</div>
              </a>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link href="/papers" className="text-sm text-amber-500 hover:text-amber-400 font-medium">
            View all {STATS.papers} papers →
          </Link>
        </div>
      </section>

      {/* ─── All 24 domains list ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-2">{STATS.domains} Domains, One Parameter</h2>
        <p className="text-sm text-zinc-500 mb-6">Every domain tested with α = 6/5 and zero fitting</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          {DOMAINS.map((d, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5">
              <span className="text-amber-500 mt-0.5 text-xs font-mono w-5 flex-shrink-0">{i + 1}.</span>
              <span className="text-sm text-zinc-400">{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Journal submissions status ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#12141a] border border-zinc-800/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Journal Status</h2>
          <p className="text-sm text-zinc-400 mb-4">
            All {STATS.papers} papers are published as open-access preprints on Zenodo. Journal submissions to date:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-zinc-400">PRL Letter ({PRL.accession}) — desk rejected</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-zinc-400">Papers 1, 2, 3 — Chaos, Solitons & Fractals — rejected without review</span>
            </div>
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            No referee has engaged with the mathematics. All rejections were editorial ("not suitable for review").
            Every paper includes complete code, data sources, and reproduction instructions.
          </p>
        </div>
      </section>
    </Layout>
  );
}
