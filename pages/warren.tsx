import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";

// ── Types ────────────────────────────────────────────────────────
interface GpuData { name: string; memUsed: number; memTotal: number; util: number; temp: number; }
interface SystemData { loadavg: number[]; mem: { total: number; used: number; free: number }; disk: { size: string; used: string; avail: string; pct: string }; uptime: string; }
interface Screen { name: string; status: string; }
interface OpenClawData { running: boolean; pid: string | null; port: number; mode: string; model: string; fallback: string; voiceModel: string; channels: string[]; }
interface R1Data { online: boolean; model: string | null; }
interface MemoryData { total_memories?: number; collections?: Record<string, number>; }
interface MarketCrypto { price: number; change_24h?: number; }
interface MarketStock { price: number; change_pct?: number; }
interface DashData {
  timestamp: string; system: SystemData; gpu: GpuData | null; screens: Screen[];
  openclaw: OpenClawData; r1: R1Data; memory: MemoryData | null;
  market: { crypto?: Record<string, MarketCrypto>; stocks?: Record<string, MarketStock> } | null;
  botLogs: Record<string, string[]>; tunnelUrl: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────
const Pill = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${ok ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${ok ? "bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.5)]" : "bg-red-400 shadow-[0_0_6px_rgba(239,68,68,.5)] animate-pulse"}`} />
    {children}
  </span>
);

const Row = ({ label, value, extra }: { label: string; value: React.ReactNode; extra?: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
    <span className="text-xs font-semibold text-zinc-500 min-w-[100px]">{label}</span>
    <span className="text-xs font-mono text-zinc-400 flex-1 text-right">{value}</span>
    {extra && <span className="ml-2">{extra}</span>}
  </div>
);

const Card = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
  <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
      <span>{icon}</span>{title}
    </div>
    {children}
  </div>
);

const StatCard = ({ value, label, color = "text-amber-400" }: { value: string; label: string; color?: string }) => (
  <div className="text-center p-4 bg-[#181b22] border border-zinc-800 rounded-lg">
    <div className={`text-2xl font-bold tracking-tight ${color}`}>{value}</div>
    <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{label}</div>
  </div>
);

// ── Password Gate ────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const check = () => {
    if (pw === "warren2026quest") { onUnlock(); localStorage.setItem("warren_auth", "1"); }
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 flex items-center justify-center">
      <div className="bg-[#181b22] border border-zinc-800 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
        <div className="text-4xl">🤑</div>
        <h2 className="text-xl font-bold text-white tracking-tight">Warren Command Center</h2>
        <p className="text-sm text-zinc-500">Authorized access only</p>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && check()}
          placeholder="Enter password"
          className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border ${err ? "border-red-500 shake" : "border-zinc-700"} text-white text-sm focus:outline-none focus:border-amber-500 transition-colors`}
          autoFocus
        />
        <button onClick={check}
          className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors">
          Unlock
        </button>
        <style jsx>{`.shake { animation: shake .3s ease-in-out; } @keyframes shake { 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }`}</style>
      </div>
    </div>
  );
}

