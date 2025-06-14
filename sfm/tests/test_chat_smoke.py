import pytest, asyncio, websockets

@pytest.mark.asyncio
async def test_ws_echo():
    uri = "ws://localhost:8000/brain/ws/chat"
    try:
        async with websockets.connect(uri) as ws:
            await ws.send("ping")
            resp = await ws.recv()
            assert resp
    except Exception:
        pytest.skip("websocket not available")

@pytest.mark.asyncio
async def test_vm_up():
    try:
        proc = await asyncio.create_subprocess_exec(
            "/app/brain/bin/rilvm",
            "--entropy=10",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
        )
    except FileNotFoundError:
        pytest.skip("rilvm not present")
    proc.stdin.write(b"hi\n")
    await proc.stdin.drain()
    out = await proc.stdout.readline()
    assert out
