import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface FeedbackState {
  messageIndex: number | null;
  type: "up" | "down" | null;
  comment: string;
  submitted: boolean;
}

const MPFST_CHAT_API = "/api/chat";
const MPFST_FEEDBACK_API = "/api/feedback";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    messageIndex: null,
    type: null,
    comment: "",
    submitted: false,
  });
  const [sessionId] = useState(() => `mpfst_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(MPFST_CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response || "I couldn't generate a response. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Connection error: ${errorMessage}. Please try again.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (msgIdx: number, type: "up" | "down", comment?: string) => {
    try {
      await fetch(MPFST_FEEDBACK_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message_index: msgIdx,
          user_message: messages[msgIdx - 1]?.content || "",
          assistant_message: messages[msgIdx]?.content || "",
          feedback_type: type,
          comment: comment || "",
          timestamp: new Date().toISOString(),
        }),
      });
      setFeedback({ messageIndex: msgIdx, type, comment: comment || "", submitted: true });
      setTimeout(() => setFeedback({ messageIndex: null, type: null, comment: "", submitted: false }), 2000);
    } catch {
      // Silent fail on feedback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What is the coupled PDE framework?",
    "How does α=1.2 connect brains to galaxies?",
    "What are the 13 published papers about?",
    "How does this framework resolve the MiniBooNE anomaly?",
    "What is the Tree of Life network topology?",
    "How does General Relativity emerge as a limit?",
  ];

  return (
    <>
      <Head>
        <title>Ask About MPFST — AI Research Assistant</title>
        <meta
          name="description"
          content="Ask questions about Multi-Plane Field Syntergic Theory, the coupled PDE framework, and published research across 18 domains."
        />
      </Head>

      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-amber-500 font-bold text-lg">MPFST</span>
              <span className="text-zinc-500 text-sm">← Back to main</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-zinc-500">AI Research Assistant</span>
            </div>
          </div>
        </header>

        {/* Chat area */}
        <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-zinc-100 mb-2">
                  Ask About MPFST
                </h1>
                <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                  I can answer questions about Multi-Plane Field Syntergic Theory, the coupled PDE
                  framework, published papers, experimental predictions, and the mathematics behind
                  the theory. Ask me anything.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                      className="text-left px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/50 
                                 hover:border-amber-500/50 hover:bg-zinc-900 transition-all text-sm text-zinc-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <p className="text-zinc-600 text-xs mt-8">
                  Powered by Claude Sonnet · Restricted to MPFST topics only
                </p>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-amber-600/20 border border-amber-500/30 text-zinc-100"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-200"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-amber-500/70">
                      <span>MPFST Assistant</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>

                  {/* Feedback buttons for assistant messages */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-zinc-800/50">
                      {feedback.messageIndex === i && feedback.submitted ? (
                        <span className="text-xs text-emerald-500">Thanks for your feedback!</span>
                      ) : (
                        <>
                          <button
                            onClick={() => submitFeedback(i, "up")}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              feedback.messageIndex === i && feedback.type === "up"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800"
                            }`}
                            title="Helpful"
                          >
                            👍
                          </button>
                          <button
                            onClick={() => {
                              if (feedback.messageIndex === i && feedback.type === "down") {
                                setFeedback({ messageIndex: null, type: null, comment: "", submitted: false });
                              } else {
                                setFeedback({ messageIndex: i, type: "down", comment: "", submitted: false });
                              }
                            }}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              feedback.messageIndex === i && feedback.type === "down"
                                ? "bg-red-500/20 text-red-400"
                                : "text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                            }`}
                            title="Not helpful"
                          >
                            👎
                          </button>
                          {feedback.messageIndex === i && feedback.type === "down" && (
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                placeholder="What was wrong? (optional)"
                                className="flex-1 text-xs bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-zinc-300 
                                           placeholder-zinc-600 focus:outline-none focus:border-amber-500/50"
                                value={feedback.comment}
                                onChange={(e) => setFeedback((f) => ({ ...f, comment: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    submitFeedback(i, "down", feedback.comment);
                                  }
                                }}
                              />
                              <button
                                onClick={() => submitFeedback(i, "down", feedback.comment)}
                                className="text-xs px-2 py-1 bg-amber-600/20 text-amber-400 rounded hover:bg-amber-600/30"
                              >
                                Send
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-amber-500/70 mb-2">
                    <span>MPFST Assistant</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm p-4">
            <div className="max-w-4xl mx-auto flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about MPFST, the coupled PDE framework, publications, or predictions..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 
                           placeholder-zinc-500 resize-none focus:outline-none focus:border-amber-500/50 
                           focus:ring-1 focus:ring-amber-500/20 min-h-[48px] max-h-[120px]"
                rows={1}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-5 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-600 
                           text-zinc-950 font-semibold rounded-xl transition-colors text-sm"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
            <p className="text-center text-zinc-600 text-xs mt-2">
              This assistant only discusses MPFST-related topics. Responses are AI-generated and may contain errors.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
