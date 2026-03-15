import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { STATS } from "./data";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/overview", label: "What is MPFST?" },
  { href: "/papers", label: "Papers" },
  { href: "/domains", label: "Domains" },
  { href: "/experimentalists", label: "For Scientists" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/chat", label: "Ask Warren" },
];

export default function Layout({ title, description, children }: {
  title?: string; description?: string; children: React.ReactNode;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const pageTitle = title ? `${title} — MPFST` : "MPFST — Multi-Plane Field Syntergic Theory";
  const desc = description || `${STATS.papers} papers, ${STATS.domains} domains, ${STATS.parameters} parameter. A unified theory of physics built on fractional dynamics and Kabbalistic topology.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FreemanCW" />
      </Head>

      <div className="min-h-screen bg-[#0a0b0f] text-zinc-100">
        {/* ─── Top bar ─── */}
        <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#0a0b0f]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xs font-black text-black">
                  α
                </div>
                <span className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  MPFST
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV.map(n => (
                  <Link key={n.href} href={n.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      router.pathname === n.href
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}>
                    {n.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile hamburger */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-zinc-800/60 bg-[#0a0b0f]/95 backdrop-blur-md">
              <div className="px-4 py-3 space-y-1">
                {NAV.map(n => (
                  <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                      router.pathname === n.href
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-zinc-400 hover:text-white"
                    }`}>
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ─── Content ─── */}
        <main>{children}</main>

        {/* ─── Footer ─── */}
        <footer className="border-t border-zinc-800/40 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-[10px] font-black text-black">α</div>
                  <span className="font-bold text-white">MPFST</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Multi-Plane Field Syntergic Theory<br />
                  {STATS.papers} papers · {STATS.domains} domains · {STATS.parameters} parameter
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-3">Author</h4>
                <p className="text-sm text-zinc-500">
                  {STATS.author}<br />
                  <a href={`https://orcid.org/${STATS.orcid}`} target="_blank" rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400">
                    ORCID: {STATS.orcid}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-3">Links</h4>
                <div className="space-y-1">
                  <a href="https://x.com/FreemanCW" target="_blank" rel="noopener noreferrer"
                    className="block text-sm text-zinc-500 hover:text-amber-400">@FreemanCW on X</a>
                  <a href={`https://orcid.org/${STATS.orcid}`} target="_blank" rel="noopener noreferrer"
                    className="block text-sm text-zinc-500 hover:text-amber-400">ORCID Profile</a>
                  <a href="https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Freeman%2C%20Carlos%20W.%22" target="_blank" rel="noopener noreferrer"
                    className="block text-sm text-zinc-500 hover:text-amber-400">All Papers on Zenodo</a>
                </div>
              </div>
            </div>
            <div className="border-t border-zinc-800/40 mt-8 pt-6 text-center text-xs text-zinc-600">
              © {new Date().getFullYear()} Carlos W. Freeman · All rights reserved
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
