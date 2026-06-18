import React, { useMemo, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { NODES, computeSpectrum, TARGET } from "@/lib/sephirot";
import { CheckCircle2, RotateCcw, ExternalLink, Sigma } from "lucide-react";

// Diverging color for an eigenvector component (blue → zinc → red).
function vecColor(v: number, max: number): string {
  const t = max > 0 ? Math.max(-1, Math.min(1, v / max)) : 0;
  if (Math.abs(t) < 0.02) return "#3f3f46"; // ~zero → zinc
  if (t > 0) {
    const a = 0.25 + 0.75 * t;
    return `rgba(239, 68, 68, ${a.toFixed(3)})`; // red, positive
  }
  const a = 0.25 + 0.75 * -t;
  return `rgba(59, 130, 246, ${a.toFixed(3)})`; // blue, negative
}

const fmt = (v: number, d = 6) => (v < 0 && v > -5e-13 ? 0 : v).toFixed(d);

export default function Verify() {
  const [includeDaat, setIncludeDaat] = useState(true);
  const [nonce, setNonce] = useState(0); // force a fresh recompute on demand

  const spectrum = useMemo(
    () => computeSpectrum(includeDaat),
    // nonce intentionally included so "Recompute" re-runs the solver live
    [includeDaat, nonce]
  );

  const highlight =
    spectrum.alphaIndex >= 0 ? spectrum.pairs[spectrum.alphaIndex] : spectrum.nearest;
  const error = Math.abs(highlight.value - TARGET);
  const isExact = spectrum.alphaIndex >= 0;
  const rank = spectrum.pairs.indexOf(highlight) + 1;

  const vmax = Math.max(...highlight.vector.map(v => Math.abs(v)), 1e-9);
  const colorOf = (id: string) => {
    const i = spectrum.nodes.indexOf(id);
    return i >= 0 ? vecColor(highlight.vector[i], vmax) : "#18181b";
  };
  const compOf = (id: string) => {
    const i = spectrum.nodes.indexOf(id);
    return i >= 0 ? highlight.vector[i] : null;
  };

  const activeNodes = NODES.filter(n => includeDaat || !n.daat);

  return (
    <Layout
      title="Verify α = 6/5"
      description="Compute the Sephirotic graph eigenvalue live in your own browser. No install, no precomputed answer — the math behind MPFST, checkable in one second."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ─── Header ─── */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Sigma className="w-3.5 h-3.5" />
          Live in your browser — nothing precomputed
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5">
          Verify α = 6/5 yourself
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-3">
          The entire theory rests on one mathematical claim: that <strong className="text-amber-400">α = 6/5</strong> is
          an exact eigenvalue of the normalized Laplacian of an 11-node graph — not fitted, not tuned, a topological
          invariant. You don't have to take that on faith.
        </p>
        <p className="text-sm text-zinc-500 max-w-3xl mb-10">
          The numbers below are computed <em>right now, in your browser</em>, from the adjacency matrix — using a
          dependency-free Jacobi eigenvalue solver (
          <code className="text-zinc-400">lib/sephirot.ts</code>). No server, no precomputed result, no linear-algebra
          package. View source and check it line by line.
        </p>

        {/* ─── The big readout ─── */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${
            isExact ? "border-amber-500/40 bg-amber-500/[0.04]" : "border-zinc-800 bg-[#12141a]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              {isExact ? `Eigenvalue #${rank} of the normalized Laplacian` : `Nearest eigenvalue to 6/5 (#${rank})`}
            </div>
            {isExact ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400">
                <CheckCircle2 className="w-4 h-4" /> Exact match to 6/5
              </span>
            ) : (
              <span className="text-xs font-semibold text-zinc-500">No exact match without Da'at</span>
            )}
          </div>
          <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight break-all">
            λ = {highlight.value.toFixed(15)}
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-black/30 rounded-lg p-3 border border-zinc-800/60">
              <div className="text-[11px] text-zinc-500 mb-1">Target (6/5)</div>
              <div className="font-mono text-amber-400">1.200000000000000</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 border border-zinc-800/60">
              <div className="text-[11px] text-zinc-500 mb-1">Absolute error</div>
              <div className="font-mono text-amber-400">{error.toExponential(2)}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 border border-zinc-800/60">
              <div className="text-[11px] text-zinc-500 mb-1">Graph</div>
              <div className="font-mono text-amber-400">
                {spectrum.nodes.length} nodes · {spectrum.edges.length} edges
              </div>
            </div>
          </div>
        </div>

        {/* ─── Controls ─── */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setIncludeDaat(v => !v)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
              includeDaat
                ? "bg-amber-500 text-black border-amber-500 hover:bg-amber-400"
                : "bg-zinc-800/60 text-zinc-300 border-zinc-700 hover:bg-zinc-700/60"
            }`}
          >
            {includeDaat ? "Da'at included (11 nodes, 24 edges)" : "Da'at removed (10 nodes, 22 edges)"}
          </button>
          <button
            onClick={() => setNonce(n => n + 1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-zinc-800/60 text-zinc-300 border border-zinc-700 hover:bg-zinc-700/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Recompute
          </button>
          <p className="text-xs text-zinc-500 max-w-md">
            Toggle Da'at to watch the topology unlock: without it the closest eigenvalue is 1.2224; adding the hidden
            11th node — connected to Chokmah and Binah — snaps it to exactly 6/5.
          </p>
        </div>

        {/* ─── Two-column: graph + spectrum ─── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Graph */}
          <div className="bg-[#12141a] border border-zinc-800/60 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-1">The graph</h2>
            <p className="text-xs text-zinc-500 mb-4">
              Node fill shows the highlighted eigenvector — the{" "}
              <span className="text-red-400">bilateral-symmetry mode</span>. Mirror pairs carry equal and{" "}
              <span className="text-blue-400">opposite</span> weight; central-pillar nodes sit at zero.
            </p>
            <svg viewBox="0 0 100 110" className="w-full max-w-sm mx-auto">
              {spectrum.edges.map(([a, b], i) => {
                const na = NODES.find(n => n.id === a)!;
                const nb = NODES.find(n => n.id === b)!;
                const isDaat = a === "Daat" || b === "Daat";
                return (
                  <line
                    key={i}
                    x1={na.x * 100}
                    y1={na.y * 100}
                    x2={nb.x * 100}
                    y2={nb.y * 100}
                    stroke={isDaat ? "#f59e0b" : "#3f3f46"}
                    strokeWidth={isDaat ? 0.7 : 0.45}
                    strokeDasharray={isDaat ? "1.5 1" : undefined}
                  />
                );
              })}
              {activeNodes.map(n => {
                const comp = compOf(n.id);
                return (
                  <g key={n.id}>
                    <circle
                      cx={n.x * 100}
                      cy={n.y * 100}
                      r={n.daat ? 3.4 : 4}
                      fill={colorOf(n.id)}
                      stroke={n.daat ? "#f59e0b" : "#52525b"}
                      strokeWidth={n.daat ? 0.7 : 0.4}
                      strokeDasharray={n.daat ? "1 0.8" : undefined}
                    />
                    <text
                      x={n.x * 100}
                      y={n.y * 100 + 7}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#a1a1aa"
                      fontWeight="600"
                    >
                      {n.id}
                    </text>
                    {comp !== null && Math.abs(comp) > 0.02 && (
                      <text
                        x={n.x * 100}
                        y={n.y * 100 + 1}
                        textAnchor="middle"
                        fontSize="2.4"
                        fill="#fff"
                        fontWeight="700"
                      >
                        {comp > 0 ? "+" : "−"}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Spectrum */}
          <div className="bg-[#12141a] border border-zinc-800/60 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-1">Full spectrum</h2>
            <p className="text-xs text-zinc-500 mb-4">
              All {spectrum.pairs.length} eigenvalues of the normalized Laplacian, sorted ascending. Range is always
              [0, 2].
            </p>
            <div className="space-y-1.5">
              {spectrum.pairs.map((p, i) => {
                const hit = p === highlight;
                const frac = p.value / 2;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-7 text-right text-[11px] font-mono text-zinc-600">#{i + 1}</span>
                    <div className="flex-1 h-6 bg-black/40 rounded-md overflow-hidden relative border border-zinc-800/40">
                      <div
                        className={`h-full ${hit ? "bg-amber-500/30" : "bg-zinc-700/40"}`}
                        style={{ width: `${frac * 100}%` }}
                      />
                      <span
                        className={`absolute inset-y-0 left-2 flex items-center text-[11px] font-mono ${
                          hit ? "text-amber-300 font-bold" : "text-zinc-400"
                        }`}
                      >
                        {fmt(p.value, 12)}
                      </span>
                      {hit && isExact && (
                        <span className="absolute inset-y-0 right-2 flex items-center text-[10px] font-bold text-amber-400">
                          = 6/5
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── What just happened ─── */}
        <div className="bg-[#12141a] border border-zinc-800/60 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">What just happened</h2>
          <ol className="space-y-3 text-sm text-zinc-400 leading-relaxed list-decimal list-inside">
            <li>
              Build the adjacency matrix <code className="text-zinc-300">A</code> of the 11-node graph (10 Sephirot +
              Da'at) with its {spectrum.edges.length} edges.
            </li>
            <li>
              Form the symmetric normalized Laplacian{" "}
              <code className="text-zinc-300">L = I − D^(−1/2) · A · D^(−1/2)</code>, where{" "}
              <code className="text-zinc-300">D</code> is the diagonal degree matrix.
            </li>
            <li>
              Diagonalize <code className="text-zinc-300">L</code> with a cyclic Jacobi rotation solver and sort the
              eigenvalues.
            </li>
            <li>
              The 7th eigenvalue comes out to <strong className="text-amber-400">1.200000000000000</strong> — equal to
              6/5 to within floating-point precision (~10⁻¹⁶). Its eigenvector is the bilateral-symmetry mode.
            </li>
          </ol>
          <p className="text-xs text-zinc-500 mt-5">
            This is a property of the topology alone. The value 6/5 exists in the graph before any physics, any data,
            or any fitting is introduced — which is exactly why MPFST treats it as a derived constant rather than a
            free parameter. (Whether the <em>physical</em> consequences hold is what the other {`27`} papers test; this
            page only certifies the underlying number.)
          </p>
        </div>

        {/* ─── Edge list ─── */}
        <div className="bg-[#12141a] border border-zinc-800/60 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">The 24 edges</h2>
          <p className="text-xs text-zinc-500 mb-4">
            22 classical Tree-of-Life paths plus the two Da'at edges (highlighted). This is the complete input to the
            calculation above — copy it into NumPy and you'll get the same answer.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 font-mono text-xs">
            {spectrum.edges.map(([a, b], i) => {
              const isDaat = a === "Daat" || b === "Daat";
              return (
                <div
                  key={i}
                  className={`px-2.5 py-1.5 rounded-md border ${
                    isDaat
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                      : "border-zinc-800/60 bg-black/30 text-zinc-400"
                  }`}
                >
                  {a}–{b}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Reproduce in Python ─── */}
        <div className="bg-[#0a0b0f] border border-zinc-800/60 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Prefer NumPy? Same result in 12 lines</h2>
          <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed border border-zinc-800/40">
{`import numpy as np, networkx as nx

S = ["Keter","Chokmah","Binah","Chesed","Gevurah","Tiferet",
     "Netzach","Hod","Yesod","Malkuth","Daat"]
E = [("Keter","Chokmah"),("Keter","Binah"),("Keter","Tiferet"),
 ("Chokmah","Binah"),("Chokmah","Tiferet"),("Chokmah","Chesed"),
 ("Binah","Tiferet"),("Binah","Gevurah"),("Chesed","Gevurah"),
 ("Chesed","Tiferet"),("Chesed","Netzach"),("Gevurah","Tiferet"),
 ("Gevurah","Hod"),("Tiferet","Netzach"),("Tiferet","Hod"),
 ("Tiferet","Yesod"),("Netzach","Hod"),("Netzach","Yesod"),
 ("Netzach","Malkuth"),("Hod","Yesod"),("Hod","Malkuth"),
 ("Yesod","Malkuth"),("Daat","Chokmah"),("Daat","Binah")]

G = nx.Graph(); G.add_nodes_from(S); G.add_edges_from(E)
w = np.linalg.eigvalsh(nx.normalized_laplacian_matrix(G).toarray())
print(sorted(w)[6])   # -> 1.2000000000000002`}
          </pre>
        </div>

        {/* ─── Links ─── */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://zenodo.org/records/18897608"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors"
          >
            Paper 9: the eigenvalue proof <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://zenodo.org/records/19041034"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors border border-zinc-700"
          >
            Paper 24: three axioms → this graph <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/overview"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800/50 text-zinc-300 font-semibold text-sm hover:bg-zinc-700/50 transition-colors border border-zinc-800"
          >
            What does α = 6/5 do?
          </Link>
        </div>
      </div>
    </Layout>
  );
}
