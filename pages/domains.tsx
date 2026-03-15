import React from "react";
import Layout from "@/components/Layout";
import { PAPERS, FIELDS, STATS, DOMAINS, zenodoUrl } from "@/components/data";
import { ExternalLink } from "lucide-react";

export default function DomainsPage() {
  return (
    <Layout title="Domains" description={`${STATS.domains} independent domains tested with α = 6/5 and zero free parameters`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
          {STATS.domains} Domains
        </h1>
        <p className="text-zinc-500 mb-12">
          Each domain was tested independently with α = 6/5 and zero adjustable parameters.
          The data in every case was published by other researchers before MPFST existed.
        </p>

        {/* ─── By field ─── */}
        <div className="space-y-10">
          {FIELDS.map(field => {
            const fieldPapers = PAPERS.filter(p => field.papers.includes(p.id));
            if (fieldPapers.length === 0) return null;
            return (
              <div key={field.name}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: field.color }} />
                  <h2 className="text-xl font-bold text-white">{field.name}</h2>
                  <span className="text-xs text-zinc-600">
                    {fieldPapers.length} paper{fieldPapers.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {fieldPapers.map(p => (
                    <a key={p.id} href={zenodoUrl(p.doi)} target="_blank" rel="noopener noreferrer"
                      className="group bg-[#12141a] border border-zinc-800/60 rounded-xl p-5 hover:border-amber-500/30 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-mono text-zinc-600">Paper {p.id}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-700 group-hover:text-amber-400 transition-colors" />
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-2">{p.shortTitle}</h3>
                      <p className="text-xs text-amber-400/80 font-mono mb-3">{p.keyResult}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.domains.map(d => (
                          <span key={d} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                            {d}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-[10px] text-zinc-600">Data: {p.dataSource}</div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Full list ─── */}
        <div className="mt-16 bg-[#12141a] border border-zinc-800/60 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Complete Domain List</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {DOMAINS.map((d, i) => (
              <div key={i} className="flex items-start gap-2 py-1">
                <span className="text-amber-500/60 text-xs font-mono w-5 flex-shrink-0 mt-0.5">{i + 1}.</span>
                <span className="text-sm text-zinc-400">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
