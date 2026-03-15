import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { STATS } from "@/components/data";
import { Mail, ExternalLink, Beaker, PenTool, Globe2, Cpu, MessageSquare } from "lucide-react";

const Card = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="bg-[#12141a] border border-zinc-800/60 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-amber-400" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="text-sm text-zinc-400 leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function Collaborate() {
  return (
    <Layout title="Collaborate" description="How to work with MPFST — test it, challenge it, or extend it">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-black text-white tracking-tight mb-4">
          Collaborate
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-12">
          MPFST is open. The code is public. The data sources are cited. The predictions are concrete.
          Whether you want to test it, challenge it, or extend it — here's how.
        </p>

        <div className="grid gap-6 mb-12">
          <Card icon={Beaker} title="Test a Prediction">
            <p>
              Every paper makes a specific, falsifiable prediction using α = 6/5. If you have access
              to experimental data in any domain — condensed matter, particle physics, astrophysics,
              biophysics, plasma physics — you can test whether the fractional Laplacian with this
              exact exponent outperforms the standard theory.
            </p>
            <p>
              Especially valuable: domains NOT yet tested. Turbulence, seismology, financial time series,
              quantum chemistry, nuclear structure, superconducting circuits, or any system governed
              by a Laplacian operator.
            </p>
            <p>
              The test is straightforward: run your analysis with α = 2 (standard) and α = 6/5 (MPFST).
              Compare fit quality. Report whatever you find.
            </p>
          </Card>

          <Card icon={PenTool} title="Challenge the Framework">
            <p>
              The strongest possible test is one designed to BREAK the theory. If you can find a domain
              where α = 6/5 is definitively excluded by high-quality data, that's a significant result.
            </p>
            <p>
              Constructive challenges focus on: Is α truly 6/5, or is there a better fit nearby?
              Does the Sephirotic topology have a first-principles derivation, or is it assumed?
              Are the statistical tests robust to different analysis choices?
            </p>
            <p>
              Destructive challenges: Find a domain where MPFST makes a clear prediction that fails.
              That would be more valuable than 10 papers showing it works.
            </p>
          </Card>

          <Card icon={Globe2} title="Extend to New Domains">
            <p>
              The papers cover {STATS.domains} domains so far. But any physical system with a Laplacian is
              a candidate. Some promising untested domains:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 ml-2">
              <li>Turbulence intermittency in fluid dynamics</li>
              <li>Anomalous heat transport in nanoscale systems</li>
              <li>Quantum chemistry — molecular orbital calculations</li>
              <li>Seismology — wave propagation in heterogeneous media</li>
              <li>Financial physics — option pricing with fractional diffusion</li>
              <li>Network science — anomalous spreading on real-world graphs</li>
              <li>Acoustic metamaterials — fractional wave equations</li>
            </ul>
          </Card>

          <Card icon={Cpu} title="Computational Projects">
            <p>
              Several computational questions remain open:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 ml-2">
              <li>Larger-scale universe simulations — what structures emerge from the coupled PDE on cosmological grids?</li>
              <li>Machine learning: can a neural network rediscover α = 6/5 from multi-domain data?</li>
              <li>Optimizing the eigenvalue: does 6/5 sit at a special point in the space of possible graph topologies?</li>
              <li>Connecting to quantum gravity: does the fractional Laplacian produce the right spectral dimension running?</li>
            </ul>
          </Card>

          <Card icon={MessageSquare} title="Discuss & Engage">
            <p>
              The best way to engage is through the work itself. Read a paper, run the code, and
              report what you find — whether it confirms or contradicts the predictions.
            </p>
            <p>
              Public discussion on <a href="https://x.com/FreemanCW" target="_blank" rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300">@FreemanCW on X</a> is welcome.
              Paper-specific questions can be posted on the Zenodo record pages.
            </p>
          </Card>
        </div>

        {/* ─── Contact ─── */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-400" />
              <a href="mailto:carlos@mpfst.com" className="text-zinc-300 hover:text-amber-400 transition-colors">
                carlos@mpfst.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <a href="https://x.com/FreemanCW" target="_blank" rel="noopener noreferrer"
                className="text-zinc-300 hover:text-amber-400 transition-colors">
                @FreemanCW on X/Twitter
              </a>
            </div>
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <a href={`https://orcid.org/${STATS.orcid}`} target="_blank" rel="noopener noreferrer"
                className="text-zinc-300 hover:text-amber-400 transition-colors">
                ORCID: {STATS.orcid}
              </a>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Serious inquiries from researchers, experimentalists, and theorists are especially welcome.
            If you have data, a code, or a counterexample — I want to hear about it.
          </p>
        </div>

        {/* ─── AI assistant ─── */}
        <div className="mt-8 bg-[#12141a] border border-zinc-800/60 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-3">Ask Warren — AI Research Assistant</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Warren is an AI system with deep knowledge of all {STATS.papers} MPFST papers, the underlying
            mathematics, and the experimental evidence. You can ask it about specific predictions,
            request explanations, or discuss potential new domains.
          </p>
          <Link href="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors">
            <MessageSquare className="w-4 h-4" /> Talk to Warren
          </Link>
        </div>
      </div>
    </Layout>
  );
}
