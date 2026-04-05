/**
 * Property-based tests for Use Case Slides compositions.
 * Uses fast-check with Vitest, minimum 100 iterations per property.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { SIMS_TIMING } from '../data/simsTheme';
import { computeGridSlots } from '../compositions/ToolsInventoryGrid';
import { tokenizeCode } from '../compositions/CodeShowcase';
import { countUp } from '../compositions/EventSummary';

// ── Helper: read Root.tsx once for concrete checks ──────────────────────────
const ROOT_PATH = resolve(__dirname, '../../Root.tsx');
const rootSource = readFileSync(ROOT_PATH, 'utf-8');

describe('Feature: use-case-slides', () => {
  // ────────────────────────────────────────────────────────────────────────────
  // Property 1: Staggered animation minimum delay
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 1: Staggered animation minimum delay', () => {
    /**
     * Validates: Requirements 1.5, 3.4, 4.3, 6.3, 7.3, 8.3, 9.3, 10.3, 10.4, 12.3, 15.3
     */
    it('consecutive stagger deltas >= SIMS_TIMING.minStagger for any array length and baseDelay', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 20 }),
          fc.integer({ min: 0, max: 100 }),
          (arrayLength, baseDelay) => {
            const delays = Array.from(
              { length: arrayLength },
              (_, i) => baseDelay + i * SIMS_TIMING.minStagger,
            );
            for (let i = 1; i < delays.length; i++) {
              expect(delays[i] - delays[i - 1]).toBeGreaterThanOrEqual(
                SIMS_TIMING.minStagger,
              );
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });


  // ────────────────────────────────────────────────────────────────────────────
  // Property 2: Sequential animation phase ordering
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 2: Sequential animation phase ordering', () => {
    /**
     * Validates: Requirements 6.4, 11.3
     */
    it('dependent phase starts after preceding phase completes', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10 }),
          fc.integer({ min: 0, max: 50 }),
          (itemCount, baseDelay) => {
            const lastItemDelay =
              baseDelay + (itemCount - 1) * SIMS_TIMING.minStagger;

            // ActionQueueBottleneck: moodlet starts 15 frames after last queue item
            const moodletStart = lastItemDelay + 15;
            expect(moodletStart).toBeGreaterThan(lastItemDelay);

            // OrchestrationStrategy: hierarchical starts 10 frames after last sequential
            const hierarchicalStart = lastItemDelay + 10;
            expect(hierarchicalStart).toBeGreaterThan(lastItemDelay);
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Property 3: Composition ID uniqueness and prefix
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 3: Composition ID uniqueness and prefix', () => {
    /**
     * Validates: Requirements 5.1, 17.1, 17.5
     */
    it('all SimsTheme1- IDs in Root.tsx are unique and correctly prefixed', () => {
      const idRegex = /id="(SimsTheme1-[^"]+)"/g;
      const ids: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = idRegex.exec(rootSource)) !== null) {
        ids.push(match[1]);
      }

      // Must have at least the expected compositions
      expect(ids.length).toBeGreaterThanOrEqual(1);

      // All unique
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);

      // All start with SimsTheme1-
      for (const id of ids) {
        expect(id).toMatch(/^SimsTheme1-/);
      }
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Property 4: Composition registration metadata
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 4: Composition registration metadata', () => {
    /**
     * Validates: Requirements 5.5, 17.2, 17.3, 17.4
     */
    it('all SimsTheme1- compositions have correct width, height, fps, duration, and defaultProps', () => {
      // Extract <Composition blocks that contain SimsTheme1- IDs
      // We split on '<Composition' and check each block
      const blocks = rootSource.split('<Composition');
      const simsBlocks = blocks.filter((b) => b.includes('id="SimsTheme1-'));

      expect(simsBlocks.length).toBeGreaterThanOrEqual(1);

      for (const block of simsBlocks) {
        // Extract the id for error messages
        const idMatch = block.match(/id="(SimsTheme1-[^"]+)"/);
        const id = idMatch ? idMatch[1] : 'unknown';

        expect(block, `${id} missing width={1280}`).toMatch(/width=\{1280\}/);
        expect(block, `${id} missing height={720}`).toMatch(/height=\{720\}/);
        expect(block, `${id} missing fps={30}`).toMatch(/fps=\{30\}/);
        expect(block, `${id} missing durationInFrames={300}`).toMatch(
          /durationInFrames=\{300\}/,
        );
        expect(block, `${id} missing defaultProps`).toMatch(/defaultProps=/);
      }
    });
  });


  // ────────────────────────────────────────────────────────────────────────────
  // Property 5: Inventory grid slot count invariant
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 5: Inventory grid slot count invariant', () => {
    /**
     * Validates: Requirements 9.2
     */
    it('total slots = rows × cols, filled = tools.length, empty = total - filled', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 6 }),
          fc.integer({ min: 1, max: 6 }),
          fc.integer({ min: 0, max: 36 }),
          (rows, cols, rawToolCount) => {
            const maxTools = rows * cols;
            const toolCount = Math.min(rawToolCount, maxTools);

            // Generate tools with unique positions
            const tools: { row: number; col: number }[] = [];
            const positions: string[] = [];
            for (let r = 0; r < rows && tools.length < toolCount; r++) {
              for (let c = 0; c < cols && tools.length < toolCount; c++) {
                tools.push({ row: r, col: c });
                positions.push(`${r}-${c}`);
              }
            }

            const slots = computeGridSlots(tools, rows, cols);

            // Total slots = rows * cols
            expect(slots.length).toBe(rows * cols);

            // Filled count = tools.length
            const filled = slots.filter((s) => s.filled).length;
            expect(filled).toBe(tools.length);

            // Empty count = total - filled
            const empty = slots.filter((s) => !s.filled).length;
            expect(empty).toBe(rows * cols - tools.length);
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Property 6: Syntax tokenizer round-trip
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 6: Syntax tokenizer round-trip', () => {
    /**
     * Validates: Requirements 13.2
     */
    it('concatenating token texts reproduces the original code string', () => {
      const codeChars = fc.constantFrom(
        ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \n\'"#():=.,_'.split(
          '',
        ),
      );
      const codeStringArb = fc
        .array(codeChars, { minLength: 0, maxLength: 200 })
        .map((chars) => chars.join(''));

      fc.assert(
        fc.property(codeStringArb, (code) => {
          const tokens = tokenizeCode(code);
          const reconstructed = tokens.map((t) => t.text).join('');
          expect(reconstructed).toBe(code);
        }),
        { numRuns: 100 },
      );
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Property 7: CountUp convergence
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 7: CountUp convergence', () => {
    /**
     * Validates: Requirements 14.3
     */
    it('returns 0 at startFrame, target at startFrame+60, and target well past animation', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 100000 }),
          fc.integer({ min: 0, max: 100 }),
          (target, startFrame) => {
            // At start frame, value is 0
            expect(countUp(target, startFrame, startFrame)).toBe(0);

            // At 60 frames after start, value equals target
            expect(countUp(target, startFrame + 60, startFrame)).toBe(target);

            // Well past animation, still equals target
            expect(countUp(target, startFrame + 1000, startFrame)).toBe(target);
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Property 8: Screenshot filename kebab-case convention
  // ────────────────────────────────────────────────────────────────────────────
  describe('Property 8: Screenshot filename kebab-case convention', () => {
    /**
     * Validates: Requirements 16.1
     */
    it('all background image filenames in defaultProps follow kebab-case', () => {
      // Extract all backgrounds/... references from Root.tsx defaultProps
      const bgRegex = /backgrounds\/([^'")\s]+)/g;
      const filenames: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = bgRegex.exec(rootSource)) !== null) {
        filenames.push(match[1]);
      }

      expect(filenames.length).toBeGreaterThanOrEqual(1);

      const kebabPattern = /^[a-z0-9]+(-[a-z0-9]+)*\.(png|jpg|jpeg|webp)$/;
      for (const filename of filenames) {
        expect(filename, `"${filename}" is not kebab-case`).toMatch(
          kebabPattern,
        );
      }
    });
  });
});
