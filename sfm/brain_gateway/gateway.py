from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio, subprocess, os, json, time, uuid

router = APIRouter()

VM_BIN = os.getenv("RIL_VM_BIN", "/app/brain/rilvm")
ENTROPY = int(os.getenv("RIL_ENTROPY_BUDGET", 30000))

async def spawn_vm():
    proc = await asyncio.create_subprocess_exec(
        VM_BIN, f"--entropy={ENTROPY}",
        stdin=subprocess.PIPE, stdout=subprocess.PIPE
    )
    return proc

@router.websocket("/ws/chat")
async def chat_ws(ws: WebSocket):
    await ws.accept()
    proc = await spawn_vm()
    try:
        while True:
            msg = await ws.receive_text()
            proc.stdin.write((msg + "\n").encode())
            await proc.stdin.drain()
            partial = b""
            while not partial.endswith(b"\n"):
                chunk = await proc.stdout.read(1)
                if not chunk:
                    break
                partial += chunk
            if partial:
                await ws.send_text(partial.decode())
    except WebSocketDisconnect:
        proc.kill()
