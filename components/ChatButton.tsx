// components/ChatButton.tsx
import { useState, useEffect, useRef } from "react";

type Turn = { role: "user" | "bot"; text: string };

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);

  // 1) Open the SSE connection once on mount to receive bot tokens
  useEffect(() => {
    // Must set NEXT_PUBLIC_CHAT_SSE in Render to https://<BACKEND>/chat
    const sseUrl = process.env.NEXT_PUBLIC_CHAT_SSE!;
    const source = new EventSource(sseUrl);

    source.onmessage = (e: MessageEvent) => {
      // Each "e.data" is one token or chunk from the server
      setTurns((t) => [...t, { role: "bot", text: e.data }]);
    };

    source.onerror = () => {
      console.warn("Chat SSE connection closed");
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  // 2) Sending is now a simple POST to /chat
  const send = async (msg: string) => {
    // Show user's message immediately
    setTurns((t) => [...t, { role: "user", text: msg }]);

    // POST the prompt JSON to the same endpoint
    try {
      await fetch(process.env.NEXT_PUBLIC_CHAT_SSE!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msg }),
      });
    } catch (err) {
      console.error("Failed to send prompt:", err);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOpen((o) => !o)}
      >
        <span role="text">🧠 Chat</span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-neutral-900 text-white p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {turns.map((t, i) => (
              <div
                key={i}
                className={
                  t.role === "user"
                    ? "text-right text-blue-300"
                    : "text-left text-green-300"
                }
              >
                {t.text}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem(
                "msg"
              ) as HTMLInputElement);
              const v = input.value.trim();
              if (v) send(v);
              input.value = "";
            }}
          >
            <input
              name="msg"
              placeholder="Type…"
              className="w-full bg-neutral-800 p-2"
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </>
  );
}
