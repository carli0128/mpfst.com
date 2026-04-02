import React from "react";
import Layout from "@/components/Layout";
import { PAPERS, zenodoUrl } from "@/components/data";

const CATEGORIES = [
  {
    id: "A", name: "Spectral",
    description: "Construct operator with α = 6/5, diagonalize, compare eigenvalues to data.",
    color: "#f59e0b",
  },
  {
    id: "B", name: "Transport",
    description: "Insert α into transport/diffusion equation, derive scaling exponent, compare.",
    color: "#3b82f6",
  },
  {
    id: "C", name: "Topological",
    description: "Use eigenvector structure (8+3 decomposition, bilateral symmetry) to predict spatial/hierarchical patterns.",
    color: "#22c55e",
  },
  {
    id: "D", name: "Propagator / Green's Function",
    description: "Build fractional Green's function G(x,t;α), extract observable correlations.",
    color: "#a855f7",
  },
  {
    id: "E", name: "Thermodynamic",
    description: "Derive equation-of-state or entropy corrections from fractional dynamics.",
    color: "#ef4444",
  },
];

type CatKey = "A" | "B" | "C" | "D" | "E" | "A+C" | "A+B" | "D/B" | "—";

const PAPER_MAP: { id: number; cat: CatKey; method: string }[] = [
  { id: 1,  cat: "D",   method: "Green's function → cross-hemisphere correlations" },
  { id: 2,  cat: "A+C", method: "Graph adjacency → CFC matrix + bilateral topology" },
  { id: 3,  cat: "D",   method: "Fractional propagator → neutrino oscillation" },
  { id: 4,  cat: "D",   method: "Fractional Poisson → rotation curves" },
  { id: 5,  cat: "D/B", method: "Propagator modification → angular distributions" },
  { id: 6,  cat: "B",   method: "Doping parameter → GR recovery" },
  { id: 7,  cat: "A",   method: "Inter-plane coupling → voltage offset" },
  { id: 8,  cat: "A",   method: "Fractional Laplacian → decoherence scaling" },
  { id: 9,  cat: "—",   method: "Mathematical foundation (eigenvalue proof)" },
  { id: 10, cat: "—",   method: "Mathematical foundation (well-posedness)" },
  { id: 11, cat: "A",   method: "Operator spectrum → quantization" },
  { id: 12, cat: "B",   method: "Transport exponents from α = 6/5" },
  { id: 13, cat: "A+B", method: "Eigenvalue-based decay template → GW ringdown" },
  { id: 14, cat: "A",   method: "Spectral gap → dimensional reduction" },
  { id: 15, cat: "—",   method: "Mathematical robustness (stochastic PDE)" },
  { id: 16, cat: "E",   method: "Fractional Friedmann → dark energy EOS" },
  { id: 17, cat: "B",   method: "Self-energy exponent β = 2 − α = 4/5" },
  { id: 18, cat: "E",   method: "Spectral dimension → entropy corrections" },
  { id: 19, cat: "C",   method: "Mode hierarchy → morphogenetic axes" },
  { id: 20, cat: "A",   method: "Eigenvalue convergence in MT lattices" },
  { id: 21, cat: "D",   method: "Fractional tunneling → LENR enhancement" },
  { id: 22, cat: "C",   method: "Bilateral eigenmode → peristaltic pump" },
  { id: 23, cat: "A",   method: "Cusp exponent → form factor behavior" },
  { id: 24, cat: "—",   method: "Mathematical foundation (first-principles derivation)" },
  { id: 25, cat: "C",   method: "8+3 decomposition → bioelectric channels" },
  { id: 26, cat: "A",   method: "3 spatial eigenvalues → GW template" },
  { id: 27, cat: "A",   method: "Derived β_k = 2α/λ_k → iEEG spectral exponents" },
  { id: 28, cat: "C",   method: "Topological directionality → MEG propagation" },
];

function catColor(cat: CatKey): string {
  if (cat === "—") return "#64748b";
  const primary = cat.split("+")[0].replace("/B", "") as string;
  return CATEGORIES.find(c => c.id === primary)?.color || "#64748b";
}

export default function Protocol() {
  return (
    <Layout title="Mapping Protocol" description="How each MPFST paper maps α = 6/5 to its domain — the v3.0 classification system.">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Mapping Protocol v3.0</h1>
        <p className="text-zinc-400 mb-12 max-w-3xl">
          Every MPFST paper maps the same constant — α = 6/5 — to a different physical domain.
          This page classifies <em>how</em> each paper performs that mapping. Five categories cover
          all 28 papers.
        </p>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {CATEGORIES.map(c => (
            <div key={c.id} className="bg-[#12141a] border border-zinc-800/60 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ backgroundColor: c.color + "20", color: c.color }}>
                  {c.id}
                </span>
                <span className="text-white font-semibold">{c.name}</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
          <div className="bg-[#12141a] border border-zinc-800/60 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black bg-zinc-800 text-zinc-400">
                —
              </span>
              <span className="text-white font-semibold">Foundation</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mathematical proofs and derivations that underpin the theory (not domain mappings).
            </p>
          </div>
        </div>

        {/* Full table */}
        <h2 className="text-2xl font-bold text-white mb-6">Paper Classification</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-zinc-500 font-medium py-3 pr-4 w-16">Paper</th>
                <th className="text-left text-zinc-500 font-medium py-3 pr-4 w-24">Category</th>
                <th className="text-left text-zinc-500 font-medium py-3 pr-4">Title</th>
                <th className="text-left text-zinc-500 font-medium py-3">Method</th>
              </tr>
            </thead>
            <tbody>
              {PAPER_MAP.map(pm => {
                const paper = PAPERS.find(p => p.id === pm.id);
                if (!paper) return null;
                return (
                  <tr key={pm.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                    <td className="py-3 pr-4">
                      <a href={zenodoUrl(paper.doi)} target="_blank" rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-400 font-mono">
                        {pm.id}
                      </a>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: catColor(pm.cat) + "20", color: catColor(pm.cat) }}>
                        {pm.cat}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-zinc-300">{paper.shortTitle}</td>
                    <td className="py-3 text-zinc-400">{pm.method}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary stats */}
        <div className="mt-12 bg-[#12141a] border border-zinc-800/60 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-white mb-4">Distribution</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(c => {
              const count = PAPER_MAP.filter(pm => pm.cat.includes(c.id)).length;
              return (
                <div key={c.id} className="text-center">
                  <div className="text-2xl font-black" style={{ color: c.color }}>{count}</div>
                  <div className="text-xs text-zinc-500 mt-1">Cat {c.id}: {c.name}</div>
                </div>
              );
            })}
            <div className="text-center">
              <div className="text-2xl font-black text-zinc-500">
                {PAPER_MAP.filter(pm => pm.cat === "—").length}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Foundation</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
