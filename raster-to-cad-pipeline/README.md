# Raster/PDF → DXF photocopy pipeline

This folder is intentionally standalone and unrelated to the `mpfst.com` app.

## What it does

`photocopy_to_dxf.py` takes either:
- a raster image (`.png`, `.jpg`, `.tif`, etc.), or
- a PDF (including scanned plans/documents),

then traces contour geometry and writes a **DXF** file. This is a "photocopy" style conversion:
image/PDF pixels are converted to vector outlines.

## Why DXF instead of DWG

DWG is a proprietary format and usually requires proprietary SDKs. DXF is open and widely accepted by
AutoCAD, BricsCAD, DraftSight, FreeCAD, etc. If you must have DWG, convert the generated DXF with your CAD tool.

## Setup

```bash
cd raster-to-cad-pipeline
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Usage

### 1) Single image to DXF

```bash
python photocopy_to_dxf.py ./input/site-plan-scan.png ./out/site-plan.dxf
```

### 2) PDF (including scanned multi-page plans) to DXF

```bash
python photocopy_to_dxf.py ./input/plans.pdf ./out/plans.dxf --dpi 300
```

## Useful tuning flags

- `--threshold 170` : Controls black/white split during tracing.
- `--epsilon 1.4` : Polyline simplification amount (higher = less detail).
- `--min-area 18` : Filters tiny noise contours.
- `--invert` : Use when source is light lines on dark background.
- `--page-gap 120` : Vertical spacing between pages in combined DXF output.

## Notes

- This pipeline is best for "photocopy"/tracing conversion, not semantic CAD reconstruction.
- Complex text/hatches from scans become traced outlines, not editable CAD text objects.
- For cleaner output, pre-clean scans (deskew/denoise) before running conversion.
