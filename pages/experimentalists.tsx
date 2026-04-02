import React, { useState } from "react";
import Layout from "@/components/Layout";
import { PAPERS, STATS, zenodoUrl } from "@/components/data";
import { ExternalLink, ChevronDown, ChevronRight, Terminal, Database, FlaskConical } from "lucide-react";

const PaperRow = ({ p }: { p: typeof PAPERS[0] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-800/60 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-zinc-800/20 transition-colors text-left">
        {open ? <ChevronDown className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />}
        <span className="text-xs font-mono text-zinc-600 w-8 flex-shrink-0">{p.id}</span>
        <span className="text-sm font-medium text-white flex-1">{p.shortTitle}</span>
        <span className="text-xs text-zinc-600 hidden sm:block">{p.field}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-zinc-800/40">
          <div className="grid gap-5 mt-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Prediction</span>
              </div>
              <p className="text-sm text-zinc-300">{p.prediction}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data Source</span>
              </div>
              <p className="text-sm text-zinc-300">{p.dataSource}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">How to Reproduce</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{p.howToReproduce}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-amber-400/80 font-mono">{p.keyResult}</div>
            <a href={zenodoUrl(p.doi)} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-medium">
              View Paper & Code <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Experimentalists() {
  return (
    <Layout title="For Scientists" description={`Reproduction guide for all ${STATS.papers} MPFST papers — predictions, data sources, and step-by-step instructions`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
          For Scientists
        </h1>
        <p className="text-zinc-500 mb-4">
          Every result is reproducible. Every paper includes complete source code.
        </p>

        {/* ─── Quick-start ─── */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-white mb-3">Quick Start</h2>
          <div className="space-y-3 text-sm text-zinc-300">
            <p>
              <strong className="text-white">Step 1:</strong> Pick any paper below. Each Zenodo record contains the PDF
              and a Python script (typically under 500 lines).
            </p>
            <p>
              <strong className="text-white">Step 2:</strong> Install dependencies — usually just <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">numpy</code>,{" "}
              <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">scipy</code>, and{" "}
              <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">matplotlib</code>.
              No GPU required for most papers.
            </p>
            <p>
              <strong className="text-white">Step 3:</strong> Run the script. It downloads or generates the data, runs
              the analysis, and outputs the key statistics. Compare to the paper's Table 1.
            </p>
          </div>
          <div className="mt-4 bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
            <span className="text-zinc-600"># Example: Reproduce Paper 9 (Sephirotic Eigenvalue)</span><br />
            pip install numpy scipy<br />
            python3 sephirotic_eigenvalue.py<br />
            <span className="text-zinc-600"># Output: λ₆ = 1.200000000000000 (error &lt; 10⁻¹⁶)</span>
          </div>
        </div>

        {/* ─── The verifiable claim ─── */}
        <div className="bg-[#12141a] border border-zinc-800/60 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-white mb-3">The Verifiable Claim</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            MPFST asserts that replacing the standard Laplacian (α = 2) with a fractional Laplacian
            (α = 6/5) — using no other adjustable parameters — produces predictions that match published
            experimental data better than the standard theory in {STATS.domains} independent domains.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            This is a concrete, falsifiable claim. To test it:
          </p>
          <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-1.5">
            <li>Pick any domain below</li>
            <li>Obtain the published data (all sources are cited, most are freely available)</li>
            <li>Run the MPFST prediction with α = 6/5 (code provided)</li>
            <li>Run the standard prediction with α = 2 (same code, change one parameter)</li>
            <li>Compare χ², BIC, or whatever statistical test is appropriate</li>
          </ol>
          <p className="text-sm text-zinc-400 mt-3">
            If α = 2 consistently outperforms α = 6/5, the framework fails. If α = 6/5 consistently
            wins, the framework has made a successful prediction with zero degrees of freedom.
          </p>
        </div>

        {/* ─── Paper-by-paper guide ─── */}
        <h2 className="text-xl font-bold text-white mb-4">
          Paper-by-Paper Reproduction Guide
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Click any paper to see its prediction, data source, and reproduction steps
        </p>
        <div className="space-y-3">
          {PAPERS.map(p => <PaperRow key={p.id} p={p} />)}
        </div>

        {/* ─── Technical details ─── */}
        <div className="mt-12 bg-[#12141a] border border-zinc-800/60 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Technical Details</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-zinc-300 mb-2">The Operator</h3>
              <p className="text-zinc-400">
                The fractional Laplacian (-Δ)<sup>α/2</sup> with α = 6/5 is defined via Fourier
                transform: F[(-Δ)<sup>α/2</sup>f](k) = |k|<sup>α</sup> F[f](k). On finite graphs,
                it is L<sup>α/2</sup> where L is the normalized graph Laplacian. Well-studied in
                probability (Lévy flights), PDEs (anomalous diffusion), and harmonic analysis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-300 mb-2">The Graph</h3>
              <p className="text-zinc-400">
                11 nodes (Keter, Chokmah, Binah, Da'at, Chesed, Gevurah, Tiferet, Netzach, Hod,
                Yesod, Malkuth) with 24 edges. Da'at connects only to Chokmah and Binah (degree 2).
                Tiferet has highest degree (8). The normalized Laplacian's eigenvalues are:
                0, 0.291, 0.749, 0.908, 0.926, 1.183, <strong className="text-amber-400">1.200</strong>, 1.278, 1.403, 1.520, 1.542.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-300 mb-2">Why α = 6/5?</h3>
              <p className="text-zinc-400">
                Paper 9 proves that λ₆ = 6/5 exactly for the 11-node graph with Da'at.
                Without Da'at (10-node), the closest eigenvalue is 1.2224. Da'at's specific
                connectivity (degree 2, connecting only to Chokmah and Binah) locks the topology
                to the exact rational value. This is a topological invariant — it doesn't depend
                on edge weights, coupling constants, or any continuous parameter.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-300 mb-2">Limitations</h3>
              <p className="text-zinc-400">
                The framework has not been peer-reviewed. Some domain tests (LENR, GW echoes) have
                marginal significance. Paper 24 derives the Sephirotic topology from three axioms
                (existence, isotropy, self-reference) via constructive geometry, though the uniqueness
                proof relies on discrete classification rather than a variational principle.
                The author is an independent researcher without
                institutional affiliation. All limitations are discussed in the individual papers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
