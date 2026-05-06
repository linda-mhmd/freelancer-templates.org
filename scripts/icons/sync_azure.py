#!/usr/bin/env python3
"""
sync_azure.py — Download and normalise the official Microsoft Azure Architecture Icons.

Source:  https://learn.microsoft.com/en-us/azure/architecture/icons/
Pack:    Monthly ZIP, SVG + PNG per service, free for non-commercial docs use.

Detection and output follow the same pattern as sync_aws.py.
"""

from __future__ import annotations

import hashlib
import io
import json
import logging
import re
import zipfile
from pathlib import Path
from typing import Optional

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

REPO_ROOT  = Path(__file__).resolve().parents[2]
OUT_DIR    = REPO_ROOT / "static/icons/platforms/azure"
STATE_FILE = REPO_ROOT / "scripts/icons/.sync-state.json"
ICONS_PAGE = "https://learn.microsoft.com/en-us/azure/architecture/icons/"
HEADERS    = {"User-Agent": "Mozilla/5.0 (compatible; icon-sync-bot/1.0)"}


# ── State helpers (shared format with sync_aws.py) ────────────────────────────

def _load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def _save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


# ── Page scraping ─────────────────────────────────────────────────────────────

def _find_azure_zip_url(html: str) -> Optional[str]:
    """Extract the Azure icons ZIP URL from the MS Docs page."""
    soup = BeautifulSoup(html, "lxml")

    for a in soup.find_all("a", href=True):
        href = a["href"]
        lh = href.lower()
        if ".zip" in lh and ("azure" in lh or "icons" in lh or "arch" in lh):
            return href if href.startswith("http") else f"https://learn.microsoft.com{href}"

    # Fallback: raw regex in HTML
    m = re.search(
        r'https?://[^"\']+(?:azure[^"\']*icons|icons[^"\']*azure)[^"\']*\.zip',
        html,
        re.IGNORECASE,
    )
    if m:
        return m.group(0)

    # Known stable CDN path (Microsoft updates the file at the same URL)
    return "https://arch-center.azureedge.net/icons/azure-architecture-icons.zip"


def detect_azure_version(force: bool = False) -> tuple[Optional[str], bool]:
    state = _load_state()
    last_url = state.get("azure_zip_url", "")

    try:
        resp = requests.get(ICONS_PAGE, headers=HEADERS, timeout=30)
        resp.raise_for_status()
        zip_url = _find_azure_zip_url(resp.text)
    except Exception as exc:
        logger.error("Failed to fetch Azure icons page: %s", exc)
        # Fall back to known stable URL and check via HEAD for Last-Modified
        zip_url = "https://arch-center.azureedge.net/icons/azure-architecture-icons.zip"

    if not zip_url:
        return None, False

    # For Azure, the URL may stay constant but content changes. Use HEAD ETag/Last-Modified.
    is_new = force or (zip_url != last_url)
    if not is_new:
        # Extra check: compare ETag from HEAD request
        try:
            head = requests.head(zip_url, headers=HEADERS, timeout=15, allow_redirects=True)
            etag = head.headers.get("ETag", "")
            last_etag = state.get("azure_etag", "")
            if etag and etag != last_etag:
                is_new = True
                logger.info("Azure ETag changed: %s → %s", last_etag, etag)
        except Exception:
            pass

    logger.info("Azure zip URL: %s  (new=%s)", zip_url, is_new)
    return zip_url, is_new


# ── Naming normalisation ──────────────────────────────────────────────────────
# Azure icon filenames look like:
#   10013-icon-service-App-Configuration.svg
#   00028-icon-service-Azure-OpenAI.svg
#   00001-icon-service-Subscriptions.svg
#   microsoft-azure-logo.svg

def _normalise_azure_name(filename: str) -> str:
    stem = Path(filename).stem

    # Strip numeric prefix and 'icon-service-' / 'icon-' boilerplate
    stem = re.sub(r"^\d+-", "", stem)
    stem = re.sub(r"^icon-service-", "", stem, flags=re.IGNORECASE)
    stem = re.sub(r"^icon-", "", stem, flags=re.IGNORECASE)

    # Strip redundant 'Azure-' prefix (not all icons have it, keep for disambiguation)
    # We keep 'azure-openai' as-is since that's the canonical product name
    name = stem.lower()
    name = re.sub(r"[^a-z0-9-]", "-", name)
    name = re.sub(r"-{2,}", "-", name).strip("-")
    return name


