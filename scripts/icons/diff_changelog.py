#!/usr/bin/env python3
"""
diff_changelog.py — Compare old and new manifest.json, produce a changelog entry.

Called by the icon-sync GHA workflow after a sync run. Reads the previous
manifest (from git HEAD) and the freshly-written manifest, then:
  - emits a machine-readable JSON diff (for PR body / Slack)
  - prepends a dated Markdown entry to static/icons/CHANGELOG.md

Usage:
    python diff_changelog.py [--old old.json] [--new new.json] [--changelog path]

When run without arguments, defaults to comparing git HEAD's manifest.json
against the current on-disk version.
"""

from __future__ import annotations

import argparse
import json
import logging
import subprocess
from datetime import date
from pathlib import Path

logger = logging.getLogger(__name__)

REPO_ROOT      = Path(__file__).resolve().parents[2]
MANIFEST_PATH  = REPO_ROOT / "static/icons/manifest.json"
CHANGELOG_PATH = REPO_ROOT / "static/icons/CHANGELOG.md"


# ── Diff logic ────────────────────────────────────────────────────────────────

def _index_services(manifest: dict) -> dict[str, dict]:
    """Return {icon_id: entry} across all platforms + custom sections."""
    index: dict[str, dict] = {}
    for platform, pdata in manifest.get("platforms", {}).items():
        for svc in pdata.get("services", []):
            index[f"{platform}/{svc['id']}"] = svc
    for section in ("industries", "ai_capability", "process"):
        for entry in manifest.get(section, []):
            index[f"{section}/{entry['id']}"] = entry
    return index


def diff_manifests(old: dict, new: dict) -> dict:
    """
    Compare two manifest dicts.
    Returns {added: [...], removed: [...], renamed: [...], stats_delta: {...}}.
    """
    old_idx = _index_services(old)
    new_idx = _index_services(new)

    added   = sorted(k for k in new_idx if k not in old_idx)
    removed = sorted(k for k in old_idx if k not in new_idx)

    # Detect wiki_mentioned changes for existing icons
    newly_tagged   = []
    newly_untagged = []
    for key in old_idx:
        if key not in new_idx:
            continue
        was = old_idx[key].get("wiki_mentioned", False)
        now = new_idx[key].get("wiki_mentioned", False)
        if now and not was:
            newly_tagged.append(key)
        elif was and not now:
            newly_untagged.append(key)

    old_stats = old.get("stats", {})
    new_stats = new.get("stats", {})

    return {
        "date":           date.today().isoformat(),
        "added":          added,
        "removed":        removed,
        "newly_tagged":   newly_tagged,
        "newly_untagged": newly_untagged,
        "stats_delta": {
            "total_icons":  new_stats.get("total_icons", 0) - old_stats.get("total_icons", 0),
            "wiki_tagged":  new_stats.get("wiki_tagged", 0)  - old_stats.get("wiki_tagged", 0),
        },
        "new_stats": new_stats,
    }


# ── Changelog rendering ───────────────────────────────────────────────────────

def _render_changelog_entry(diff: dict) -> str:
    lines = [f"## {diff['date']}\n"]

    delta = diff["stats_delta"]
    total = diff["new_stats"].get("total_icons", 0)
    tagged = diff["new_stats"].get("wiki_tagged", 0)

    summary_parts = [f"**{total} total icons**"]
    if delta["total_icons"] > 0:
        summary_parts.append(f"+{delta['total_icons']} new")
    elif delta["total_icons"] < 0:
        summary_parts.append(f"{delta['total_icons']} removed")
    else:
        summary_parts.append("no icon count change")
    summary_parts.append(f"{tagged} wiki-tagged")

    lines.append(", ".join(summary_parts) + "\n")

    if diff["added"]:
        lines.append("\n**Added**\n")
        for key in diff["added"]:
            lines.append(f"- `{key}`\n")

    if diff["removed"]:
        lines.append("\n**Removed**\n")
        for key in diff["removed"]:
            lines.append(f"- `{key}`\n")

    if diff["newly_tagged"]:
        lines.append("\n**Newly wiki-tagged**\n")
        for key in diff["newly_tagged"]:
            lines.append(f"- `{key}`\n")

    if not diff["added"] and not diff["removed"] and not diff["newly_tagged"]:
        lines.append("\nNo icon changes — metadata refresh only.\n")

    return "".join(lines)


def prepend_changelog(diff: dict, changelog_path: Path = CHANGELOG_PATH) -> None:
    entry = _render_changelog_entry(diff)

    if changelog_path.exists():
        existing = changelog_path.read_text(encoding="utf-8")
        # Keep the header line if present
        if existing.startswith("# "):
            header, _, rest = existing.partition("\n")
            new_content = f"{header}\n\n{entry}\n{rest.lstrip()}"
        else:
            new_content = f"{entry}\n{existing}"
    else:
        new_content = f"# Icon Library Changelog\n\n{entry}\n"

    changelog_path.write_text(new_content, encoding="utf-8")
    logger.info("Changelog updated: %s", changelog_path)


# ── Git helpers ───────────────────────────────────────────────────────────────

def _load_manifest_from_git_head() -> dict:
    """Read manifest.json as it exists in git HEAD (before current changes)."""
    try:
        result = subprocess.run(
            ["git", "show", f"HEAD:static/icons/manifest.json"],
            capture_output=True,
            text=True,
            cwd=REPO_ROOT,
            check=True,
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError:
        logger.warning("manifest.json not found in git HEAD — treating as empty")
        return {"platforms": {}, "industries": [], "ai_capability": [], "process": [], "stats": {}}


# ── Main ──────────────────────────────────────────────────────────────────────

def run_diff(old_path: Path | None, new_path: Path | None, changelog_path: Path) -> dict:
    if new_path and new_path.exists():
        new_manifest = json.loads(new_path.read_text())
    else:
        new_manifest = json.loads(MANIFEST_PATH.read_text())

    if old_path and old_path.exists():
        old_manifest = json.loads(old_path.read_text())
    else:
        old_manifest = _load_manifest_from_git_head()

    diff = diff_manifests(old_manifest, new_manifest)
    prepend_changelog(diff, changelog_path)

    return diff


def main() -> None:
    parser = argparse.ArgumentParser(description="Diff two manifest.json files and update CHANGELOG.md")
    parser.add_argument("--old",       type=Path, default=None, help="Previous manifest (default: git HEAD)")
    parser.add_argument("--new",       type=Path, default=None, help="New manifest (default: on-disk)")
    parser.add_argument("--changelog", type=Path, default=CHANGELOG_PATH, help="Path to CHANGELOG.md")
    parser.add_argument("--json-out",  type=Path, default=None, help="Write diff JSON to this file")
    args = parser.parse_args()

    diff = run_diff(args.old, args.new, args.changelog)

    if args.json_out:
        args.json_out.write_text(json.dumps(diff, indent=2))
        logger.info("Diff JSON written to %s", args.json_out)

    print(f"\nIcon diff summary for {diff['date']}:")
    print(f"  Added:          {len(diff['added'])}")
    print(f"  Removed:        {len(diff['removed'])}")
    print(f"  Newly tagged:   {len(diff['newly_tagged'])}")
    print(f"  Total icons:    {diff['new_stats'].get('total_icons', 0)} "
          f"({diff['stats_delta']['total_icons']:+d})")
    print(f"  Wiki-tagged:    {diff['new_stats'].get('wiki_tagged', 0)} "
          f"({diff['stats_delta']['wiki_tagged']:+d})")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    main()