// ── Dashboard Tabs ───────────────────────────────────────────────
function TabBar({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const tabs = [
    { id: "warren", label: "🤑 Warren Dashboard", },
    { id: "control", label: "⚙️ OpenClaw Control", },
  ];
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${tab === t.id ? "bg-amber-500/15 border-amber-500/40 text-amber-400" : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── OpenClaw Control (iframe to gateway) ─────────────────────────
function OpenClawControl() {
  const [apiUrl, setApiUrl] = useState("");
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");

  return (
    <div className="space-y-4">
      <Card title="Gateway Connection" icon="🔌">
        <p className="text-xs text-zinc-500 mb-3">Connect to your OpenClaw gateway to access the control panel. The gateway runs on your pod at port 18789.</p>
        <div className="flex gap-2">
          <input value={apiUrl} onChange={e => setApiUrl(e.target.value)}
            placeholder="https://your-tunnel.trycloudflare.com"
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500" />
          <input value={token} onChange={e => setToken(e.target.value)}
            placeholder="Gateway token" type="password"
            className="w-48 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500" />
          <button onClick={() => { if (apiUrl) setConnected(true); }}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs">
            Connect
          </button>
        </div>
      </Card>
      {connected && (
        <div className="bg-[#181b22] border border-zinc-800 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 280px)" }}>
          <iframe src={apiUrl} className="w-full h-full border-0" allow="clipboard-read; clipboard-write" />
        </div>
      )}
      {!connected && (
        <div className="text-center py-20 text-zinc-600">
          <div className="text-4xl mb-4">⚙️</div>
          <p className="text-sm">Enter your Cloudflare tunnel URL and gateway token to access the OpenClaw control panel</p>
        </div>
      )}
    </div>
  );
}

// ── Warren Dashboard ─────────────────────────────────────────────
function WarrenDashboard() {
  const [data, setData] = useState<DashData | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchData = useCallback(async () => {
    if (!apiUrl) return;
    try {
      const res = await fetch(apiUrl + "/api/data");
      const d = await res.json();
      setData(d);
      setLastUpdate(new Date().toLocaleTimeString());
      setError("");
      setConnected(true);
    } catch (e) {
      setError("Connection failed");
    }
  }, [apiUrl]);

  useEffect(() => {
    if (!connected) return;
    fetchData();
    const iv = setInterval(fetchData, 15000);
    return () => clearInterval(iv);
  }, [connected, fetchData]);

  if (!connected) {
    return (
      <div className="space-y-4">
        <Card title="Connect to Warren" icon="🤑">
          <p className="text-xs text-zinc-500 mb-3">Enter the Cloudflare tunnel URL for your Warren dashboard (port 8889).</p>
          <div className="flex gap-2">
            <input value={apiUrl} onChange={e => setApiUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && apiUrl && (setConnected(true), fetchData())}
              placeholder="https://your-dashboard-tunnel.trycloudflare.com"
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500" />
            <button onClick={() => { if (apiUrl) { setConnected(true); fetchData(); } }}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs">
              Connect
            </button>
          </div>
        </Card>
        <div className="text-center py-20 text-zinc-600">
          <div className="text-4xl mb-4">🤑</div>
          <p className="text-sm">Connect to your pod to see live Warren telemetry</p>
        </div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20 text-zinc-500">Loading data...</div>;

  const oc = data.openclaw;
  const gpu = data.gpu;
  const sys = data.system;
  const screens = data.screens || [];
  const activeNames = screens.map(s => s.name);

  const expectedScreens = ["openclaw","options","reversal","cryptospike","kalshi","llama","dashboard","memory","trade_ingest","tunnel","cftunnel","hud","bore","newspipe","marketdata","cfvoice","whisper","tailscale"];

  const bots = [
    { name: "Options Spike v2.0", icon: "🔮", screen: "options", capital: "$1,235", schedule: "Mon 9:30 AM" },
    { name: "Options Reversal v1.0", icon: "🔄", screen: "reversal", capital: "$1,235", schedule: "Mon 9:30 AM" },
    { name: "Crypto Spike v1.0", icon: "🪙", screen: "cryptospike", capital: "$4,037", schedule: "24/7" },
    { name: "Kalshi Events", icon: "🎯", screen: "kalshi", capital: "$219", schedule: "15 positions" },
  ];

  const cryptoSyms = ["BTC-USD","ETH-USD","SOL-USD","XRP-USD","DOGE-USD"];
  const stockSyms = ["SPY","QQQ","NVDA","TSLA","AAPL"];

  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Pill ok={oc.running}>{oc.running ? "Gateway Online" : "Gateway Down"}</Pill>
          <Pill ok={data.r1?.online || false}>{data.r1?.online ? "R1 Fallback Ready" : "R1 Down"}</Pill>
          {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
        <span className="text-[10px] text-zinc-600">Updated {lastUpdate} • Auto-refresh 15s</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value="Opus" label="Primary Model" />
        <StatCard value={gpu ? `${((gpu.memUsed/gpu.memTotal)*100).toFixed(0)}%` : "—"} label="GPU VRAM" color={gpu && (gpu.memUsed/gpu.memTotal) > 0.9 ? "text-red-400" : "text-green-400"} />
        <StatCard value={String(screens.length)} label="Screen Sessions" color={screens.length >= 20 ? "text-green-400" : "text-amber-400"} />
        <StatCard value={sys?.disk?.pct || "—"} label="Disk Used" color={parseInt(sys?.disk?.pct || "0") > 90 ? "text-red-400" : "text-green-400"} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Gateway */}
        <Card title="Gateway Status" icon="⚡">
          <Row label="PID" value={oc.pid || "—"} />
          <Row label="Port" value={oc.port} />
          <Row label="Primary" value={oc.model} />
          <Row label="Fallback" value={oc.fallback} extra={<Pill ok={data.r1?.online || false}>{data.r1?.online ? "Online" : "Down"}</Pill>} />
          <Row label="Voice" value={oc.voiceModel} />
          <Row label="Channels" value={(oc.channels || []).join(", ")} />
        </Card>

        {/* System */}
        <Card title="System" icon="🖥️">
          {gpu && <>
            <Row label="GPU" value={gpu.name} />
            <Row label="VRAM" value={`${gpu.memUsed} / ${gpu.memTotal} MB`} />
            <Row label="GPU Util" value={`${gpu.util}%`} />
            <Row label="Temp" value={`${gpu.temp}°C`} />
          </>}
          <Row label="RAM" value={`${sys?.mem?.used} / ${sys?.mem?.total} MB`} />
          <Row label="Load" value={(sys?.loadavg || []).join(", ")} />
          <Row label="Disk" value={`${sys?.disk?.used} / ${sys?.disk?.size}`} />
          <Row label="Uptime" value={sys?.uptime || "—"} />
        </Card>

        {/* Connections */}
        <Card title="Network Connections" icon="🔒">
          <Row label="Anthropic" value="160.79.104.10:443" extra={<Pill ok={true}>Direct</Pill>} />
          <Row label="Telegram" value="149.154.166.110:443" extra={<Pill ok={true}>Connected</Pill>} />
          <Row label="R1 70B" value="localhost:11435 → USA Pod" extra={<Pill ok={data.r1?.online || false}>{data.r1?.online ? "Tunnel Up" : "Down"}</Pill>} />
          <Row label="OpenClaw.ai" value="—" extra={<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30 text-green-400">🔒 Severed</span>} />
        </Card>

        {/* Data Flow */}
        <Card title="Data Flow" icon="🏗️">
          <div className="font-mono text-[11px] leading-relaxed text-zinc-500 space-y-1">
            <p><span className="text-amber-400 font-semibold">📞 Phone</span> → Twilio → CF Tunnel → voice-call → <span className="text-green-400">Warren (Sonnet)</span></p>
            <p><span className="text-amber-400 font-semibold">💬 Telegram</span> → Telegram API → <span className="text-green-400">Warren (Opus)</span></p>
            <p><span className="text-amber-400 font-semibold">🥽 Quest</span> → HTTP API :18789 → <span className="text-green-400">Warren</span></p>
            <p><span className="text-amber-400 font-semibold">🔌 Any Device</span> → HTTP API → <span className="text-green-400">Warren</span></p>
            <p className="pt-2 border-t border-white/5"><span className="text-zinc-600">Fallback:</span> Anthropic fails → <span className="text-amber-400">R1 70B (USA Pod)</span></p>
            <p className="text-zinc-600">No external routing. Your pod → Anthropic. Direct.</p>
          </div>
        </Card>

        {/* Trading Bots */}
        <Card title="Trading Engines" icon="📈">
          {bots.map(b => (
            <div key={b.name} className="flex items-center gap-2 py-2.5 border-b border-white/5 last:border-0">
              <span>{b.icon}</span>
              <span className="font-semibold text-sm text-white flex-1">{b.name}</span>
              <span className="text-xs font-mono text-zinc-500">{b.capital}</span>
              <Pill ok={activeNames.includes(b.screen)}>{activeNames.includes(b.screen) ? b.schedule : "Down"}</Pill>
            </div>
          ))}
        </Card>

        {/* Memory */}
        <Card title="Memory System" icon="🧠">
          {data.memory ? <>
            <Row label="Total Memories" value={data.memory.total_memories || "—"} />
            {data.memory.collections && Object.entries(data.memory.collections).map(([k, v]) => (
              <Row key={k} label={k} value={v} />
            ))}
            <Row label="Status" value="" extra={<Pill ok={true}>ChromaDB Online</Pill>} />
          </> : <p className="text-xs text-zinc-600">Memory server offline</p>}
        </Card>

        {/* Screens */}
        <Card title="Screen Sessions" icon="🖥️">
          <div className="flex flex-wrap gap-1.5">
            {expectedScreens.map(name => (
              <span key={name} className={`font-mono text-[10px] px-2 py-1 rounded-full border ${activeNames.includes(name) ? "border-green-500/30 text-green-400 bg-green-500/10" : "border-red-500/30 text-red-400 bg-red-500/10"}`}>
                {name}
              </span>
            ))}
            {screens.filter(s => !expectedScreens.includes(s.name)).map(s => (
              <span key={s.name} className="font-mono text-[10px] px-2 py-1 rounded-full border border-green-500/30 text-green-400 bg-green-500/10">
                {s.name}
              </span>
            ))}
          </div>
        </Card>

        {/* Market */}
        <Card title="Market Snapshot" icon="💰">
          {data.market?.crypto && <>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">Crypto</div>
            <div className="grid grid-cols-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
              <span>Asset</span><span className="text-right">Price</span><span className="text-right">24h</span>
            </div>
            {cryptoSyms.filter(s => data.market?.crypto?.[s]).map(sym => {
              const c = data.market!.crypto![sym];
              const chg = c.change_24h || 0;
              return (
                <div key={sym} className="grid grid-cols-3 text-xs py-1 border-b border-white/5">
                  <span className="text-zinc-300">{sym.replace("-USD","")}</span>
                  <span className="text-right font-mono text-zinc-400">${c.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className={`text-right font-mono ${chg >= 0 ? "text-green-400" : "text-red-400"}`}>{chg >= 0 ? "+" : ""}{chg.toFixed(2)}%</span>
                </div>
              );
            })}
          </>}
          {data.market?.stocks && <>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 mt-3">Stocks</div>
            {stockSyms.filter(s => data.market?.stocks?.[s]).map(sym => {
              const s = data.market!.stocks![sym];
              const chg = s.change_pct || 0;
              return (
                <div key={sym} className="grid grid-cols-3 text-xs py-1 border-b border-white/5">
                  <span className="text-zinc-300">{sym}</span>
                  <span className="text-right font-mono text-zinc-400">${s.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className={`text-right font-mono ${chg >= 0 ? "text-green-400" : "text-red-400"}`}>{chg >= 0 ? "+" : ""}{chg.toFixed(2)}%</span>
                </div>
              );
            })}
          </>}
          {!data.market?.crypto && !data.market?.stocks && <p className="text-xs text-zinc-600">Market data loading...</p>}
        </Card>
      </div>

      {/* Logs */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Options Spike Log" icon="🔮">
          <pre className="font-mono text-[10px] leading-relaxed text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 max-h-40 overflow-y-auto whitespace-pre-wrap break-all">
            {(data.botLogs?.options_spike || ["No logs"]).join("\n")}
          </pre>
        </Card>
        <Card title="Crypto Spike Log" icon="🪙">
          <pre className="font-mono text-[10px] leading-relaxed text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 max-h-40 overflow-y-auto whitespace-pre-wrap break-all">
            {(data.botLogs?.crypto_spike || ["No logs"]).join("\n")}
          </pre>
        </Card>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export default function WarrenPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("warren");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("warren_auth") === "1") setAuthed(true);
  }, []);

  if (!authed) return (
    <>
      <Head><title>Warren Command Center</title></Head>
      <PasswordGate onUnlock={() => setAuthed(true)} />
    </>
  );

  return (
    <>
      <Head><title>Warren Command Center</title></Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
        <div className="max-w-[1400px] mx-auto px-5 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤑</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  <span className="text-amber-400">Warren</span> Command Center
                </h1>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Autonomous Trading &amp; AI Operations</p>
              </div>
            </div>
            <button onClick={() => { localStorage.removeItem("warren_auth"); setAuthed(false); }}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Lock 🔒
            </button>
          </div>

          <TabBar tab={tab} setTab={setTab} />

          {tab === "warren" && <WarrenDashboard />}
          {tab === "control" && <OpenClawControl />}
        </div>
      </div>
    </>
  );
}
