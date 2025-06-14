import { useState, useEffect, useRef } from "react";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [stream, setStream] = useState("");
  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (open && !ws.current) {
      ws.current = new WebSocket(
        process.env.NEXT_PUBLIC_CHAT_WS ?? "wss://sfm-backend.onrender.com/brain/ws/chat"
      );
      ws.current.onmessage = (e) => setStream((s) => s + e.data);
    }
  }, [open]);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setOpen((o) => !o)}
      >
        🧠 Chat
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-80 bg-neutral-900 text-white p-4 overflow-y-auto">
          <pre className="whitespace-pre-wrap">{stream}</pre>
          <ChatInput ws={ws} />
        </div>
      )}
    </>
  );
}

function ChatInput({ ws }: { ws: React.MutableRefObject<WebSocket | undefined> }) {
  const [msg, setMsg] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        ws.current?.send(msg);
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
