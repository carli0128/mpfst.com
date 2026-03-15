import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { STATS, DOMAINS } from "@/components/data";

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
      {n}
    </div>
    <div className="pt-1.5">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="text-zinc-400 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  </div>
);

const QA = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div className="bg-[#12141a] border border-zinc-800/60 rounded-xl p-6">
    <h3 className="text-sm font-semibold text-amber-400 mb-3">{q}</h3>
    <div className="text-sm text-zinc-400 leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function Overview() {
  return (
    <Layout title="What is MPFST?" description="A plain-language explanation of Multi-Plane Field Syntergic Theory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          What is MPFST?
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-12">
          A plain-language explanation for anyone. No physics degree required.
        </p>

        {/* ─── The story ─── */}
        <div className="space-y-10 mb-16">
          <Step n={1} title="The Problem: Physics Is Fragmented">
            <p>
              Modern physics has separate equations for gravity (General Relativity), quantum mechanics
              (Schrödinger equation), particle physics (Standard Model), and everything else. These
              frameworks use different mathematics, different assumptions, and don't talk to each other.
              Nobody knows why the universe needs so many separate rule sets.
            </p>
          </Step>

          <Step n={2} title="The Observation: A Special Graph">
            <p>
              The Kabbalistic Tree of Life is an ancient diagram with 10 nodes (Sephirot) connected by
              22 paths. MPFST adds one node (Da'at) for 11 total, with 24 edges in a specific topology.
              This isn't mysticism — it's a precise mathematical object: an 11-node, 24-edge graph.
            </p>
            <p>
              When you compute the eigenvalues of this graph's normalized Laplacian matrix, the sixth
              eigenvalue comes out to <strong className="text-amber-400">exactly 6/5 = 1.200000000000000</strong> (error below 10⁻¹⁶).
              This is a pure mathematical fact — verifiable by anyone with a linear algebra library.
            </p>
          </Step>

          <Step n={3} title='The Substitution: Replace ∇² with (-Δ)^(α/2)'>
            <p>
              Nearly every equation in physics contains the Laplacian operator (∇²). It describes how
              things diffuse, propagate, and interact. The standard Laplacian corresponds to α = 2.
            </p>
            <p>
              MPFST replaces it with a <strong className="text-white">fractional Laplacian</strong> (-Δ)<sup>α/2</sup> where
              α = 6/5. This is a well-studied operator in mathematics — it generates power-law tails
              instead of exponential ones, and produces anomalous (non-Gaussian) diffusion. Fractional
              calculus is not new or exotic; it's taught in graduate math programs worldwide.
            </p>
            <p>
              The key: α is not a free parameter. It was derived from the graph topology before any
              experimental comparison was made.
            </p>
          </Step>

          <Step n={4} title="The Result: It Keeps Working">
            <p>
              This single substitution — the same α = 6/5 every time, with no additional adjustable
              parameters — has been tested against published experimental data across {STATS.domains} independent
              domains spanning {STATS.papers} papers. The data was collected by researchers who never heard of
              MPFST, for purposes unrelated to this theory.
            </p>
            <p>
              Examples: fusion plasma transport matches 55 measurements from 15 tokamaks (p ≈ 1.000).
              Galactic rotation curves fit 88/124 galaxies without dark matter (p &lt; 10⁻⁶). Atomic form
              factors show cusp behavior across 11 elements (null-validated against 500 random tests).
              LHC dijet data improves over QCD at 6.7σ.
            </p>
            <p>
              Each domain was tested independently. No parameter was adjusted between domains. If the
              theory failed in any domain, that failure would be reported — and some honest limitations
              are noted in the papers.
            </p>
          </Step>
        </div>

        {/* ─── FAQ ─── */}
        <h2 className="text-2xl font-bold text-white mb-6">Common Questions</h2>
        <div className="grid gap-4 mb-16">
          <QA q="Why the Kabbalistic Tree of Life? Is this religion?">
            <p>
              No. The graph topology is treated as a mathematical object — 11 nodes and 24 edges with
              specific connectivity. The fact that this topology was identified thousands of years ago
              in a mystical tradition is historically interesting but mathematically irrelevant. What
              matters is that its eigenvalue spectrum produces α = 6/5, and this number keeps matching data.
            </p>
            <p>
              If someone discovered the same graph by numbering dots on graph paper, the physics would
              be identical. The origin doesn't affect the eigenvalue.
            </p>
          </QA>

          <QA q="How can one number explain so many different phenomena?">
            <p>
              Because the Laplacian operator appears in almost every equation in physics. The Schrödinger
              equation, the heat equation, the wave equation, Maxwell's equations, the Einstein field
              equations — they all contain ∇². Changing the order of this operator from 2 to 6/5 modifies
              every domain simultaneously. It's like changing the font on an entire document by changing
              one setting.
            </p>
          </QA>

          <QA q="Has this been peer-reviewed?">
            <p>
              Three papers were submitted to Chaos, Solitons & Fractals and one flagship letter to
              Physical Review Letters. All were desk-rejected — meaning an editor decided not to send
              them to referees, without engaging with the mathematics. No referee has reviewed the work.
            </p>
            <p>
              All {STATS.papers} papers are published as open-access preprints on Zenodo with DOIs, complete
              source code, and instructions for independent reproduction. The entire body of evidence
              is available for scrutiny by anyone.
            </p>
          </QA>

          <QA q="What would disprove MPFST?">
            <p>
              Any domain where α = 6/5 definitively fails. If the fractional Laplacian with this exact
              exponent produces predictions that are statistically excluded by high-quality experimental
              data, the framework is falsified. Every paper includes the data and code needed to check.
            </p>
          </QA>

          <QA q="Who is the author?">
            <p>
              Carlos W. Freeman, an independent researcher. Not affiliated with a university or national
              laboratory. The work was done on rented GPU compute, funded from a small business. This
              means no institutional gatekeeping — but also no institutional stamp of approval.
              The math stands on its own.
            </p>
          </QA>

          <QA q="Can I reproduce the results?">
            <p>
              Yes. Every paper includes complete source code (Python, typically under 500 lines), the
              exact data sources used, and step-by-step instructions. Most results can be reproduced
              on a laptop in minutes. See the <Link href="/experimentalists" className="text-amber-400 hover:text-amber-300">For Scientists</Link> page.
            </p>
          </QA>
        </div>

        {/* ─── All domains ─── */}
        <h2 className="text-2xl font-bold text-white mb-4">All {STATS.domains} Domains</h2>
        <p className="text-sm text-zinc-500 mb-6">Each tested with α = 6/5 and zero free parameters</p>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-decimal list-inside text-sm text-zinc-400 mb-10">
          {DOMAINS.map((d, i) => <li key={i} className="py-1">{d}</li>)}
        </ol>

        <div className="flex flex-wrap gap-3">
          <Link href="/papers" className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors">
            Read the Papers
          </Link>
          <Link href="/experimentalists" className="px-5 py-2.5 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors border border-zinc-700">
            Reproduction Guide
          </Link>
        </div>
      </div>
    </Layout>
  );
}
