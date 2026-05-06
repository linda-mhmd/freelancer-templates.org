#!/usr/bin/env python3
"""
sync_aws.py — Download and normalise the official AWS Architecture Icons pack.

Detection:  fetches the AWS icons page, extracts the .zip download URL.
            If the URL matches .sync-state.json → skip (no new release).
            If different → download, extract, normalise, update state.

Output:     static/icons/platforms/aws/service/   ← SVG + PNG + @2x PNG
            static/icons/platforms/aws/group/
            static/icons/platforms/aws/brand/
Returns:    dict with added/removed/changed icon lists (used by diff_changelog.py)
"""

from __future__ import annotations

import hashlib
import io
import json
import logging
import os
import re
import shutil
import tempfile
import zipfile
from pathlib import Path
from typing import Optional

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

REPO_ROOT   = Path(__file__).resolve().parents[2]
OUT_DIR     = REPO_ROOT / "static/icons/platforms/aws"
STATE_FILE  = REPO_ROOT / "scripts/icons/.sync-state.json"
ICONS_PAGE  = "https://aws.amazon.com/architecture/icons/"

# How many consecutive request failures before we bail
MAX_RETRIES = 3
HEADERS     = {"User-Agent": "Mozilla/5.0 (compatible; icon-sync-bot/1.0)"}


# ── State helpers ─────────────────────────────────────────────────────────────

def _load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def _save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


# ── Page scraping ─────────────────────────────────────────────────────────────

def _find_aws_zip_url(html: str) -> Optional[str]:
    """Extract the .zip download URL from the AWS icons page."""
    # Find all ZIP URLs in the page
    all_zips = re.findall(r'https?://[^"\'>\s]+\.zip', html, re.IGNORECASE)
    
    # Priority 1: Icon-package (the SVG/PNG asset pack we want)
    for url in all_zips:
        if "icon-package" in url.lower():
            return url
    
    # Priority 2: Any architecture-icons zip that's NOT a toolkit
    for url in all_zips:
        lurl = url.lower()
        if "architecture-icons" in lurl and "toolkit" not in lurl and "pptx" not in lurl:
            return url
    
    # Priority 3: Any architecture-icons zip
    for url in all_zips:
        if "architecture-icons" in url.lower():
            return url
    
    # Fallback: legacy pattern
    soup = BeautifulSoup(html, "lxml")
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.lower().endswith(".zip") and "architecture" in href.lower():
            return href if href.startswith("http") else f"https://aws.amazon.com{href}"
    
    return None


def detect_aws_version(force: bool = False) -> tuple[Optional[str], bool]:
    """
    Returns (zip_url, is_new_version).
    If force=True always returns is_new_version=True.
    """
    state = _load_state()
    last_url = state.get("aws_zip_url", "")

    try:
        resp = requests.get(ICONS_PAGE, headers=HEADERS, timeout=30)
        resp.raise_for_status()
    except Exception as exc:
        logger.error("Failed to fetch AWS icons page: %s", exc)
        return None, False

    zip_url = _find_aws_zip_url(resp.text)
    if not zip_url:
        logger.warning("Could not find AWS zip URL on page — checking hardcoded fallback pattern")
        # Fallback: try to construct current quarter URL
        from datetime import date
        d = date.today()
        q = (d.month - 1) // 3 + 1
        zip_url = (
            f"https://d1.awsstatic.com/webteam/architecture-icons/"
            f"Q{q}CY{d.year}/AWS-Architecture-Icons_Q{q}.{d.year}.zip"
        )

    is_new = force or (zip_url != last_url)
    logger.info("AWS zip URL: %s  (new=%s)", zip_url, is_new)
    return zip_url, is_new


# ── Naming normalisation ──────────────────────────────────────────────────────

def _normalise_aws_name(filename: str) -> str:
    """
    'Arch_Amazon-Bedrock_64.svg'          → 'bedrock'
    'Arch_AWS-Lambda_64.svg'              → 'lambda'
    'Res_Amazon-S3_S3-Bucket_48.svg'      → 's3-bucket'
    'Arch-Group_VPC_48.svg'               → 'vpc'
    """
    stem = Path(filename).stem  # strip extension

    # Strip size suffix (_64, _48, _32, _16)
    stem = re.sub(r"_\d+$", "", stem)

    # Strip leading Arch_ / Res_ / Arch-Group_ prefixes
    stem = re.sub(r"^(Arch_|Res_|Arch-Group_|Category_)", "", stem)

    # Strip vendor prefixes  Amazon-  /  AWS-  /  Amazon_  /  AWS_
    stem = re.sub(r"^(Amazon[-_]|AWS[-_])", "", stem)

    # CamelCase / PascalCase with hyphens → lowercase-hyphenated
    # First handle existing hyphens: keep them, just lowercase
    name = stem.lower()

    # Sanitise: only a-z 0-9 and hyphens
    name = re.sub(r"[^a-z0-9-]", "-", name)
    name = re.sub(r"-{2,}", "-", name).strip("-")
    return name


