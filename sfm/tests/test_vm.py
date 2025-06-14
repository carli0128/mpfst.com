import asyncio, os, pytest, subprocess, sys

@pytest.mark.asyncio
async def test_rilvm_echo():
    vm = os.getenv("RIL_VM_BIN", "./sfm/backend/brain/bin/rilvm")
    proc = await asyncio.create_subprocess_exec(
        vm, "--entropy=10",
        stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE)
    proc.stdin.write(b"ping\n"); await proc.stdin.drain()
    out = await proc.stdout.readline()
    assert out, "VM did not answer"
