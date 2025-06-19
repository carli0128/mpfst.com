"""
Thin wrapper around the rilvm binary that streams tokens.
"""

import subprocess
from pathlib import Path
from typing import Iterator

# path …/brain/bin/rilvm (added by Dockerfile)
RILVM_BIN: Path = Path(__file__).with_suffix("").parent / "bin" / "rilvm"

class LlamaRunner:
    def __init__(self, temperature: float = 0.7):
        self.temperature = temperature

    def stream(self, prompt: str) -> Iterator[str]:
        """
        Yields individual text chunks produced by rilvm.
        """
        cmd = [
            str(RILVM_BIN),
            "--model", "llama-2-7b-q4.bin",
            "--temp", str(self.temperature),
            "--prompt", prompt,
            "--stream",
        ]
        # Popen with line‑buffered stdout
        with subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True
        ) as proc:
            for line in proc.stdout or []:
                yield line