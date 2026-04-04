/**
 * Shared Animation Primitives
 * 
 * Reusable animation helpers for all freelancer video templates.
 * Import these instead of re-implementing spring/fade/slide patterns.
 * 
 * Usage:
 *   import { useSpringEntrance, fadeIn, slideIn, CountUp } from '../_shared/animations';
 */

import { spring, interpolate } from "remotion";

// ── Spring Configs ──────────────────────────────────────────────
// Use these as the `config` param for spring(). Pick by feel:
//   SPRING.default  - standard entrance (most elements)
//   SPRING.snappy   - quick pop-in (badges, icons)
//   SPRING.gentle   - slow float-in (backgrounds, large elements)
//   SPRING.bouncy   - playful overshoot (fun/creative themes)

export const SPRING = {
  default: { damping: 14, stiffness: 120 },
  snappy: { damping: 18, stiffness: 200 },
  gentle: { damping: 20, stiffness: 80 },
  bouncy: { damping: 10, stiffness: 150 },
} as const;

// ── Spring Entrance ─────────────────────────────────────────────
// Returns 0→1 spring value. Use for opacity + transform combos.
export function springEntrance(
  frame: number,
  fps: number,
  delay: number,
  config: { damping: number; stiffness: number } = SPRING.default,
) {
  return spring({ frame: frame - delay, fps, config });
}

// ── Fade In ─────────────────────────────────────────────────────
// Simple opacity interpolation with clamp.
export function fadeIn(
  frame: number,
  startFrame: number,
  duration: number = 20,
) {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
}

// ── Fade Out ────────────────────────────────────────────────────
export function fadeOut(
  frame: number,
  startFrame: number,
  duration: number = 20,
) {
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
}

// ── Slide In ────────────────────────────────────────────────────
// Returns a pixel offset for translateX or translateY.
// direction: "left" | "right" | "up" | "down"
// distance: pixels to travel (default 40)
export function slideIn(
  springValue: number,
  direction: "left" | "right" | "up" | "down" = "left",
  distance: number = 40,
): number {
  const from = direction === "left" || direction === "up" ? -distance : distance;
  return interpolate(springValue, [0, 1], [from, 0]);
}

// ── Scale In ────────────────────────────────────────────────────
export function scaleIn(
  frame: number,
  startFrame: number,
  duration: number = 20,
  from: number = 0.8,
) {
  return interpolate(frame, [startFrame, startFrame + duration], [from, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
}

// ── Stagger Delay Calculator ────────────────────────────────────
// Returns the delay frame for item at index `i` in a staggered list.
// baseDelay: when the first item starts
// staggerGap: frames between each item (min 20 per steering rules)
export function staggerDelay(
  index: number,
  baseDelay: number,
  staggerGap: number = 20,
): number {
  return baseDelay + index * staggerGap;
}