def _classify_azure_file(zip_path: str) -> Optional[str]:
    lp = zip_path.lower()
    filename = Path(zip_path).name.lower()

    if "logo" in filename or "brand" in lp or "microsoft-logo" in filename:
        return "brand"
    if filename.startswith("icon-service") or re.match(r"^\d+-icon", filename):
        return "service"
    if "group" in lp or "boundary" in lp or "subnet" in lp:
        return "group"
    # Default: treat as service if SVG
    if filename.endswith(".svg"):
        return "service"
    return None


# ── PNG helpers ───────────────────────────────────────────────────────────────

def _svg_to_png(svg_path: Path, out_path: Path, size: int) -> None:
    try:
        import cairosvg
        cairosvg.svg2png(url=str(svg_path), write_to=str(out_path), output_width=size, output_height=size)
    except Exception as exc:
        logger.warning("cairosvg failed for %s: %s", svg_path.name, exc)


# ── Download and extract ──────────────────────────────────────────────────────

def _download_zip(url: str) -> tuple[bytes, str]:
    """Returns (zip_bytes, etag)."""
    logger.info("Downloading %s", url)
    resp = requests.get(url, headers=HEADERS, timeout=300, stream=True)
    resp.raise_for_status()
    buf = io.BytesIO()
    for chunk in resp.iter_content(chunk_size=65536):
        buf.write(chunk)
    etag = resp.headers.get("ETag", "")
    logger.info("Downloaded %.1f MB  ETag=%s", buf.tell() / 1e6, etag)
    return buf.getvalue(), etag


def _process_zip(zip_bytes: bytes, out_dir: Path) -> dict[str, list[str]]:
    written: set[str] = set()
    added: list[str] = []

    existing_names: set[str] = {
        p.stem for cat in ("service", "group", "brand")
        for p in (out_dir / cat).glob("*.svg")
    }

    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        svg_entries = [
            e for e in zf.infolist()
            if not e.is_dir() and e.filename.lower().endswith(".svg")
        ]
        logger.info("Found %d SVG entries in Azure ZIP", len(svg_entries))

        for entry in svg_entries:
            category = _classify_azure_file(entry.filename)
            if category is None:
                continue

            name = _normalise_azure_name(Path(entry.filename).name)
            if not name or name in written:
                continue
            written.add(name)

            cat_dir = out_dir / category
            cat_dir.mkdir(parents=True, exist_ok=True)

            svg_path = cat_dir / f"{name}.svg"
            svg_bytes = zf.read(entry.filename)
            svg_path.write_bytes(svg_bytes)

            _svg_to_png(svg_path, cat_dir / f"{name}.png",    256)
            _svg_to_png(svg_path, cat_dir / f"{name}@2x.png", 512)

            if name not in existing_names:
                added.append(f"{category}/{name}")

    removed = [n for n in existing_names if n not in written]
    return {"added": added, "removed": removed, "changed": []}


# ── Public entry point ────────────────────────────────────────────────────────

def sync_azure(force: bool = False) -> dict:
    zip_url, is_new = detect_azure_version(force=force)
    if not is_new or not zip_url:
        logger.info("Azure icons: no new release detected — skipping")
        return {"platform": "azure", "status": "skipped", "added": [], "removed": [], "changed": []}

    try:
        zip_bytes, etag = _download_zip(zip_url)
    except Exception as exc:
        logger.error("Failed to download Azure ZIP: %s", exc)
        return {"platform": "azure", "status": "error", "error": str(exc)}

    changes = _process_zip(zip_bytes, OUT_DIR)

    state = _load_state()
    state["azure_zip_url"] = zip_url
    state["azure_etag"] = etag
    state["azure_zip_sha256"] = hashlib.sha256(zip_bytes).hexdigest()
    _save_state(state)

    logger.info(
        "Azure sync complete: +%d added  -%d removed",
        len(changes["added"]), len(changes["removed"]),
    )
    return {"platform": "azure", "status": "updated", **changes}


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    force = "--force" in sys.argv
    result = sync_azure(force=force)
    print(json.dumps(result, indent=2))
