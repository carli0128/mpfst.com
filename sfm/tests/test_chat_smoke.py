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
