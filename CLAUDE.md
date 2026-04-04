# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Local dev server with live reload
hugo server

# Build for production (output → public/)
hugo --gc --minify

# Build and serve with drafts
hugo server -D
```

Deploy is automatic via GitHub Actions on push to `main` (`.github/workflows/`) — no manual deploy step.

## Architecture

This is a **single-page Hugo site** — no content collections, no shortcodes, no partials. Everything lives in two files:

- `layouts/index.html` — the entire page (nav, hero, all sections, footer), using `{{ define "main" }}` filled into `layouts/_default/baseof.html`
- `assets/css/main.css` — all styles, including dark mode via `.dark` class on `<html>`
- `assets/js/main.js` — dark mode toggle (persisted in localStorage), mobile nav, library expand/collapse toggle

Hugo is used purely as a build pipeline: it fingerprints and minifies CSS/JS via `resources.Get | minify | fingerprint` in `baseof.html`, then outputs static HTML. There are no Hugo templates, data files, or content pages beyond `content/_index.md` (which only provides frontmatter metadata).

Icons are rendered client-side by `lucide.js` loaded from unpkg — all `<i data-lucide="...">` elements are replaced at runtime.

## Key design decisions

**No theme** — there are no theme submodules or external theme dependencies. All layout and styles are custom.

**CSS custom properties for theming** — dark mode is implemented entirely via CSS variables toggled by the `.dark` class on `<html>`. Do not use inline styles for colors; use the existing variables.

**Stream template section** — the `#remotion` section showcases community Remotion templates. The GameDay Europe stream templates (from `community-gameday-europe-stream-templates`) are listed here. When adding new template repos, add them as cards in the `rmt-section` grid and as rows in the `#library` full-library table. Each card needs: repo link, a short description, preview image tags (`.rmt-card__tpls`), and a category badge.

## What the site is

A landing page / template library index for `mzzavaa` (Linda Mohamed). It showcases:
- Remotion video compositions (freelancer business videos, community event stream overlays)
- Document templates (contracts, proposals, invoices)

The site links out to the actual template repos on GitHub — it does not host or serve the templates directly. The `mzzavaa/freelancer-templates.org` GitHub repo is both the source and the deployment target (GitHub Pages).

## baseURL — never hardcode it

`config.toml` has `baseURL = "/"` as a local dev default. The actual URL is injected at build time by the GitHub Actions workflow via `--baseURL "${HUGO_BASEURL}/"`, where `HUGO_BASEURL` comes from `steps.pages.outputs.base_url` (output of `actions/configure-pages`). This resolves to the custom domain when configured, or the `mzzavaa.github.io/...` subdomain otherwise — automatically, with no manual change needed.

**Never set a hardcoded domain in `config.toml`.** If the deployed site shows no styles, the `baseURL` was likely hardcoded and doesn't match the actual serving URL — fingerprinted asset paths will 404.
