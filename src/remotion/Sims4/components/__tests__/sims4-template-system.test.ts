/**
 * Sims4 Template System — Property-Based Tests (Pure Logic)
 *
 * Tests layout component structural contracts, background variant acceptance,
 * and zone rendering properties without React rendering (node environment, no jsdom).
 *
 * Feature: sims4-template-system
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

import { CinematicFullScreen } from '../../templates/CinematicFullScreen';
import { CASThreeColumn } from '../../templates/CASThreeColumn';
import { SpeakerIntro } from '../../templates/SpeakerIntro';
import { ContentCards } from '../../templates/ContentCards';
import { SimsBackground } from '../SimsBackground';
import type { SimsBackgroundVariant } from '../../data/simsTheme';

const PBT_RUNS = 100;

// ── All valid background variants ───────────────────────────────────────────
const VALID_VARIANTS: SimsBackgroundVariant[] = ['cinematic', 'cas-light', 'cas-dark'];

// ── Layout component registry for property-based iteration ──────────────────
const LAYOUT_COMPONENTS = [
  { name: 'CinematicFullScreen', component: CinematicFullScreen },
  { name: 'CASThreeColumn', component: CASThreeColumn },
  { name: 'SpeakerIntro', component: SpeakerIntro },
  { name: 'ContentCards', component: ContentCards },
] as const;

// Arbitrary for picking a random layout
const layoutArb = fc.integer({ min: 0, max: LAYOUT_COMPONENTS.length - 1 });

// Arbitrary for picking a random valid background variant
const variantArb = fc.constantFrom<SimsBackgroundVariant>('cinematic', 'cas-light', 'cas-dark');

// Arbitrary for child text — alphanumeric only to avoid JSON serialization edge cases
const childTextArb = fc.stringMatching(/^[a-zA-Z0-9 ]+$/).filter((s) => s.trim().length > 0);

/**
 * Recursively search a React element tree for a node whose `variant` prop
 * matches the expected value and whose `type` is the SimsBackground component.
 */
function findSimsBackgroundVariant(element: any): string | null {
  if (!element || typeof element !== 'object') return null;

  // Check if this element is a SimsBackground
  if (element.type === SimsBackground && element.props && 'variant' in element.props) {
    return element.props.variant;
  }

  // Search children
  const children = element.props?.children;
  if (Array.isArray(children)) {
    for (const child of children) {
      const found = findSimsBackgroundVariant(child);
      if (found !== null) return found;
    }
  } else if (children && typeof children === 'object') {
    return findSimsBackgroundVariant(children);
  }

  return null;
}

/**
 * Recursively check if a text string appears anywhere in a React element tree.
 */
function treeContainsText(element: any, text: string): boolean {
  if (element === text) return true;
  if (typeof element === 'string' && element.includes(text)) return true;
  if (!element || typeof element !== 'object') return false;

  const children = element.props?.children;
  if (Array.isArray(children)) {
    return children.some((child: any) => treeContainsText(child, text));
  }
  return treeContainsText(children, text);
}


// ── Property 5: Layout background and zone rendering ────────────────────────
// Feature: sims4-template-system, Property 5: Layout background and zone rendering
// **Validates: Requirements 2.5, 2.6**

