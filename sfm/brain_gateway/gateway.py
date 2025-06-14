from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio, subprocess, os, json, time, uuid

router = APIRouter()

VM_BIN = os.getenv("RIL_VM_BIN", "/app/brain/rilvm")
ENTROPY = int(os.getenv("RIL_ENTROPY_BUDGET", 30000))

async def spawn_vm():
    try:
        proc = await asyncio.create_subprocess_exec(
            VM_BIN,
            f"--entropy={ENTROPY}",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
        )
    except FileNotFoundError:
        return None
    return proc

@router.websocket("/ws/chat")
async def chat_ws(ws: WebSocket):
    await ws.accept()
    proc = await spawn_vm()
    if proc is None:
        await ws.send_text(json.dumps({"error": "VM unavailable"}))
        await ws.close()
        return
    try:
        while True:
            msg = await ws.receive_text()
            proc.stdin.write((msg + "\n").encode())
            await proc.stdin.drain()
            try:
                line = await proc.stdout.readuntil(b"\n")
            except asyncio.IncompleteReadError as e:
                line = e.partial
            if line:
                await ws.send_text(line.decode())
    except WebSocketDisconnect:
        proc.kill()
