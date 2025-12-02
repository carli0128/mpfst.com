from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio, subprocess, os, json, time, uuid

router = APIRouter()

VM_BIN = os.getenv("RIL_VM_BIN", "/app/brain/bin/rilvm")
ENTROPY = int(os.getenv("RIL_ENTROPY_BUDGET", 30000))

async def spawn_vm():
    proc = await asyncio.create_subprocess_exec(
        VM_BIN,
        f"--entropy={ENTROPY}",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
    )
    return proc

@router.websocket("/ws/chat")
async def chat_ws(ws: WebSocket):
    await ws.accept()
    try:
        proc = await spawn_vm()
    except FileNotFoundError:
        await ws.send_json({"error":"vm_unavailable"})
        await ws.close()
        return
    try:
        while True:
            msg = await ws.receive_text()
            proc.stdin.write((msg + "\n").encode())
            await proc.stdin.drain()
            line = await proc.stdout.readuntil(b"\n")
            await ws.send_text(line.decode().rstrip())
    except WebSocketDisconnect:
        proc.kill()
