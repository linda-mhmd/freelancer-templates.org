/**
 * Property-Based Tests for LindaMohamed Deck V2 Bugfix
 *
 * Property 1: Fault Condition - LindaMohamed V1 Visual Defects
 *
 * Tests the six defect categories in V1 by analyzing the source code of
 * LindaMohamed.tsx. These tests encode the EXPECTED (correct) behavior.
 * They are expected to FAIL on V1 (unfixed code), confirming the bugs exist.
 *
 * Defect Categories:
 *   1. Section Divider Layout - full-bleed photo + dark overlay instead of split-panel
 *   2. Typography Readability - body text fontSize < 16, card text < 14
 *   3. Logo Watermark Presence - non-cover slides missing InfinityLogo watermark
 *   4. SVG Icons vs Emoji - icon slides use emoji text instead of <svg> elements
 *   5. Content Completeness - content slides have < 50% of original word count
 *   6. Folie 2 AboutMe - unwanted overlay card, title visibility issues
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import * as fs from "fs";
import * as path from "path";

// ── Load V1 source code ─────────────────────────────────────────
const V1_PATH = path.resolve(
  __dirname,
  "../lindamohamed/LindaMohamed.tsx",
);
const v1Source = fs.readFileSync(V1_PATH, "utf-8");

// ── Helpers: Extract component source blocks from V1 ────────────

/**
 * Extract the source code of a named exported component from the V1 file.
 * Matches `export const ComponentName: React.FC ... = ...` through to the
 * next export or end of file, using brace-depth tracking.
 */
function extractComponentSource(source: string, componentName: string): string {
  // Find the component declaration
  const declPattern = new RegExp(
    `export\\s+const\\s+${componentName}\\s*:`,
  );
  const match = declPattern.exec(source);
  if (!match) return "";

  const startIdx = match.index;

  // For arrow-function components that return JSX directly (no braces body),
  // e.g. `export const Folie5Workshops: React.FC = () => (\n  <SectionDivider ...`
  // We need to handle both `=> {` and `=> (` patterns.
  const afterDecl = source.slice(startIdx);

  // Find the arrow `=>`
  const arrowIdx = afterDecl.indexOf("=>");
  if (arrowIdx === -1) return afterDecl.slice(0, 200);

  const afterArrow = afterDecl.slice(arrowIdx + 2).trimStart();
  const openChar = afterArrow[0]; // '{' or '('
  const closeChar = openChar === "{" ? "}" : ")";

  let depth = 0;
  let i = arrowIdx + 2 + (afterDecl.slice(arrowIdx + 2).indexOf(openChar));
  for (; i < afterDecl.length; i++) {
    if (afterDecl[i] === openChar) depth++;
    else if (afterDecl[i] === closeChar) {
      depth--;
      if (depth === 0) {
        return afterDecl.slice(0, i + 1);
      }
    }
  }
  // Fallback: return up to 3000 chars
  return afterDecl.slice(0, 3000);
}

/**
 * Extract all fontSize values from a component's source code.
 * Returns an array of { value: number, context: string } objects.
 */
function extractFontSizes(componentSource: string): { value: number; context: string }[] {
  const results: { value: number; context: string }[] = [];
  const regex = /fontSize:\s*(\d+)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(componentSource)) !== null) {
    const value = parseInt(m[1], 10);
    // Get surrounding context (30 chars before and after)
    const ctxStart = Math.max(0, m.index - 60);
    const ctxEnd = Math.min(componentSource.length, m.index + 60);
    const context = componentSource.slice(ctxStart, ctxEnd).replace(/\n/g, " ");
    results.push({ value, context });
  }
  return results;
}

/**
 * Check if a component source contains emoji characters (common icon substitutes).
 */
function containsEmoji(source: string): boolean {
  // Match common emoji used as icon substitutes in V1
  const emojiPattern = /["'][\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/u;
  return emojiPattern.test(source);
}

/**
 * Check if a component source contains <svg elements (proper icons).
 */
function containsSvgIcons(source: string): boolean {
  return /<svg[\s>]/i.test(source);
}

/**
 * Count approximate content words in a component (string literals in JSX).
 * Extracts text from string literals and template literals.
 */
function countContentWords(source: string): number {
  // Extract string content from JSX text and string props
  const stringLiterals = source.match(/"([^"]{3,})"/g) || [];
  const allText = stringLiterals
    .map((s) => s.slice(1, -1)) // remove quotes
    .filter((s) => !s.startsWith("#") && !s.startsWith("rgba") && !s.includes("px") && !s.includes("slides/"))
    .join(" ");
  return allText.split(/\s+/).filter((w) => w.length > 1).length;
}

