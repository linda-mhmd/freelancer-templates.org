#!/usr/bin/env python3
"""
generate_manifest.py — Walk static/icons/ and build manifest.json.

Reads the existing icons on disk, enriches them with:
  - metadata from scripts/icons/metadata/ per platform (human-readable names, categories)
  - wiki mention data from priority_services.json (if present)

Writes static/icons/manifest.json.

Run after any sync to keep the manifest in sync with disk state.
"""

from __future__ import annotations

import json
import logging
import re
from datetime import date
from pathlib import Path

logger = logging.getLogger(__name__)

REPO_ROOT        = Path(__file__).resolve().parents[2]
ICONS_DIR        = REPO_ROOT / "static/icons"
MANIFEST_PATH    = ICONS_DIR / "manifest.json"
PRIORITY_JSON    = REPO_ROOT / "scripts/icons/priority_services.json"
METADATA_DIR     = REPO_ROOT / "scripts/icons/metadata"

# Platform brand colours and license info
PLATFORM_META: dict[str, dict] = {
    "aws": {
        "brand_color":      "#FF9900",
        "brand_color_dark": "#232F3E",
        "brand_logo":       "/icons/platforms/aws/brand/aws-logo.svg",
        "license":          "AWS Trademark Guidelines — free for documentation",
        "license_url":      "https://aws.amazon.com/architecture/icons/",
        "attribution":      "Amazon Web Services, Inc. or its affiliates.",
        "source":           "AWS Architecture Icons",
    },
    "azure": {
        "brand_color":      "#0078D4",
        "brand_color_dark": "#003A5C",
        "brand_logo":       "/icons/platforms/azure/brand/azure-logo.svg",
        "license":          "Microsoft Azure Architecture Icons — free for non-commercial docs",
        "license_url":      "https://learn.microsoft.com/en-us/azure/architecture/icons/",
        "attribution":      "Microsoft Corporation.",
        "source":           "Azure Architecture Icons",
    },
    "community": {
        "brand_color":      "#6366F1",
        "brand_color_dark": "#4338CA",
        "brand_logo":       None,
        "license":          "Simple Icons — CC0 1.0 Universal (Public Domain)",
        "license_url":      "https://simpleicons.org/",
        "attribution":      "Simple Icons contributors. Individual icons are trademarks of their respective owners.",
        "source":           "Simple Icons (https://simpleicons.org)",
        "license_note":     "Icons are released under CC0 1.0 Universal. Trademarks belong to their respective owners. Usage must comply with each brand's guidelines.",
    },
}


# ── Helpers ───────────────────────────────────────────────────────────────────

def _load_priority_data() -> dict[str, dict]:
    """Returns {icon_id: {mention_count, file_count, wiki_mentioned}}."""
    if not PRIORITY_JSON.exists():
        return {}
    entries = json.loads(PRIORITY_JSON.read_text())
    return {e["id"]: e for e in entries}


def _load_name_map(platform: str) -> dict[str, str]:
    """Load id → human name from metadata/{platform}_names.json if it exists."""
    path = METADATA_DIR / f"{platform}_names.json"
    if path.exists():
        return json.loads(path.read_text())
    return {}


def _load_category_map(platform: str) -> dict[str, str]:
    path = METADATA_DIR / f"{platform}_categories.json"
    if path.exists():
        return json.loads(path.read_text())
    return {}


def _icon_id_from_path(svg_path: Path) -> str:
    return svg_path.stem  # filename without extension


def _public_url(path: Path) -> str:
    """Convert an absolute path under static/ to a public URL."""
    rel = path.relative_to(REPO_ROOT / "static")
    return "/" + str(rel).replace("\\", "/")


# ── Platform icons ────────────────────────────────────────────────────────────

def _should_skip_icon(icon_id: str, platform: str) -> bool:
    """
    Returns True if this icon should be skipped from the manifest.
    
    Filters out:
    - res- prefixed files (AWS resource icons without proper PNGs)
    - arch- prefixed files (duplicate lowercase versions)
    - Files with size suffixes like -48-dark, -48-light (variants, not main icons)
    """
    lid = icon_id.lower()
    
    # Skip res- prefixed files (these are duplicates without PNGs)
    if lid.startswith("res-"):
        return True
    
    # Skip arch- prefixed files (lowercase duplicates)
    if lid.startswith("arch-"):
        return True
    
    # Skip size/variant suffixes for AWS (these are duplicates)
    if platform == "aws":
        # Skip -48-dark, -48-light, -32, -16 variants
        if re.search(r"-\d+-(dark|light)$", lid):
            return True
        if re.search(r"-\d+$", lid) and not lid.endswith("-53"):  # Keep route-53
            return True
    
    return False