def _classify_aws_file(zip_path: str) -> Optional[str]:
    """Return 'service', 'group', 'brand', or None (skip)."""
    lp = zip_path.lower()
    filename = Path(zip_path).name.lower()
    
    # Skip files that are already lowercase arch- prefixed (these are duplicates
    # of the properly-named Arch_ files that we normalize)
    if filename.startswith("arch-"):
        return None
    
    if "arch-group" in lp or "architecture-group" in lp:
        return "group"
    if "arch_" in lp or "/arch/" in lp:
        return "service"
    if "res_" in lp or "/res/" in lp:
        return "service"
    if "brand" in lp or "logo" in lp:
        return "brand"
    return None


# ── PNG generation ────────────────────────────────────────────────────────────

def _svg_to_png(svg_path: Path, out_path: Path, size: int) -> None:
    try:
        import cairosvg
        cairosvg.svg2png(url=str(svg_path), write_to=str(out_path), output_width=size, output_height=size)
    except Exception as exc:
        logger.warning("cairosvg failed for %s: %s — skipping PNG", svg_path.name, exc)


# ── Download and extract ──────────────────────────────────────────────────────

def _download_zip(url: str) -> bytes:
    logger.info("Downloading %s", url)
    resp = requests.get(url, headers=HEADERS, timeout=300, stream=True)
    resp.raise_for_status()
    buf = io.BytesIO()
    for chunk in resp.iter_content(chunk_size=65536):
        buf.write(chunk)
    logger.info("Downloaded %.1f MB", buf.tell() / 1e6)
    return buf.getvalue()


def _process_zip(zip_bytes: bytes, out_dir: Path) -> dict[str, list[str]]:
    """
    Extract relevant icons from ZIP, normalise filenames, write to out_dir.
    Returns {added: [], removed: [], changed: []}.
    """
    # Track which normalised names we've already written (first wins per name)
    written: set[str] = set()
    added: list[str] = []

    # Existing files before update
    existing_names: set[str] = {
        p.stem for cat in ("service", "group", "brand")
        for p in (out_dir / cat).glob("*.svg")
    }

    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        svg_entries = [
            e for e in zf.infolist()
            if not e.is_dir() and e.filename.lower().endswith(".svg")
        ]
        logger.info("Found %d SVG entries in ZIP", len(svg_entries))

        for entry in svg_entries:
            category = _classify_aws_file(entry.filename)
            if category is None:
                continue

            name = _normalise_aws_name(Path(entry.filename).name)
            if not name or name in written:
                continue
            written.add(name)

            cat_dir = out_dir / category
            cat_dir.mkdir(parents=True, exist_ok=True)

            svg_path = cat_dir / f"{name}.svg"
            svg_bytes = zf.read(entry.filename)

            # Ensure currentColor for service icons (not brand)
            if category == "service":
                svg_content = svg_bytes.decode("utf-8", errors="replace")
                # Don't strip vendor colors from brand icons; service icons keep original
                svg_path.write_text(svg_content, encoding="utf-8")
            else:
                svg_path.write_bytes(svg_bytes)

            # Generate PNGs from SVG
            _svg_to_png(svg_path, cat_dir / f"{name}.png",    256)
            _svg_to_png(svg_path, cat_dir / f"{name}@2x.png", 512)

            if name not in existing_names:
                added.append(f"{category}/{name}")

    removed = [n for n in existing_names if n not in written]
    return {"added": added, "removed": removed, "changed": []}


# ── Public entry point ────────────────────────────────────────────────────────

def sync_aws(force: bool = False) -> dict:
    """
    Main entry point called by the GHA workflow.
    Returns change summary dict.
    """
    zip_url, is_new = detect_aws_version(force=force)
    if not is_new or not zip_url:
        logger.info("AWS icons: no new release detected — skipping")
        return {"platform": "aws", "status": "skipped", "added": [], "removed": [], "changed": []}

    try:
        zip_bytes = _download_zip(zip_url)
    except Exception as exc:
        logger.error("Failed to download AWS ZIP: %s", exc)
        return {"platform": "aws", "status": "error", "error": str(exc)}

    changes = _process_zip(zip_bytes, OUT_DIR)

    # Update state
    state = _load_state()
    state["aws_zip_url"] = zip_url
    state["aws_zip_sha256"] = hashlib.sha256(zip_bytes).hexdigest()
    _save_state(state)

    logger.info(
        "AWS sync complete: +%d added  -%d removed",
        len(changes["added"]), len(changes["removed"]),
    )
    return {"platform": "aws", "status": "updated", **changes}


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    force = "--force" in sys.argv
    result = sync_aws(force=force)
    print(json.dumps(result, indent=2))
