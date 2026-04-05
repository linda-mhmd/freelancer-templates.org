# Components

Shared building blocks used across all compositions. Import from the barrel:

```ts
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../components";
```

## Components

**`BackgroundLayer`**
Dark gradient background. Accepts a `darken` prop (0-1) to control opacity. Used in every composition as the base layer.

**`HexGridOverlay`**
Subtle hexagonal grid pattern layered over the background. Gives the stream a tech/game aesthetic without being distracting.

**`GlassCard`**
Frosted-glass card container. Accepts a `style` prop for border, padding, and sizing. Used as the primary content surface in all inserts.

**`AudioBadge`**
Fixed bottom-right indicator showing `AUDIO ON` or `MUTED`. Accepts a `muted` boolean prop. Every composition should include this so the stream operator knows the audio state at a glance.

## Rules

- These are layout primitives only - no business logic
- Do not add event-specific content here (names, scores, etc.)
- Keep them generic enough to work in any composition