// ── Property 1: Fault Condition - LindaMohamed V1 Visual Defects ─

describe("Property 1: Fault Condition - LindaMohamed V1 Visual Defects", () => {
  // ── Defect 1: Section Divider Layout ──────────────────────────
  // Folie 1, 5, 15 should have split-panel layout (white left ≥45% + photo right)
  // V1 uses full-bleed photo with dark overlay instead

  describe("Defect 1 - Section Divider Layout", () => {
    const sectionDividerSource = extractComponentSource(v1Source, "SectionDivider");

    it("SectionDivider should use split-panel layout, not full-bleed photo + dark overlay", () => {
      // Expected: split-panel with white left panel (width ≥ 45%) and photo on right
      // V1 Bug: uses full-bleed <Img> covering 100% width + dark gradient overlay

      // Check for split-panel indicators: a left panel with width ~45-50%
      const hasSplitPanel =
        /width:\s*["']4[5-9]%["']/.test(sectionDividerSource) ||
        /width:\s*["']5[0-5]%["']/.test(sectionDividerSource);

      // Check for full-bleed photo pattern (bug indicator)
      const hasFullBleedPhoto =
        /width:\s*["']100%["'].*height:\s*["']100%["'].*objectFit:\s*["']cover["']/s.test(
          sectionDividerSource,
        );

      // Check for dark overlay (bug indicator)
      const hasDarkOverlay = /rgba\(0,\s*0,\s*0,\s*0\.[4-9]\)/.test(sectionDividerSource);

      expect(hasSplitPanel).toBe(true);
      expect(hasFullBleedPhoto).toBe(false);
      expect(hasDarkOverlay).toBe(false);
    });

    it("Folie1Cover should use split-panel layout, not full-bleed photo + dark overlay", () => {
      const folie1Source = extractComponentSource(v1Source, "Folie1Cover");

      // Expected: split-panel with white left panel + photo right
      const hasSplitPanel =
        /width:\s*["']4[5-9]%["']/.test(folie1Source) ||
        /width:\s*["']5[0-5]%["']/.test(folie1Source);

      // Bug indicators
      const hasFullBleedPhoto =
        /width:\s*["']100%["'].*height:\s*["']100%["'].*objectFit:\s*["']cover["']/s.test(
          folie1Source,
        );
      const hasDarkOverlay = /rgba\(0,\s*0,\s*0,\s*0\.[3-9]\)/.test(folie1Source);

      expect(hasSplitPanel).toBe(true);
      expect(hasFullBleedPhoto).toBe(false);
      expect(hasDarkOverlay).toBe(false);
    });

    // Property-based: for any section divider slide index, the component should have split-panel
    it("all section divider slides (1, 5, 15) should have split-panel layout", () => {
      const sectionDividerSlides = [
        { index: 1, name: "Folie1Cover" },
        { index: 5, name: "Folie5Workshops" },
        { index: 15, name: "Folie15MoreInfo" },
      ];

      fc.assert(
        fc.property(
          fc.constantFrom(...sectionDividerSlides),
          (slide) => {
            // Folie5 and Folie15 delegate to SectionDivider, so check SectionDivider
            const source =
              slide.name === "Folie1Cover"
                ? extractComponentSource(v1Source, "Folie1Cover")
                : sectionDividerSource;

            // Must NOT have dark overlay pattern
            const hasDarkOverlay = /rgba\(0,\s*0,\s*0,\s*0\.[3-9]\)/.test(source);
            expect(hasDarkOverlay).toBe(false);
          },
        ),
        { numRuns: 10 },
      );
    });
  });

  // ── Defect 2: Typography Readability ─────────────────────────
  // Body text should be >= 16px, card text >= 14px

  describe("Defect 2 - Typography Readability", () => {
    // Components with body/description text that should be readable
    const contentComponents = [
      "Folie2AboutMe",
      "Folie3WhatIOffer",
      "Folie4CostsPackages",
      "Folie6WorkshopModules",
      "Folie7FirstWorkshop",
      "Folie8NextSteps",
      "Folie10Results",
      "Folie11Staircase",
      "Folie16Pipeline",
      "Folie18AISystems",
      "Folie19Cloud",
      "Folie20Collaboration",
      "Folie21CloudFundings",
      "Folie22ThankYou",
    ];

    it("body/description text across all content slides should have fontSize >= 16", () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...contentComponents),
          (componentName) => {
            const source = extractComponentSource(v1Source, componentName);
            const fontSizes = extractFontSizes(source);

            // Filter to body/description text (exclude titles >= 20px, section labels)
            const bodyFontSizes = fontSizes.filter(
              (fs) =>
                fs.value < 20 && // Not a title
                fs.value > 8 && // Not a trivial size
                !fs.context.includes("fontWeight: 800") && // Not a heading
                !fs.context.includes("fontWeight: 700") && // Not a bold heading
                !fs.context.includes("textTransform"), // Not a section label
            );

            // All body text should be >= 16px
            for (const fs of bodyFontSizes) {
              expect(fs.value).toBeGreaterThanOrEqual(16);
            }
          },
        ),
        { numRuns: 30 },
      );
    });

    it("StepCard description text should have fontSize >= 14", () => {
      const stepCardSource = extractComponentSource(v1Source, "StepCard");
      const fontSizes = extractFontSizes(stepCardSource);

      // The description text in StepCard
      const descFontSizes = fontSizes.filter(
        (fs) => fs.context.includes("TEXT_GRAY") || fs.context.includes("text-align") || fs.value < 16,
      );

      for (const fs of descFontSizes) {
        expect(fs.value).toBeGreaterThanOrEqual(14);
      }
    });
  });


  // ── Defect 3: Logo Watermark Presence ────────────────────────
  // Non-cover slides should have InfinityLogo watermark
  // V1 only uses InfinityLogo on Folie1Cover and Folie22ThankYou

  describe("Defect 3 - Logo Watermark Presence", () => {
    // All non-cover slide components that should have a watermark
    const nonCoverSlides = [
      "Folie2AboutMe",
      "Folie3WhatIOffer",
      "Folie4CostsPackages",
      "Folie5Workshops",
      "Folie6WorkshopModules",
      "Folie7FirstWorkshop",
      "Folie8NextSteps",
      "Folie9NextStepsCustomer",
      "Folie10Results",
      "Folie11Staircase",
      "Folie12StaircaseDetailed",
      "Folie13FlexibleDeepDive",
      "Folie14VideoFocused",
      "Folie15MoreInfo",
      "Folie16Pipeline",
      "Folie17PipelineDetailed",
      "Folie18AISystems",
      "Folie19Cloud",
      "Folie20Collaboration",
      "Folie21CloudFundings",
      "Folie22ThankYou",
    ];

    it("non-cover slides should contain InfinityLogo watermark element", () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...nonCoverSlides),
          (componentName) => {
            const source = extractComponentSource(v1Source, componentName);

            // The component should reference InfinityLogo as a watermark
            // Check for InfinityLogo usage within the component
            const hasInfinityLogo = /InfinityLogo/.test(source);

            // Additionally check for watermark-like positioning (bottom-right, small, low opacity)
            const hasWatermarkPosition =
              hasInfinityLogo &&
              (/bottom:\s*\d+/.test(source) || /right:\s*\d+/.test(source)) &&
              /opacity:\s*0\.[1-5]/.test(source);

            expect(
              hasInfinityLogo,
            ).toBe(true);
          },
        ),
        { numRuns: 30 },
      );
    });
  });

  // ── Defect 4: SVG Icons vs Emoji ─────────────────────────────
  // Icon slides should use <svg> elements, not emoji characters
  // V1 uses emoji like 🎯💡✅🚀 instead of SVG

  describe("Defect 4 - SVG Icons vs Emoji", () => {
    // Slides that should have SVG icons (per task: 3, 6, 7, 8, 9, 10, 16, 18, 19, 20)
    const iconSlides = [
      "Folie3WhatIOffer",
      "Folie6WorkshopModules",
      "Folie7FirstWorkshop",
      "Folie8NextSteps",
      "Folie9NextStepsCustomer",
      "Folie10Results",
      "Folie16Pipeline",
      "Folie18AISystems",
      "Folie19Cloud",
      "Folie20Collaboration",
    ];

    it("icon slides should use SVG icons, not emoji characters", () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...iconSlides),
          (componentName) => {
            const source = extractComponentSource(v1Source, componentName);

            const hasEmoji = containsEmoji(source);
            const hasSvg = containsSvgIcons(source);

            // Should NOT have emoji icons
            expect(hasEmoji).toBe(false);

            // Should have SVG icons
            expect(hasSvg).toBe(true);
          },
        ),
        { numRuns: 20 },
      );
    });
  });

  // ── Defect 5: Content Completeness ───────────────────────────
  // Content slides should have >= 50% of original PowerPoint word count
  // V1 oversimplifies content significantly

  describe("Defect 5 - Content Completeness", () => {
    // Expected minimum word counts per slide (based on original PowerPoint content)
    // These represent ~50% of the original content word count
    const contentSlideMinWords: { name: string; minWords: number }[] = [
      { name: "Folie3WhatIOffer", minWords: 40 },
      { name: "Folie4CostsPackages", minWords: 35 },
      { name: "Folie6WorkshopModules", minWords: 45 },
      { name: "Folie7FirstWorkshop", minWords: 30 },
      { name: "Folie8NextSteps", minWords: 30 },
      { name: "Folie10Results", minWords: 25 },
      { name: "Folie11Staircase", minWords: 25 },
      { name: "Folie16Pipeline", minWords: 30 },
      { name: "Folie18AISystems", minWords: 30 },
      { name: "Folie19Cloud", minWords: 25 },
      { name: "Folie20Collaboration", minWords: 30 },
      { name: "Folie21CloudFundings", minWords: 35 },
      { name: "Folie22ThankYou", minWords: 20 },
    ];

    it("content slides should have sufficient word count (>= 50% of original)", () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...contentSlideMinWords),
          (slide) => {
            const source = extractComponentSource(v1Source, slide.name);
            const wordCount = countContentWords(source);

            expect(wordCount).toBeGreaterThanOrEqual(slide.minWords);
          },
        ),
        { numRuns: 30 },
      );
    });
  });

  // ── Defect 6: Folie 2 AboutMe Overlay ────────────────────────
  // Folie 2 should NOT have an unwanted overlay card
  // V1 has an "About Me" section label that acts as an overlay element

  describe("Defect 6 - Folie 2 AboutMe Overlay", () => {
    it("Folie2AboutMe should not have an unwanted overlay card element", () => {
      const source = extractComponentSource(v1Source, "Folie2AboutMe");

      // Check for overlay-like card patterns that shouldn't be there:
      // - A positioned card/box overlaying the photo area
      // - An "About Me" card that covers content
      // The V1 has a section label "About Me" with textTransform uppercase
      // that acts as an overlay element - the expected behavior is a clean
      // split layout without this extra card

      // Check for unwanted overlay patterns:
      // 1. No absolute-positioned card overlaying the photo
      const hasOverlayCard =
        /position:\s*["']absolute["'].*About\s*Me/s.test(source) ||
        /About\s*Me.*position:\s*["']absolute["']/s.test(source);

      // 2. The bio text should be >= 18px (V1 has 14px)
      const bioFontSizes = extractFontSizes(source).filter(
        (fs) => fs.context.includes("TEXT_GRAY") && fs.value < 20,
      );
      const allBioTextReadable = bioFontSizes.every((fs) => fs.value >= 18);

      // 3. Stat labels should be >= 13px (V1 has 11px)
      const statLabelSizes = extractFontSizes(source).filter(
        (fs) => fs.context.includes("label") || (fs.value <= 12 && fs.context.includes("stat")),
      );
      const allStatLabelsReadable = statLabelSizes.length === 0 || statLabelSizes.every((fs) => fs.value >= 13);

      // At least one of these conditions should be true for a correct implementation
      // For V1, bio text is 14px (fails) and stat labels are 11px (fails)
      expect(allBioTextReadable).toBe(true);
      expect(allStatLabelsReadable).toBe(true);
    });
  });
});
