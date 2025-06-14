import { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";

type Turn = { role: "user" | "bot"; text: string };

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (!ws.current) {
      const url =
        process.env.NEXT_PUBLIC_CHAT_WS ??
        `${window.location.origin.replace(/^http/, "ws")}/brain/ws/chat`;
      ws.current = new WebSocket(url);
      ws.current.onmessage = (e) =>
        setTurns((t) => [...t, { role: "bot", text: e.data }]);
    }
  }, []);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOpen((o) => !o)}
      >
        🧠 Chat
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-80 bg-neutral-900 text-white p-4 overflow-y-auto flex flex-col gap-2 chat-scroll">
          <div className="flex flex-col gap-2">
            {turns.map((t, i) => (
              <div
                key={i}
                className={
                  t.role === "user" ? "text-right text-blue-300" : "text-left"
                }
              >
                {t.text}
              </div>
            ))}
          </div>
          <ChatInput ws={ws} setTurns={setTurns} />
        </div>
      )}
    </>
  );
}

function ChatInput({
  ws,
  setTurns,
}: {
  ws: React.MutableRefObject<WebSocket | undefined>;
  setTurns: React.Dispatch<React.SetStateAction<Turn[]>>;
}) {
  const [msg, setMsg] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        ws.current?.send(msg);
        setTurns((t) => [...t, { role: "user", text: msg }]);
        setMsg("");
      }}
    >
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="w-full bg-neutral-800 p-2 mt-2"
      />
    </form>
  );
}
