import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PAPERS, PRL, FIELDS, STATS, zenodoUrl } from "@/components/data";
import { ExternalLink, Search, SortAsc, SortDesc } from "lucide-react";

type SortKey = "id" | "field" | "shortTitle";

export default function Papers() {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let list = [...PAPERS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortTitle.toLowerCase().includes(q) ||
        p.keyResult.toLowerCase().includes(q) ||
        p.field.toLowerCase().includes(q) ||
        p.domains.some(d => d.toLowerCase().includes(q))
      );
    }
    if (fieldFilter !== "all") {
      list = list.filter(p => p.field === fieldFilter);
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "id") cmp = a.id - b.id;
      else if (sortKey === "field") cmp = a.field.localeCompare(b.field);
      else cmp = a.shortTitle.localeCompare(b.shortTitle);
      return sortDir === "desc" ? -cmp : cmp;
    });
    return list;
  }, [search, fieldFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    sortKey === k
      ? (sortDir === "asc" ? <SortAsc className="w-3.5 h-3.5" /> : <SortDesc className="w-3.5 h-3.5" />)
      : <SortAsc className="w-3.5 h-3.5 opacity-30" />
  );

  const uniqueFields = [...new Set(PAPERS.map(p => p.field))].sort();

  return (
    <Layout title="Papers" description={`All ${STATS.papers} MPFST papers with DOIs, key results, and links`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
          {STATS.papers} Papers + PRL Letter
        </h1>
        <p className="text-zinc-500 mb-8">
          All open-access on Zenodo with complete source code
        </p>

        {/* ─── PRL Letter (featured) ─── */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">FLAGSHIP</span>
                <span className="text-xs text-zinc-500">PRL Accession: {PRL.accession}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{PRL.title}</h3>
              <p className="text-sm text-zinc-400">{PRL.subtitle}</p>
              <div className="mt-2 text-xs text-zinc-600">Status: {PRL.status}</div>
            </div>
            <a href={zenodoUrl(PRL.doi)} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 ml-4 p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ─── Filters ─── */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text" placeholder="Search papers..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#12141a] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <select
            value={fieldFilter} onChange={e => setFieldFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#12141a] border border-zinc-800 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
          >
            <option value="all">All fields ({PAPERS.length})</option>
            {uniqueFields.map(f => (
              <option key={f} value={f}>{f} ({PAPERS.filter(p => p.field === f).length})</option>
            ))}
          </select>
        </div>

        {/* ─── Table ─── */}
        <div className="bg-[#12141a] border border-zinc-800/60 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[50px_1fr_140px_1fr_50px] gap-4 px-5 py-3 border-b border-zinc-800/60 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <button onClick={() => toggleSort("id")} className="flex items-center gap-1 hover:text-white transition-colors">
              # <SortIcon k="id" />
            </button>
            <button onClick={() => toggleSort("shortTitle")} className="flex items-center gap-1 hover:text-white transition-colors text-left">
              Title <SortIcon k="shortTitle" />
            </button>
            <button onClick={() => toggleSort("field")} className="flex items-center gap-1 hover:text-white transition-colors text-left">
              Field <SortIcon k="field" />
            </button>
            <div>Key Result</div>
            <div className="text-center">PDF</div>
          </div>

          {/* Rows */}
          {filtered.map(p => (
            <div key={p.id}
              className="grid grid-cols-[50px_1fr_140px_1fr_50px] gap-4 px-5 py-3.5 border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors items-start text-sm">
              <span className="font-mono text-zinc-600">{p.id}</span>
              <div>
                <div className="font-medium text-white">{p.shortTitle}</div>
                <div className="text-xs text-zinc-600 mt-0.5 font-mono">{p.doi}</div>
              </div>
              <div>
                <span className="text-xs px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: (FIELDS.find(f => f.name === p.field)?.color || "#666") + "40",
                    color: FIELDS.find(f => f.name === p.field)?.color || "#999",
                  }}>
                  {p.field}
                </span>
              </div>
              <div className="text-xs text-zinc-400 leading-relaxed font-mono">{p.keyResult}</div>
              <div className="text-center">
                <a href={zenodoUrl(p.doi)} target="_blank" rel="noopener noreferrer"
                  className="inline-flex p-1.5 rounded-lg text-zinc-600 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-zinc-600 text-sm">
              No papers match your search.
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-zinc-600">
          Showing {filtered.length} of {PAPERS.length} papers · All available on{" "}
          <a href="https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Freeman%2C%20Carlos%20W.%22"
            target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400">
            Zenodo
          </a>
        </div>
      </div>
    </Layout>
  );
}
