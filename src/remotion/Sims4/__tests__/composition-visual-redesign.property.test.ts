/**
 * Bug condition exploration test for composition visual redesign.
 * Uses fast-check to verify that affected compositions contain zero emoji characters.
 *
 * This test is EXPECTED TO FAIL on unfixed code — failure confirms the bug exists.
 * SkillsPanelShowcase has already been fixed and should pass.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// The 9 affected compositions (SkillsPanelShowcase already fixed — will not have emoji)
const AFFECTED_COMPOSITIONS = [
  'RAGCycleDiagram',
  'OrchestrationStrategy',
  'ActionQueueBottleneck',
  'AnatomyDiagram',
  'CognitiveReasoningOptions',
  'ToolsInventoryGrid',
  'EventSummary',
  'CodeShowcase',
  'SkillsPanelShowcase',
] as const;

// Emoji Unicode ranges per design spec
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/gu;

function compositionPath(name: string): string {
  return resolve(__dirname, '..', 'compositions', `${name}.tsx`);
}

describe('Feature: composition-visual-redesign', () => {
  describe('Property 1: Fault Condition — No Emoji Characters in Affected Compositions', () => {
    /**
     * **Validates: Requirements 1.1, 1.3, 1.4, 1.6, 1.7, 1.8, 1.9**
     *
     * For any composition in the affected set, the source file must contain
     * zero emoji Unicode characters. All icons should be inline SVG or
     * Lucide React components — never emoji string literals.
     */
    it('for any affected composition, the source contains zero emoji characters', () => {
      const compositionArb = fc.constantFrom(...AFFECTED_COMPOSITIONS);

      fc.assert(
        fc.property(compositionArb, (compositionName) => {
          const filePath = compositionPath(compositionName);
          const source = readFileSync(filePath, 'utf-8');
          const matches = source.match(EMOJI_REGEX);

          expect(
            matches,
            `${compositionName} contains emoji characters: ${matches?.join(', ')}`,
          ).toBeNull();
        }),
        { numRuns: 100 },
      );
    });
  });
});