def _build_platform_section(platform: str, priority: dict) -> dict:
    platform_dir = ICONS_DIR / "platforms" / platform
    if not platform_dir.exists():
        return {}

    meta     = PLATFORM_META.get(platform, {})
    names    = _load_name_map(platform)
    cats     = _load_category_map(platform)
    services = []

    # Community platform uses different category structure
    if platform == "community":
        categories = ["devops", "containers", "cloud", "gcp", "databases", "infrastructure", 
                      "ai-ml", "web", "vendors", "frameworks", "frontend", "mobile", "testing", "api",
                      "monitoring", "security", "messaging", "productivity", "analytics",
                      "data-engineering", "vector-db", "payments", "crm", "version-control",
                      "editors", "hardware", "blockchain", "sponsors"]
    else:
        categories = ["service", "group", "brand"]

    for category in categories:
        cat_dir = platform_dir / category
        if not cat_dir.exists():
            continue
        for svg_path in sorted(cat_dir.glob("*.svg")):
            icon_id = _icon_id_from_path(svg_path)
            
            # Skip problematic icons (res- prefixed, variants, etc.)
            if _should_skip_icon(icon_id, platform):
                continue
            
            png     = cat_dir / f"{icon_id}.png"
            png_2x  = cat_dir / f"{icon_id}@2x.png"
            
            # For AWS/Azure, require PNG to exist (ensures icon was properly processed)
            if platform in ("aws", "azure") and not png.exists():
                logger.debug("Skipping %s/%s - no PNG found", platform, icon_id)
                continue

            entry: dict = {
                "id":       icon_id,
                "name":     names.get(icon_id, _id_to_name(icon_id)),
                "category": cats.get(icon_id, category),
                "svg":      _public_url(svg_path),
                "source":   meta.get("source", "Unknown"),
                "license":  meta.get("license", "See platform license"),
            }
            if png.exists():
                entry["png"] = _public_url(png)
            if png_2x.exists():
                entry["png_2x"] = _public_url(png_2x)

            pdata = priority.get(icon_id)
            if pdata:
                entry["wiki_mentioned"]  = True
                entry["wiki_mentions"]   = pdata.get("mention_count", 0)
                entry["wiki_files"]      = pdata.get("file_count", 0)

            services.append(entry)

    return {**meta, "services": services}


def _id_to_name(icon_id: str) -> str:
    """Best-effort: convert 'azure-openai' → 'Azure OpenAI'."""
    return " ".join(w.capitalize() for w in icon_id.split("-"))


# ── Custom icon sections ──────────────────────────────────────────────────────

def _build_icon_list(subdir: str) -> list[dict]:
    dir_path = ICONS_DIR / subdir
    if not dir_path.exists():
        return []
    entries = []
    for svg_path in sorted(dir_path.glob("*.svg")):
        icon_id = _icon_id_from_path(svg_path)
        entry = {
            "id":   icon_id,
            "name": _id_to_name(icon_id),
            "svg":  _public_url(svg_path),
        }
        png = dir_path / f"{icon_id}.png"
        if png.exists():
            entry["png"] = _public_url(png)
        entries.append(entry)
    return entries


# ── Maps section ──────────────────────────────────────────────────────────────

