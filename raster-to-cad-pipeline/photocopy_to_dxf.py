#!/usr/bin/env python3
"""Convert scanned images or PDFs into a traced DXF file.

This is a "photocopy" style conversion: raster in, vector outlines out.
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

import cv2
import ezdxf
import numpy as np
import pypdfium2 as pdfium


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Trace an image/PDF and export the result as DXF."
    )
    parser.add_argument("input", type=Path, help="Path to input image or PDF")
    parser.add_argument("output", type=Path, help="Path to output .dxf")
    parser.add_argument("--dpi", type=int, default=300, help="PDF render DPI (default: 300)")
    parser.add_argument(
        "--threshold",
        type=int,
        default=170,
        help="Binarization threshold 0-255 (default: 170)",
    )
    parser.add_argument(
        "--epsilon",
        type=float,
        default=1.4,
        help="Polyline simplification epsilon in pixels (default: 1.4)",
    )
    parser.add_argument(
        "--min-area",
        type=float,
        default=18.0,
        help="Ignore contours smaller than this area in px² (default: 18)",
    )
    parser.add_argument(
        "--invert",
        action="store_true",
        help="Invert brightness before thresholding (useful for white lines on dark bg)",
    )
    parser.add_argument(
        "--page-gap",
        type=float,
        default=120.0,
        help="Gap between PDF pages in DXF units (default: 120)",
    )
    return parser.parse_args()


def rasterize_pdf(pdf_path: Path, dpi: int) -> Iterable[np.ndarray]:
    scale = dpi / 72.0
    pdf = pdfium.PdfDocument(str(pdf_path))
    for index in range(len(pdf)):
        page = pdf[index]
        bitmap = page.render(scale=scale)
        pil_img = bitmap.to_pil().convert("L")
        yield np.array(pil_img)


def load_rasters(path: Path, dpi: int) -> list[np.ndarray]:
    suffix = path.suffix.lower()
    if suffix == ".pdf":
        return list(rasterize_pdf(path, dpi=dpi))

    img = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError(f"Unsupported input or unreadable file: {path}")
    return [img]


def preprocess(img: np.ndarray, threshold: int, invert: bool) -> np.ndarray:
    blurred = cv2.GaussianBlur(img, (5, 5), 0)
    work = cv2.bitwise_not(blurred) if invert else blurred
    _, binary = cv2.threshold(work, threshold, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((2, 2), np.uint8)
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
    return cleaned


def contours_to_polylines(
    binary: np.ndarray,
    min_area: float,
    epsilon: float,
    y_offset: float,
) -> list[list[tuple[float, float]]]:
    contours, _ = cv2.findContours(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    polylines: list[list[tuple[float, float]]] = []

    for contour in contours:
        area = cv2.contourArea(contour)
        if area < min_area:
            continue

        approx = cv2.approxPolyDP(contour, epsilon=epsilon, closed=True)
        pts: list[tuple[float, float]] = []
        for point in approx:
            x, y = point[0]
            pts.append((float(x), float(-y - y_offset)))

        if len(pts) >= 2:
            polylines.append(pts)

    return polylines


def write_dxf(polylines: list[list[tuple[float, float]]], output: Path) -> None:
    doc = ezdxf.new(setup=True)
    msp = doc.modelspace()

    if "TRACE" not in doc.layers:
        doc.layers.add("TRACE", color=7)

    for pline in polylines:
        msp.add_lwpolyline(pline, close=True, dxfattribs={"layer": "TRACE"})

    doc.saveas(output)


def main() -> None:
    args = parse_args()

    rasters = load_rasters(args.input, dpi=args.dpi)
    if not rasters:
        raise RuntimeError("No raster pages were loaded from input.")

    all_polylines: list[list[tuple[float, float]]] = []
    y_cursor = 0.0

    for raster in rasters:
        binary = preprocess(raster, threshold=args.threshold, invert=args.invert)
        page_polylines = contours_to_polylines(
            binary,
            min_area=args.min_area,
            epsilon=args.epsilon,
            y_offset=y_cursor,
        )
        all_polylines.extend(page_polylines)
        y_cursor += float(raster.shape[0]) + args.page_gap

    args.output.parent.mkdir(parents=True, exist_ok=True)
    write_dxf(all_polylines, args.output)

    print(
        f"Exported {len(all_polylines)} traced polylines from {len(rasters)} page(s) -> {args.output}"
    )


if __name__ == "__main__":
    main()
