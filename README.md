# Freelancer Templates

A library of **85+ video templates** built with [Remotion](https://remotion.dev) and a Hugo-powered showcase site. Create professional video content for testimonials, proposals, case studies, social media, and more.

**Live site:** [freelancer-templates.org](https://freelancer-templates.org)

## What's Inside

```
├── src/remotion/templates/   # 85 Remotion video compositions
├── src/remotion/themes/      # 50+ color themes (dark, light, brand)
├── player/                   # Embeddable Remotion player (Vite)
├── content/library/          # Hugo pages for each template
├── data/templates.json       # Template metadata & variants
├── scripts/                  # Rendering, generation, validation
└── static/previews/          # Generated thumbnails & hero videos
```

## Quick Start

```bash
# Install dependencies
npm install
make player-install

# Start development (Hugo + Remotion Studio)
make dev                    # http://localhost:1313 + http://localhost:3000

# Or run separately
make hugo-dev               # Hugo only
npm run studio              # Remotion Studio only
```

## Templates

Each template is a self-contained Remotion composition with:
- Multiple **layout variants** (e.g., `Testimonial-Quote`, `Testimonial-Video`)
- **Theme support** via the unified theme system
- **Still + video** rendering for previews

### Template Categories

| Category | Examples |
|----------|----------|
| **Client Work** | Testimonial, CaseStudy, ClientReport, Proposal |
| **Social Media** | Announcement, CountdownHype, PollQuiz, QuoteCard |
| **Business** | Invoice, Pricing, RateCard, ContractSummary |
| **Project Management** | SprintDashboard, ProjectTimeline, MeetingRecap |
| **Creative** | AnimatedText, GlitchText, ParticleExplosion |

## Themes

50+ themes organized by style:

- **Professional:** Corporate, Finance, Blueprint, Industrial
- **Dark:** Dark, Midnight, Charcoal, Espresso
- **Light:** Clean, Minimal, Paper, Cream
- **Colorful:** Neon, Electric, Candy, Coral

Themes are defined in `src/remotion/themes/` and applied via the `theme` prop on any composition.

## Rendering

```bash
# Render missing thumbnails (stills only)
make render

# Render all thumbnails (overwrites existing)
make render-all

# Render stills + hero videos
make render-missing

# Render specific template
make render-template T=Testimonial

# Parallel rendering (faster)
make render-parallel J=4
```

Output goes to:
- `static/previews/showcase/` — still images (PNG)
- `static/previews/hero/` — video clips (MP4)

## Generating Variants

Templates support multiple layouts and themes. Generate all variants:

```bash
# Generate variants for one template
make generate-variants T=listicle

# Preview what would be generated (dry run)
make generate-variants-preview T=listicle

# Generate for ALL templates
make generate-all-variants

# List available templates
make list-templates
```

Configuration lives in `scripts/template-config.json`.

## Building for Production

```bash
# Build player + Hugo site
make build

# Output: public/ (ready for deployment)
```

The player is built to `static/player/` and embedded in Hugo pages.

## Project Structure

### Remotion (`src/remotion/`)

```
src/remotion/
├── templates/           # All 85 template compositions
│   ├── testimonial/     # Example: Testimonial template
│   │   ├── index.tsx    # Main composition
│   │   ├── Quote.tsx    # Layout variant
│   │   └── Video.tsx    # Layout variant
│   └── _shared/         # Shared components
├── themes/              # Theme definitions
├── Root.tsx             # Remotion root (registers all compositions)
└── index.ts             # Entry point
```

### Hugo (`content/`, `layouts/`)

```
content/
├── library/             # Template showcase pages
│   ├── testimonial.md
│   └── ...
├── themes/              # Theme showcase pages
└── _index.md            # Homepage

layouts/
├── _default/            # Base templates
├── library/             # Template detail pages
└── partials/            # Reusable components
```

### Data (`data/`)

```
data/
├── templates.json       # Template metadata, variants, themes
└── themes.json          # Theme color definitions
```

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/render-thumbnails.sh` | Batch render stills/videos |
| `scripts/generate-template-variants.py` | Generate variant combinations |
| `scripts/generate-theme-data.js` | Extract theme colors to JSON |

## Testing

```bash
npm test                  # Run all tests
npm test -- --watch       # Watch mode
```

Tests use [Vitest](https://vitest.dev) with property-based testing via [fast-check](https://fast-check.dev).

## Tech Stack

- **Video:** [Remotion](https://remotion.dev) 4.x
- **Site:** [Hugo](https://gohugo.io)
- **Player:** Vite + React
- **Styling:** Tailwind CSS
- **Testing:** Vitest + fast-check
- **Icons:** Lucide React

## License

MIT
