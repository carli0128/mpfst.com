import { useState, useEffect, useRef } from "react";

type Turn = { role: "user" | "bot"; text: string };

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const ws = useRef<WebSocket>();

  /* singleton socket */
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(
        process.env.NEXT_PUBLIC_CHAT_WS ??
          `${window.location.origin.replace(/^http/, "ws")}/brain/ws/chat`
      );
      ws.current.onmessage = (e) => {
        try {
          const { role, text } = JSON.parse(e.data);
          setTurns((t) => [...t, { role, text }]);
        } catch (err) {
          console.error("invalid ws message", err);
        }
      };
    }
  }, []);

  const send = (msg: string) => {
    ws.current?.send(JSON.stringify({ prompt: msg }));
    setTurns((t) => [...t, { role: "user", text: msg }]);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOpen((o) => !o)}
      >
        🧠 Chat
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
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem("msg") as HTMLInputElement;
              if (input.value.trim()) send(input.value.trim());
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