def _build_maps_section() -> dict:
    """Build the maps section from static/icons/maps/."""
    maps_dir = ICONS_DIR / "maps"
    if not maps_dir.exists():
        return {}
    
    metadata_path = maps_dir / "metadata.json"
    if not metadata_path.exists():
        return {}
    
    metadata = json.loads(metadata_path.read_text())
    
    maps_list = []
    for svg_path in sorted(maps_dir.glob("*.svg")):
        map_id = _icon_id_from_path(svg_path)
        map_info = metadata.get("maps", {}).get(map_id, {})
        
        entry = {
            "id": map_id,
            "name": map_info.get("name", _id_to_name(map_id)),
            "description": map_info.get("description", ""),
            "region_count": map_info.get("region_count", 0),
            "svg": _public_url(svg_path),
            "source": metadata.get("source", "Custom generated"),
            "license": metadata.get("license", "CC-BY-NC-SA 4.0"),
        }
        maps_list.append(entry)
    
    return {
        "source": metadata.get("source", "Custom generated"),
        "license": metadata.get("license", "CC-BY-NC-SA 4.0"),
        "attribution": metadata.get("attribution", "freelancer-templates.org"),
        "maps": maps_list,
        "regions": metadata.get("regions", {}),
    }


# ── Architecture icons section ────────────────────────────────────────────────

def _build_architecture_section() -> dict:
    """Build the architecture icons section from static/icons/architecture/."""
    arch_dir = ICONS_DIR / "architecture"
    if not arch_dir.exists():
        return {}
    
    metadata_path = arch_dir / "metadata.json"
    if not metadata_path.exists():
        return {}
    
    metadata = json.loads(metadata_path.read_text())
    
    icons_list = []
    icons_meta = metadata.get("icons", {})
    
    for icon_id, icon_info in icons_meta.items():
        entry = {
            "id": icon_id,
            "name": icon_info.get("name", _id_to_name(icon_id)),
            "category": icon_info.get("category", "other"),
            "lucide_source": icon_info.get("lucide_source", icon_id),
            "source": metadata.get("source", "Lucide Icons"),
            "license": metadata.get("license", "MIT License (ISC)"),
            "license_url": metadata.get("license_url", "https://lucide.dev/license"),
        }
        icons_list.append(entry)
    
    return {
        "source": metadata.get("source", "Lucide Icons"),
        "license": metadata.get("license", "MIT License (ISC)"),
        "license_url": metadata.get("license_url", "https://lucide.dev/license"),
        "attribution": metadata.get("attribution", "Lucide Contributors"),
        "categories": metadata.get("categories", {}),
        "icons": icons_list,
    }


# ── Main ──────────────────────────────────────────────────────────────────────

def generate_manifest() -> dict:
    priority = _load_priority_data()

    manifest = {
        "version":       date.today().strftime("%Y.%m"),
        "updated":       date.today().isoformat(),
        "canonical_url": "https://freelancer-templates.org/icons/manifest.json",
        "license_note":  "Vendor icons retain their original licenses. Custom icons (industries, ai-capability, process) are CC-BY-NC-SA 4.0.",
        "platforms": {},
        "industries":    _build_icon_list("industries"),
        "ai_capability": _build_icon_list("ai-capability"),
        "process":       _build_icon_list("process"),
    }

    for platform in ("aws", "azure", "community", "gcp", "redhat", "onprem", "multicloud", "hybrid"):
        section = _build_platform_section(platform, priority)
        if section:
            manifest["platforms"][platform] = section

    # Add new sections
    maps_section = _build_maps_section()
    if maps_section:
        manifest["maps"] = maps_section
    
    architecture_section = _build_architecture_section()
    if architecture_section:
        manifest["architecture"] = architecture_section

    # Stats
    platform_icons = sum(
        len(p.get("services", []))
        for p in manifest["platforms"].values()
    )
    custom_icons = len(manifest["industries"]) + len(manifest["ai_capability"]) + len(manifest["process"])
    maps_count = len(manifest.get("maps", {}).get("maps", []))
    architecture_count = len(manifest.get("architecture", {}).get("icons", []))
    
    total_icons = platform_icons + custom_icons + maps_count + architecture_count

    manifest["stats"] = {
        "total_icons":  total_icons,
        "platforms":    len(manifest["platforms"]),
        "platform_icons": platform_icons,
        "maps": maps_count,
        "architecture_icons": architecture_count,
        "wiki_tagged":  sum(
            1 for p in manifest["platforms"].values()
            for s in p.get("services", [])
            if s.get("wiki_mentioned")
        ),
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))
    logger.info(
        "Manifest written: %d total icons (%d platform, %d maps, %d architecture)",
        total_icons, platform_icons, maps_count, architecture_count,
    )
    return manifest


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    m = generate_manifest()
    print(f"\nGenerated manifest: {m['stats']}")
