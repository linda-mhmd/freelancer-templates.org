# Design System

Visual tokens that define the look of the entire stream. Import from the barrel:

```ts
import { GD_VIOLET, GD_ORANGE, GD_GOLD } from "../../design/colors";
import { TYPOGRAPHY } from "../../design/typography";
```

---

## Color System (`colors.ts`)

Color signals intent before text is read. Every insert uses exactly one accent color - picking the right one is the most important design decision when creating a new insert.

| Token | Hex | Named | Use for |
|-------|-----|-------|---------|
| `GD_VIOLET` | `#8b5cf6` | Violet | Community topics, team info, organizer comms |
| `GD_ORANGE` | `#ff9900` | Orange | AWS environment, Gamemasters, platform/infra |
| `GD_GOLD` | `#fbbf24` | Gold | General milestones, neutral announcements |
| `GD_GREEN` | `#22c55e` | Green | Fixed, resolved, success, working |
| `GD_RED` | `#ef4444` | Red | Broken, error, unavailable, problem |
| `GD_ACCENT` | `#c084fc` | Accent/Pink | Celebrations, drama, location highlights |
| `GD_DARK` | `#0a0a1a` | Dark | Background base - used in every composition |
| `GD_PURPLE` | `#4c1d95` | Purple | Deep purple for gradients |
| `GD_PINK` | `#ec4899` | Pink | Accent variant |

**Color discipline:** Do not invent new colors. Do not use orange for community topics or violet for AWS topics. The color coding is the visual language of the stream.

---

## Typography (`typography.ts`)

Font size scale in pixels. Used as inline style `fontSize` values.

| Token | Size | Use for |
|-------|------|---------|
| `TYPOGRAPHY.h1` | 72px | Hero / main title |
| `TYPOGRAPHY.h2` | 56px | Large name display |
| `TYPOGRAPHY.h3` | 36px | Insert titles |
| `TYPOGRAPHY.h4` | 28px | Card headings |
| `TYPOGRAPHY.h5` | 22px | Body large / card content |
| `TYPOGRAPHY.body` | 18px | Standard body text |
| `TYPOGRAPHY.bodySmall` | 14px | Footer, secondary text |
| `TYPOGRAPHY.caption` | 12px | Labels, metadata |
| `TYPOGRAPHY.label` | 11px | Status badge text |

Font family is `'Inter', sans-serif` set on the root `AbsoluteFill` in every composition.

---

## Animations (`animations.ts`)

Preset spring configs for consistent motion feel across all compositions.

```ts
import { springConfig } from "../../design/animations";

// Available presets
springConfig.snappy   // Fast entry, sharp feel - for icons and punch moments
springConfig.smooth   // Standard entry - for cards and content
springConfig.gentle   // Slow, floating entry - for background elements
```

All inserts use `spring()` from Remotion with these configs. Fade-out always happens over the last 60 frames (2 seconds) using `interpolate`.

---

## Rules

- One accent color per insert - do not mix accent colors within a single card
- All text must be readable at a distance on a shared screen
- Do not use opacity below 0.35 for text (minimum legibility threshold)
- Pulse animations use `interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8])` - keep this consistent
