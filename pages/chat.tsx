import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { STATS } from "@/components/data";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply || data.error || "No response." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Ask Warren" description="AI research assistant with deep knowledge of all MPFST papers">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
        <div className="mb-4">
          <h1 className="text-2xl font-black text-white tracking-tight">Ask Warren</h1>
          <p className="text-sm text-zinc-500">
            AI research assistant · Knows all {STATS.papers} papers, the mathematics, data sources, and code
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-0">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <Bot className="w-10 h-10 text-amber-500/30 mx-auto mb-4" />
              <p className="text-zinc-600 text-sm mb-6">Ask about any MPFST paper, prediction, or domain.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "What is α = 6/5?",
                  "Explain the fusion plasma results",
                  "How do I reproduce Paper 9?",
                  "What would disprove MPFST?",
                ].map(q => (
                  <button key={q} onClick={() => { setInput(q); }}
                    className="px-3 py-1.5 text-xs text-zinc-400 bg-zinc-800/50 border border-zinc-800 rounded-lg hover:border-amber-500/30 hover:text-white transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center mt-1">
                  <Bot className="w-4 h-4 text-amber-400" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-amber-500 text-black"
                  : "bg-[#12141a] border border-zinc-800/60 text-zinc-300"
              }`}>
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
              {m.role === "user" && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center mt-1">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center mt-1">
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-xl bg-[#12141a] border border-zinc-800/60 text-sm text-zinc-500">
                Thinking...
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 pt-4 border-t border-zinc-800/60">
          <div className="flex gap-2">
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about MPFST..."
              className="flex-1 px-4 py-3 bg-[#12141a] border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50"
            />
            <button onClick={send} disabled={loading || !input.trim()}
              className="px-4 py-3 bg-amber-500 text-black rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