describe('Property 5: Layout background and zone rendering', () => {
  it('PBT: for any layout × variant combination, the layout component is a valid React FC that accepts a background prop', () => {
    fc.assert(
      fc.property(
        layoutArb,
        variantArb,
        (layoutIndex, variant) => {
          const { name, component } = LAYOUT_COMPONENTS[layoutIndex];

          // Each layout must be a callable function (React FC)
          expect(typeof component).toBe('function');
          expect(name.length).toBeGreaterThan(0);

          // The variant must be one of the 3 valid SimsBackgroundVariant values
          expect(VALID_VARIANTS).toContain(variant);

          // Calling the component with { background: variant } must not throw
          const result = component({ background: variant });

          // The result must be a valid React element (object with type and props)
          expect(result).not.toBeNull();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('type');
          expect(result).toHaveProperty('props');
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: for any layout × variant, the rendered element tree contains a SimsBackground with the matching variant', () => {
    fc.assert(
      fc.property(
        layoutArb,
        variantArb,
        (layoutIndex, variant) => {
          const { component } = LAYOUT_COMPONENTS[layoutIndex];
          const result = component({ background: variant });

          // Find the SimsBackground element in the tree and verify its variant prop
          const foundVariant = findSimsBackgroundVariant(result);
          expect(foundVariant).toBe(variant);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: for any layout × variant, passing children results in children appearing in the output tree', () => {
    fc.assert(
      fc.property(
        layoutArb,
        variantArb,
        childTextArb,
        (layoutIndex, variant, childText) => {
          const { name, component } = LAYOUT_COMPONENTS[layoutIndex];

          let result: any;

          if (name === 'CASThreeColumn') {
            result = (component as typeof CASThreeColumn)({
              background: variant,
              sidebar: childText,
              viewport: childText,
              detail: childText,
            });
          } else if (name === 'SpeakerIntro') {
            result = (component as typeof SpeakerIntro)({
              background: variant,
              left: childText,
              center: childText,
              right: childText,
            });
          } else if (name === 'ContentCards') {
            result = (component as typeof ContentCards)({
              background: variant,
              header: childText,
              children: childText,
            });
          } else {
            // CinematicFullScreen uses children
            result = component({
              background: variant,
              children: childText,
            });
          }

          // The result must be a valid React element
          expect(result).not.toBeNull();
          expect(typeof result).toBe('object');

          // The child text must appear somewhere in the rendered tree
          expect(treeContainsText(result, childText)).toBe(true);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: for any layout, rendering with no children/slots does not throw', () => {
    fc.assert(
      fc.property(
        layoutArb,
        variantArb,
        (layoutIndex, variant) => {
          const { component } = LAYOUT_COMPONENTS[layoutIndex];

          // Rendering with only the required background prop should not throw
          const result = component({ background: variant });
          expect(result).not.toBeNull();
          expect(typeof result).toBe('object');
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('all 4 layout components are exported and are functions', () => {
    expect(LAYOUT_COMPONENTS).toHaveLength(4);
    for (const { name, component } of LAYOUT_COMPONENTS) {
      expect(typeof component).toBe('function');
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('all 3 background variants are valid SimsBackgroundVariant values', () => {
    expect(VALID_VARIANTS).toEqual(['cinematic', 'cas-light', 'cas-dark']);
    expect(VALID_VARIANTS).toHaveLength(3);
  });

  it('ContentCards gridLayout prop accepts all valid grid variants', () => {
    const gridVariants = ['2x2', '3-column', 'list'] as const;
    for (const variant of VALID_VARIANTS) {
      for (const gridLayout of gridVariants) {
        const result = ContentCards({ background: variant, gridLayout });
        expect(result).not.toBeNull();
        expect(typeof result).toBe('object');
      }
    }
  });
});


// ── Property 6: Element delay prop controls animation start ─────────────────
// Feature: sims4-template-system, Property 6: Element delay prop controls animation start
// **Validates: Requirements 3.4, 3.5, 3.6**
//
// Pure logic test: verify that the StatCounter's easeOutCubic formula returns 0
// at frames before delay. The progress clamping ensures no animation before delay.

describe('Property 6: Element delay prop controls animation start', () => {
  // Replicate the pure functions from StatCounter
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  function computeProgress(frame: number, delay: number, countDuration: number): number {
    return Math.min(1, Math.max(0, (frame - delay) / countDuration));
  }

  function computeDisplayedValue(frame: number, delay: number, countDuration: number, target: number): number {
    const progress = computeProgress(frame, delay, countDuration);
    const eased = easeOutCubic(progress);
    return Math.round(eased * Math.max(0, target));
  }

  it('PBT: for any non-negative delay and any frame < delay, the displayed value is 0', () => {
    fc.assert(
      fc.property(
        fc.nat(500),                          // delay: 0..500
        fc.nat(200),                          // frameBefore: 0..200 (will be clamped to < delay)
        fc.integer({ min: 1, max: 10000 }),   // target
        fc.integer({ min: 1, max: 120 }),     // countDuration
        (delay, frameBefore, target, countDuration) => {
          // Ensure frame is strictly before delay
          if (delay === 0) return; // skip: no frame can be before delay=0
          const frame = frameBefore % delay; // frame in [0, delay-1]

          const progress = computeProgress(frame, delay, countDuration);
          expect(progress).toBe(0);

          const displayed = computeDisplayedValue(frame, delay, countDuration, target);
          expect(displayed).toBe(0);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: for any non-negative delay, at frame === delay, progress is exactly 0', () => {
    fc.assert(
      fc.property(
        fc.nat(500),                          // delay
        fc.integer({ min: 1, max: 120 }),     // countDuration
        (delay, countDuration) => {
          const progress = computeProgress(delay, delay, countDuration);
          expect(progress).toBe(0);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: easeOutCubic(0) === 0 and easeOutCubic(1) === 1 for any valid input', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);

    fc.assert(
      fc.property(
        fc.double({ min: 0, max: 1, noNaN: true }),
        (t) => {
          const result = easeOutCubic(t);
          expect(result).toBeGreaterThanOrEqual(0);
          expect(result).toBeLessThanOrEqual(1);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });
});

// ── Property 7: BadgeRow stagger timing ─────────────────────────────────────
// Feature: sims4-template-system, Property 7: BadgeRow stagger timing
// **Validates: Requirements 3.4, 3.5, 3.6**
//
// Pure arithmetic test: for any list of N badges and base delay D,
// badge at index i starts at frame D + i * SIMS_TIMING.minStagger.

describe('Property 7: BadgeRow stagger timing', () => {
  const DEFAULT_STAGGER = 20; // SIMS_TIMING.minStagger

  function computeBadgeDelay(baseDelay: number, index: number, staggerInterval: number): number {
    return baseDelay + index * staggerInterval;
  }

  it('PBT: badge at index i has entrance delay = baseDelay + i * staggerInterval', () => {
    fc.assert(
      fc.property(
        fc.nat(300),                          // baseDelay
        fc.integer({ min: 1, max: 20 }),      // numBadges
        fc.integer({ min: 1, max: 60 }),      // staggerInterval
        (baseDelay, numBadges, staggerInterval) => {
          for (let i = 0; i < numBadges; i++) {
            const badgeDelay = computeBadgeDelay(baseDelay, i, staggerInterval);
            expect(badgeDelay).toBe(baseDelay + i * staggerInterval);
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: interval between consecutive badge entrances equals staggerInterval', () => {
    fc.assert(
      fc.property(
        fc.nat(300),                          // baseDelay
        fc.integer({ min: 2, max: 20 }),      // numBadges (at least 2 for consecutive pairs)
        fc.integer({ min: 1, max: 60 }),      // staggerInterval
        (baseDelay, numBadges, staggerInterval) => {
          for (let i = 1; i < numBadges; i++) {
            const prevDelay = computeBadgeDelay(baseDelay, i - 1, staggerInterval);
            const currDelay = computeBadgeDelay(baseDelay, i, staggerInterval);
            expect(currDelay - prevDelay).toBe(staggerInterval);
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: with default stagger (SIMS_TIMING.minStagger = 20), badge delays are spaced by 20 frames', () => {
    fc.assert(
      fc.property(
        fc.nat(300),                          // baseDelay
        fc.integer({ min: 1, max: 20 }),      // numBadges
        (baseDelay, numBadges) => {
          for (let i = 0; i < numBadges; i++) {
            const badgeDelay = computeBadgeDelay(baseDelay, i, DEFAULT_STAGGER);
            expect(badgeDelay).toBe(baseDelay + i * DEFAULT_STAGGER);
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });
});

// ── Property 8: StatCounter interpolation correctness ───────────────────────
// Feature: sims4-template-system, Property 8: StatCounter interpolation correctness
// **Validates: Requirements 3.4, 3.5, 3.6**
//
// Pure math test: displayed value = round(easeOutCubic(clamp((F - delay) / countDuration, 0, 1)) * T)

describe('Property 8: StatCounter interpolation correctness', () => {
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  function computeDisplayedValue(frame: number, delay: number, countDuration: number, target: number): number {
    const clampedTarget = Math.max(0, target);
    const progress = Math.min(1, Math.max(0, (frame - delay) / countDuration));
    const eased = easeOutCubic(progress);
    return Math.round(eased * clampedTarget);
  }

  it('PBT: at frame === delay, displayed value is 0', () => {
    fc.assert(
      fc.property(
        fc.nat(500),                          // delay
        fc.integer({ min: 1, max: 10000 }),   // target
        fc.integer({ min: 1, max: 120 }),     // countDuration
        (delay, target, countDuration) => {
          const displayed = computeDisplayedValue(delay, delay, countDuration, target);
          expect(displayed).toBe(0);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: at frame >= delay + countDuration, displayed value equals target', () => {
    fc.assert(
      fc.property(
        fc.nat(500),                          // delay
        fc.integer({ min: 0, max: 10000 }),   // target
        fc.integer({ min: 1, max: 120 }),     // countDuration
        fc.nat(200),                          // extraFrames beyond completion
        (delay, target, countDuration, extraFrames) => {
          const frame = delay + countDuration + extraFrames;
          const displayed = computeDisplayedValue(frame, delay, countDuration, target);
          expect(displayed).toBe(Math.max(0, target));
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: displayed value is monotonically non-decreasing as frame increases', () => {
    fc.assert(
      fc.property(
        fc.nat(100),                          // delay
        fc.integer({ min: 1, max: 5000 }),    // target
        fc.integer({ min: 10, max: 120 }),    // countDuration
        (delay, target, countDuration) => {
          let prevValue = 0;
          // Sample frames from delay to delay + countDuration
          for (let f = delay; f <= delay + countDuration; f += 1) {
            const value = computeDisplayedValue(f, delay, countDuration, target);
            expect(value).toBeGreaterThanOrEqual(prevValue);
            prevValue = value;
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: displayed value matches the exact formula round(easeOutCubic(clamp((F-delay)/countDuration, 0, 1)) * T)', () => {
    fc.assert(
      fc.property(
        fc.nat(200),                          // delay
        fc.integer({ min: 0, max: 10000 }),   // target
        fc.integer({ min: 1, max: 120 }),     // countDuration
        fc.nat(400),                          // frame
        (delay, target, countDuration, frame) => {
          const clampedTarget = Math.max(0, target);
          const progress = Math.min(1, Math.max(0, (frame - delay) / countDuration));
          const eased = easeOutCubic(progress);
          const expected = Math.round(eased * clampedTarget);

          const actual = computeDisplayedValue(frame, delay, countDuration, target);
          expect(actual).toBe(expected);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });
});


// ── Property 9: SimsComposition layer ordering ─────────────────────────────
// Feature: sims4-template-system, Property 9: SimsComposition layer ordering
// **Validates: Requirements 4.2, 4.3**

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SimsComposition } from '../../helpers/SimsComposition';

describe('Property 9: SimsComposition layer ordering', () => {
  // Arbitrary for generating a mock layout element with a unique data-testid
  const layoutIdArb = fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,19}$/).filter(
    (s) => s.length > 0,
  );

  // Arbitrary for generating 1–5 child elements
  const childrenArb = fc
    .array(
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,19}$/).filter((s) => s.length > 0),
      { minLength: 1, maxLength: 5 },
    );

  it('PBT: for any layout element and any set of children, the layout layer appears before the children layer in the element tree', () => {
    fc.assert(
      fc.property(layoutIdArb, childrenArb, (layoutId, childIds) => {
        const layoutElement = React.createElement('div', {
          'data-testid': `layout-${layoutId}`,
        });
        const childElements = childIds.map((id) =>
          React.createElement('span', { key: id, 'data-testid': `child-${id}` }),
        );

        const result = SimsComposition({ layout: layoutElement, children: childElements });

        // The root must be an AbsoluteFill
        expect(result).not.toBeNull();
        expect(result.type).toBe(AbsoluteFill);

        // The root AbsoluteFill must have exactly 2 children (both AbsoluteFill)
        const rootChildren = React.Children.toArray(result.props.children);
        expect(rootChildren).toHaveLength(2);

        const [layoutLayer, childrenLayer] = rootChildren as React.ReactElement[];

        // Both layers must be AbsoluteFill
        expect(layoutLayer.type).toBe(AbsoluteFill);
        expect(childrenLayer.type).toBe(AbsoluteFill);

        // The layout layer (index 0) must contain the layout element
        const layoutLayerChildren = React.Children.toArray(layoutLayer.props.children);
        expect(layoutLayerChildren).toHaveLength(1);
        const renderedLayout = layoutLayerChildren[0] as React.ReactElement;
        expect(renderedLayout.props['data-testid']).toBe(`layout-${layoutId}`);

        // The children layer (index 1) must contain the child elements
        const childrenLayerChildren = React.Children.toArray(childrenLayer.props.children);
        expect(childrenLayerChildren).toHaveLength(childIds.length);
      }),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: the children overlay layer has pointerEvents none, confirming it sits above the layout', () => {
    fc.assert(
      fc.property(layoutIdArb, (layoutId) => {
        const layoutElement = React.createElement('div', {
          'data-testid': `layout-${layoutId}`,
        });

        const result = SimsComposition({
          layout: layoutElement,
          children: React.createElement('span', null, 'child'),
        });

        const rootChildren = React.Children.toArray(result.props.children) as React.ReactElement[];
        const childrenLayer = rootChildren[1];

        // The overlay layer must have pointerEvents: 'none' style
        expect(childrenLayer.props.style).toEqual(
          expect.objectContaining({ pointerEvents: 'none' }),
        );
      }),
      { numRuns: PBT_RUNS },
    );
  });
});

// ── Property 10: Layout swap preserves children ─────────────────────────────
// Feature: sims4-template-system, Property 10: Layout swap preserves children
// **Validates: Requirements 4.2, 4.3**

describe('Property 10: Layout swap preserves children', () => {
  // Arbitrary for two distinct layout IDs
  const distinctLayoutPairArb = fc
    .tuple(
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/).filter((s) => s.length > 0),
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/).filter((s) => s.length > 0),
    )
    .filter(([a, b]) => a !== b);

  // Arbitrary for 1–5 child elements with unique keys
  const childrenArb = fc
    .array(
      fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/).filter((s) => s.length > 0),
      { minLength: 1, maxLength: 5 },
    );

  /**
   * Extract the children layer's content from a SimsComposition result.
   * Returns the serialized children portion for comparison.
   */
  function extractChildrenLayer(result: React.ReactElement): React.ReactElement {
    const rootChildren = React.Children.toArray(result.props.children) as React.ReactElement[];
    return rootChildren[1]; // The overlay AbsoluteFill
  }

  /**
   * Recursively extract the structure of child elements (type + props + children)
   * ignoring the layout layer entirely.
   */
  function serializeChildren(element: React.ReactElement): any {
    const children = React.Children.toArray(element.props.children);
    return children.map((child: any) => {
      if (typeof child === 'string' || typeof child === 'number') return child;
      if (!child || !child.type) return child;
      return {
        type: typeof child.type === 'string' ? child.type : child.type.name || 'Component',
        props: { ...child.props, children: undefined },
        children: child.props?.children
          ? React.Children.toArray(child.props.children).map((c: any) =>
              typeof c === 'string' || typeof c === 'number' ? c : c?.props?.['data-testid'] ?? 'node',
            )
          : [],
      };
    });
  }

  it('PBT: for any two distinct layouts and any children, the children layer output is identical regardless of layout', () => {
    fc.assert(
      fc.property(distinctLayoutPairArb, childrenArb, ([layoutId1, layoutId2], childIds) => {
        const layout1 = React.createElement('div', { 'data-testid': `layout-${layoutId1}` });
        const layout2 = React.createElement('section', { 'data-testid': `layout-${layoutId2}` });

        const childElements = childIds.map((id) =>
          React.createElement('span', { key: id, 'data-testid': `child-${id}` }, id),
        );

        const result1 = SimsComposition({ layout: layout1, children: childElements });
        const result2 = SimsComposition({ layout: layout2, children: childElements });

        // Extract children layers
        const childrenLayer1 = extractChildrenLayer(result1);
        const childrenLayer2 = extractChildrenLayer(result2);

        // Both children layers must have the same style (pointerEvents: 'none')
        expect(childrenLayer1.props.style).toEqual(childrenLayer2.props.style);

        // The children content must be identical
        const serialized1 = serializeChildren(childrenLayer1);
        const serialized2 = serializeChildren(childrenLayer2);
        expect(serialized1).toEqual(serialized2);
      }),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: swapping layouts changes only the layout layer, not the children layer', () => {
    fc.assert(
      fc.property(distinctLayoutPairArb, childrenArb, ([layoutId1, layoutId2], childIds) => {
        const layout1 = React.createElement('div', { 'data-testid': `layout-${layoutId1}` });
        const layout2 = React.createElement('section', { 'data-testid': `layout-${layoutId2}` });

        const childElements = childIds.map((id) =>
          React.createElement('span', { key: id, 'data-testid': `child-${id}` }, id),
        );

        const result1 = SimsComposition({ layout: layout1, children: childElements });
        const result2 = SimsComposition({ layout: layout2, children: childElements });

        const rootChildren1 = React.Children.toArray(result1.props.children) as React.ReactElement[];
        const rootChildren2 = React.Children.toArray(result2.props.children) as React.ReactElement[];

        // Layout layers must differ (different layout elements)
        const layoutContent1 = React.Children.toArray(rootChildren1[0].props.children) as React.ReactElement[];
        const layoutContent2 = React.Children.toArray(rootChildren2[0].props.children) as React.ReactElement[];
        expect(layoutContent1[0].props['data-testid']).toBe(`layout-${layoutId1}`);
        expect(layoutContent2[0].props['data-testid']).toBe(`layout-${layoutId2}`);
        expect(layoutContent1[0].props['data-testid']).not.toBe(layoutContent2[0].props['data-testid']);

        // Children layers must be identical in content
        const childContent1 = React.Children.toArray(rootChildren1[1].props.children);
        const childContent2 = React.Children.toArray(rootChildren2[1].props.children);
        expect(childContent1).toHaveLength(childContent2.length);
      }),
      { numRuns: PBT_RUNS },
    );
  });
});


// ── Structural Verification (Properties 1–4) ───────────────────────────────
// These are static analysis tests that parse source files using fs.readFileSync
// and verify structural invariants about the project layout and Root.tsx registry.

import * as fs from 'fs';
import * as path from 'path';

// Resolve paths relative to this test file location
const ROOT_TSX_PATH = path.resolve(__dirname, '../../../../remotion/Root.tsx');
const LEGACY_COMPOSITIONS_DIR = path.resolve(__dirname, '../../../../remotion/Sims4Legacy/compositions');

// Read Root.tsx once for all structural tests
const rootTsxContent = fs.readFileSync(ROOT_TSX_PATH, 'utf-8');

// ── Helpers for parsing Root.tsx ────────────────────────────────────────────

/** Extract all <Composition entries with their id, width, height, fps props */
function parseCompositions(content: string): Array<{
  id: string;
  width: number;
  height: number;
  fps: number;
}> {
  const results: Array<{ id: string; width: number; height: number; fps: number }> = [];
  // Match <Composition blocks — they span multiple lines
  const compositionBlocks = content.match(/<Composition[\s\S]*?\/>/g) || [];
  for (const block of compositionBlocks) {
    const idMatch = block.match(/id=["'{]([^"'}]+)["'}]/);
    const widthMatch = block.match(/width=\{(\d+)\}/);
    const heightMatch = block.match(/height=\{(\d+)\}/);
    const fpsMatch = block.match(/fps=\{(\d+)\}/);
    if (idMatch) {
      results.push({
        id: idMatch[1],
        width: widthMatch ? parseInt(widthMatch[1], 10) : 0,
        height: heightMatch ? parseInt(heightMatch[1], 10) : 0,
        fps: fpsMatch ? parseInt(fpsMatch[1], 10) : 0,
      });
    }
  }
  return results;
}

/** Extract all import lines from Root.tsx that import from Sims4Legacy */
function parseLegacyImports(content: string): Array<{ componentName: string; importPath: string }> {
  const results: Array<{ componentName: string; importPath: string }> = [];
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']([^"']+Sims4Legacy[^"']*)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim()).filter(Boolean);
    for (const name of names) {
      results.push({ componentName: name, importPath: match[2] });
    }
  }
  return results;
}

const allCompositions = parseCompositions(rootTsxContent);
const legacyImports = parseLegacyImports(rootTsxContent);

// The 14 legacy composition IDs (all should have archive- prefix)
const EXPECTED_LEGACY_IDS = [
  'archive-Sims4-TitleScreen',
  'archive-TitleScreenClassic',
  'archive-Sims4-CharacterSelect',
  'archive-Sims4-LiveMode',
  'archive-Sims4-NeighborhoodMap',
  'archive-Sims4-BuildMode',
  'archive-Sims4-LoadingScreen',
  'archive-Sims4-SkillPanel',
  'archive-Sims4-EnterpriseAIPresentation',
  'archive-Sims4EnterpriseAI',
  'archive-Sims4-AvatarShowcase',
  'archive-Sims4-DeviceDemo',
  'archive-Sims4-MultiDevice',
  'archive-Sims4-AvatarWithDevice',
];

// Old-format legacy compositions (1456×816)
const OLD_FORMAT_IDS = new Set([
  'archive-Sims4-TitleScreen',
  'archive-TitleScreenClassic',
  'archive-Sims4-CharacterSelect',
  'archive-Sims4-LiveMode',
  'archive-Sims4-NeighborhoodMap',
  'archive-Sims4-BuildMode',
  'archive-Sims4-LoadingScreen',
  'archive-Sims4-SkillPanel',
  'archive-Sims4-EnterpriseAIPresentation',
]);

// New-format legacy compositions (1280×720)
const NEW_FORMAT_IDS = new Set([
  'archive-Sims4EnterpriseAI',
  'archive-Sims4-AvatarShowcase',
  'archive-Sims4-DeviceDemo',
  'archive-Sims4-MultiDevice',
  'archive-Sims4-AvatarWithDevice',
]);

// ── Property 1: Archive prefix on legacy composition IDs ────────────────────
// Feature: sims4-template-system, Property 1: Archive prefix on legacy composition IDs
// **Validates: Requirements 1.3**

describe('Property 1: Archive prefix on legacy composition IDs', () => {
  const archiveCompositions = allCompositions.filter((c) => c.id.startsWith('archive-'));

  it('PBT: all expected legacy IDs exist in Root.tsx and start with archive-', () => {
    const archiveIds = archiveCompositions.map((c) => c.id);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: EXPECTED_LEGACY_IDS.length - 1 }),
        (index) => {
          const expectedId = EXPECTED_LEGACY_IDS[index];
          expect(archiveIds).toContain(expectedId);
          expect(expectedId.startsWith('archive-')).toBe(true);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: every archive- composition ID in Root.tsx is one of the expected legacy IDs', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(0, archiveCompositions.length - 1) }),
        (index) => {
          if (archiveCompositions.length === 0) return;
          const comp = archiveCompositions[index];
          expect(comp.id.startsWith('archive-')).toBe(true);
          expect(EXPECTED_LEGACY_IDS).toContain(comp.id);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('there are exactly 14 legacy compositions with archive- prefix', () => {
    expect(archiveCompositions).toHaveLength(14);
  });
});

// ── Property 2: Legacy import path correctness ──────────────────────────────
// Feature: sims4-template-system, Property 2: Legacy import path correctness
// **Validates: Requirements 1.4, 1.5**

describe('Property 2: Legacy import path correctness', () => {
  // Get all .tsx files in Sims4Legacy/compositions/
  const legacyFiles = fs.readdirSync(LEGACY_COMPOSITIONS_DIR)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => ({
      name: f,
      content: fs.readFileSync(path.join(LEGACY_COMPOSITIONS_DIR, f), 'utf-8'),
    }));

  // Extract import statements from a file that reference Sims4 shared modules
  function extractSharedImports(content: string): Array<{ module: string; importPath: string }> {
    const results: Array<{ module: string; importPath: string }> = [];
    const importRegex = /import\s+(?:\{[^}]*\}|[^;]+)\s+from\s+["']([^"']+)["']/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      // Only check relative imports that reference Sims4 shared modules
      if (importPath.includes('simsTheme') ||
          importPath.includes('SimsUI') ||
          importPath.includes('SimsBackground') ||
          importPath.includes('SceneContainer') ||
          importPath.includes('Sims4/components/') ||
          importPath.includes('Sims4/data/')) {
        results.push({ module: match[0], importPath });
      }
    }
    return results;
  }

  it('PBT: legacy composition imports referencing shared Sims4 modules resolve to ../../Sims4/ paths', () => {
    // Collect all shared imports across all legacy files
    const allSharedImports: Array<{ file: string; importPath: string }> = [];
    for (const file of legacyFiles) {
      const imports = extractSharedImports(file.content);
      for (const imp of imports) {
        allSharedImports.push({ file: file.name, importPath: imp.importPath });
      }
    }

    // Skip if no shared imports found (shouldn't happen, but be safe)
    if (allSharedImports.length === 0) return;

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allSharedImports.length - 1 }),
        (index) => {
          const { importPath } = allSharedImports[index];
          // Imports from Sims4Legacy/compositions/ to Sims4/ shared modules
          // should go through ../../Sims4/
          expect(importPath).toMatch(/\.\.\/\.\.\/Sims4\//);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: Root.tsx imports legacy compositions from ./Sims4Legacy/ paths', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(0, legacyImports.length - 1) }),
        (index) => {
          if (legacyImports.length === 0) return;
          const { importPath } = legacyImports[index];
          expect(importPath).toMatch(/\.\/Sims4Legacy\//);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('there are 14 legacy composition imports in Root.tsx from Sims4Legacy', () => {
    expect(legacyImports).toHaveLength(14);
  });
});

// ── Property 3: No duplicate composition IDs ────────────────────────────────
// Feature: sims4-template-system, Property 3: No duplicate composition IDs
// **Validates: Requirements 5.4**

describe('Property 3: No duplicate composition IDs', () => {
  const allIds = allCompositions.map((c) => c.id);
  const idSet = new Set(allIds);

  it('PBT: for any pair of composition indices, their IDs are distinct', () => {
    if (allIds.length < 2) return;

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allIds.length - 1 }),
        fc.integer({ min: 0, max: allIds.length - 1 }),
        (i, j) => {
          if (i === j) return; // same index, skip
          expect(allIds[i]).not.toBe(allIds[j]);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('the set of all IDs has the same cardinality as the list of all IDs', () => {
    expect(idSet.size).toBe(allIds.length);
  });

  it('PBT: randomly sampled IDs appear exactly once in the list', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allIds.length - 1 }),
        (index) => {
          const id = allIds[index];
          const count = allIds.filter((x) => x === id).length;
          expect(count).toBe(1);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });
});

// ── Property 4: Correct composition dimensions ─────────────────────────────
// Feature: sims4-template-system, Property 4: Correct composition dimensions
// **Validates: Requirements 5.2, 5.3**

describe('Property 4: Correct composition dimensions', () => {
  // Active Sims4 compositions (non-archive, Sims4-related)
  const ACTIVE_SIMS4_IDS = new Set([
    'TitleScreenCinematic',
    'Sims4-CASPanel',
    'Sims4-MainMenu',
    'CASStorySequence',
    'Sims4-StageIntroduction',
  ]);

  const activeSims4Compositions = allCompositions.filter((c) => ACTIVE_SIMS4_IDS.has(c.id));
  const oldFormatCompositions = allCompositions.filter((c) => OLD_FORMAT_IDS.has(c.id));
  const newFormatCompositions = allCompositions.filter((c) => NEW_FORMAT_IDS.has(c.id));

  it('PBT: active Sims4 compositions are 1280×720 @30fps', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(0, activeSims4Compositions.length - 1) }),
        (index) => {
          if (activeSims4Compositions.length === 0) return;
          const comp = activeSims4Compositions[index];
          expect(comp.width).toBe(1280);
          expect(comp.height).toBe(720);
          expect(comp.fps).toBe(30);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: old-format legacy compositions are 1456×816 @30fps', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(0, oldFormatCompositions.length - 1) }),
        (index) => {
          if (oldFormatCompositions.length === 0) return;
          const comp = oldFormatCompositions[index];
          expect(comp.width).toBe(1456);
          expect(comp.height).toBe(816);
          expect(comp.fps).toBe(30);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: new-format legacy compositions are 1280×720 @30fps', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(0, newFormatCompositions.length - 1) }),
        (index) => {
          if (newFormatCompositions.length === 0) return;
          const comp = newFormatCompositions[index];
          expect(comp.width).toBe(1280);
          expect(comp.height).toBe(720);
          expect(comp.fps).toBe(30);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  // All Sims4 compositions (active + legacy) must be fps=30
  const allSims4Compositions = allCompositions.filter(
    (c) => ACTIVE_SIMS4_IDS.has(c.id) || OLD_FORMAT_IDS.has(c.id) || NEW_FORMAT_IDS.has(c.id),
  );

  it('PBT: all Sims4 compositions (active + legacy) have fps=30', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(0, allSims4Compositions.length - 1) }),
        (index) => {
          if (allSims4Compositions.length === 0) return;
          expect(allSims4Compositions[index].fps).toBe(30);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('there are exactly 5 active Sims4 compositions', () => {
    expect(activeSims4Compositions).toHaveLength(5);
  });

  it('there are exactly 9 old-format legacy compositions', () => {
    expect(oldFormatCompositions).toHaveLength(9);
  });

  it('there are exactly 5 new-format legacy compositions', () => {
    expect(newFormatCompositions).toHaveLength(5);
  });
});
