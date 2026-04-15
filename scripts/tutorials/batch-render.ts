/**
 * Batch Render Script - ScreencastSlideshow preset-based approach
 *
 * Renders all 18 tutorial presets using the ScreencastSlideshow component.
 * Uses preset names to load slide configurations from the presets registry.
 *
 * Categories:
 * - tutorial (9): Studio basics, editing, CLI, composition, themes, brand, layout, lambda, testimonials-tutorial
 * - showcase (4): Testimonials, product launches, social content, educational
 * - project (4): Agency workflow, content creator, freelancer portfolio, SaaS marketing
 * - design-tips (1): Video design tips
 *
 * Requirements: 9.1
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

/**
 * Configuration for a tutorial preset (new preset-based approach).
 * Uses preset name to load slides from the presets registry.
 */
export interface PresetTutorialConfig {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Human-readable title */
  title: string;
  /** Category for organization (tutorial, showcase, project, design-tips) */
  category: 'tutorial' | 'showcase' | 'project' | 'design-tips';
  /** Preset name matching SLIDE_PRESETS key */
  preset: string;
  /** Number of slides in the preset */
  slideCount: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// ALL TUTORIALS CONFIGURATION
// All 17 presets organized by category
// Requirements: 9.1
// ═══════════════════════════════════════════════════════════════════════════

/**
 * All 18 tutorial presets organized by category.
 * This configuration is used by the batch render script to render all presets.
 *
 * Categories:
 * - tutorial (9): Core Remotion Studio tutorials + testimonials tutorial
 * - showcase (4): Use case showcase tutorials
 * - project (4): Professional workflow tutorials
 * - design-tips (1): Video design principles tutorial
 *
 * Requirements: 9.1
 */
export const ALL_TUTORIALS: PresetTutorialConfig[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Tutorial presets (8)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'studio-basics',
    title: 'Remotion Studio Basics',
    category: 'tutorial',
    preset: 'studio-basics',
    slideCount: 5,
  },
  {
    id: 'editing-props',
    title: 'Editing Props',
    category: 'tutorial',
    preset: 'editing-props',
    slideCount: 5,
  },
  {
    id: 'cli-rendering',
    title: 'CLI Rendering',
    category: 'tutorial',
    preset: 'cli-rendering',
    slideCount: 4,
  },
  {
    id: 'composition-structure',
    title: 'Composition Structure',
    category: 'tutorial',
    preset: 'composition-structure',
    slideCount: 4,
  },
  {
    id: 'custom-themes',
    title: 'Custom Themes',
    category: 'tutorial',
    preset: 'custom-themes',
    slideCount: 4,
  },
  {
    id: 'brand-integration',
    title: 'Brand Integration',
    category: 'tutorial',
    preset: 'brand-integration',
    slideCount: 4,
  },
  {
    id: 'layout-modifications',
    title: 'Layout Modifications',
    category: 'tutorial',
    preset: 'layout-modifications',
    slideCount: 4,
  },
  {
    id: 'lambda-deployment',
    title: 'Lambda Deployment',
    category: 'tutorial',
    preset: 'lambda-deployment',
    slideCount: 4,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Showcase presets (4)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'showcase-testimonials',
    title: 'Testimonial Showcase',
    category: 'showcase',
    preset: 'showcase-testimonials',
    slideCount: 5,
  },
  {
    id: 'showcase-product-launches',
    title: 'Product Launch Showcase',
    category: 'showcase',
    preset: 'showcase-product-launches',
    slideCount: 5,
  },
  {
    id: 'showcase-social-content',
    title: 'Social Content Showcase',
    category: 'showcase',
    preset: 'showcase-social-content',
    slideCount: 5,
  },
  {
    id: 'showcase-educational',
    title: 'Educational Showcase',
    category: 'showcase',
    preset: 'showcase-educational',
    slideCount: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Project presets (4)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'project-agency-workflow',
    title: 'Agency Workflow',
    category: 'project',
    preset: 'project-agency-workflow',
    slideCount: 5,
  },
  {
    id: 'project-content-creator',
    title: 'Content Creator',
    category: 'project',
    preset: 'project-content-creator',
    slideCount: 5,
  },
  {
    id: 'project-freelancer-portfolio',
    title: 'Freelancer Portfolio',
    category: 'project',
    preset: 'project-freelancer-portfolio',
    slideCount: 5,
  },
  {
    id: 'project-saas-marketing',
    title: 'SaaS Marketing',
    category: 'project',
    preset: 'project-saas-marketing',
    slideCount: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Design tips preset (1)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'video-design-tips',
    title: 'Video Design Tips',
    category: 'design-tips',
    preset: 'video-design-tips',
    slideCount: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Testimonials tutorial preset (1)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'testimonials-tutorial',
    title: 'Testimonials Tutorial',
    category: 'tutorial',
    preset: 'testimonials-tutorial',
    slideCount: 6,
  },
];

// Legacy tutorials configuration (kept for backward compatibility)
interface TutorialConfig {
  id: string;
  title: string;
  category: string;
  screenshots: string[];
  frameDuration?: number;
  annotations?: Array<{
    text: string;
    x: number;
    y: number;
    startSlide: number;
    endSlide?: number;
  }>;
}

// Legacy tutorial configurations (deprecated - use ALL_TUTORIALS instead)
const tutorials: TutorialConfig[] = [
  {
    id: 'open-props-panel',
    title: 'Opening the Props Panel',
    category: 'studio-basics',
    screenshots: [
      'tutorials/demo/studio-overview.png',
      'tutorials/demo/props-hover.png',
      'tutorials/demo/props-open.png',
    ],
    annotations: [
      { text: '1. Locate the Props icon', x: 50, y: 120, startSlide: 0 },
      { text: '2. Hover to preview', x: 50, y: 120, startSlide: 1 },
      { text: '3. Click to open panel', x: 50, y: 120, startSlide: 2 },
    ],
  },
  {
    id: 'timeline-scrubber',
    title: 'Using the Timeline',
    category: 'studio-basics',
    screenshots: [
      'tutorials/demo/timeline-start.png',
      'tutorials/demo/timeline-middle.png',
      'tutorials/demo/timeline-end.png',
    ],
    annotations: [
      { text: 'Drag the playhead to scrub', x: 400, y: 600, startSlide: 0, endSlide: 2 },
    ],
  },
  {
    id: 'edit-text-prop',
    title: 'Editing Text Properties',
    category: 'editing-props',
    screenshots: [
      'tutorials/demo/props-panel.png',
      'tutorials/demo/text-field-focus.png',
      'tutorials/demo/text-edited.png',
    ],
    annotations: [
      { text: '1. Find the text field', x: 850, y: 180, startSlide: 0 },
      { text: '2. Click to edit', x: 850, y: 180, startSlide: 1 },
      { text: '3. Type your content', x: 850, y: 180, startSlide: 2 },
    ],
  },
  {
    id: 'basic-render',
    title: 'CLI Rendering Basics',
    category: 'cli-rendering',
    screenshots: [
      'tutorials/demo/terminal-empty.png',
      'tutorials/demo/terminal-command.png',
      'tutorials/demo/terminal-progress.png',
      'tutorials/demo/terminal-complete.png',
    ],
    annotations: [
      { text: 'Open your terminal', x: 50, y: 50, startSlide: 0 },
      { text: 'npx remotion render <composition>', x: 50, y: 50, startSlide: 1 },
      { text: 'Watch the progress...', x: 50, y: 50, startSlide: 2 },
      { text: 'Done! Check output folder', x: 50, y: 50, startSlide: 3 },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PRESET-BASED RENDER FUNCTION
// Renders presets using composition ID format: ScreencastSlideshow-{PascalCase}
// Requirements: 9.2, 9.3, 9.5
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Converts a kebab-case preset ID to PascalCase for composition ID.
 * Example: 'showcase-testimonials' -> 'ShowcaseTestimonials'
 */
function toPascalCase(kebabCase: string): string {
  return kebabCase
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Renders a preset tutorial using the preset-based composition approach.
 * Generates MP4, GIF, and poster image for each preset.
 * Output is organized by category and preset ID.
 *
 * Error Handling (Requirement 9.4):
 * - Throws an error if any render step (MP4, GIF, or poster) fails
 * - The caller (main function) catches these errors and continues with remaining presets
 * - Failed presets are tracked and reported at the end of the batch
 *
 * Requirements: 9.2, 9.3, 9.4, 9.5
 *
 * @param config - The preset tutorial configuration
 * @param index - Current index in the batch (for progress reporting)
 * @param total - Total number of presets being rendered (for progress reporting)
 * @param verbose - Whether to output detailed progress
 * @throws Error if any render step fails (MP4, GIF, or poster)
 */
async function renderPresetTutorial(
  config: PresetTutorialConfig,
  index: number,
  total: number,
  verbose: boolean = true
): Promise<void> {
  // Progress reporting (Requirement 9.3)
  const progress = `[${index + 1}/${total}]`;
  console.log(`\n${progress} [RENDER] ${config.title} (${config.category})`);

  // Output organized by category and preset ID (Requirement 9.5)
  const outputDir = `static/tutorials/${config.category}/${config.id}`;
  fs.mkdirSync(outputDir, { recursive: true });

  // Composition ID uses PascalCase format
  const compositionId = `ScreencastSlideshow-${toPascalCase(config.id)}`;

  // Calculate frame range based on slide count
  const frameDuration = 90; // Default frame duration per slide
  const durationFrames = config.slideCount * frameDuration;
  const frameRange = `0-${durationFrames - 1}`;

  // Props for the preset-based composition
  const props = { preset: config.preset };
  const propsJson = JSON.stringify(props).replace(/'/g, "'\\''");

  // Render MP4 (Requirement 9.2)
  if (verbose) console.log(`  ${progress} Rendering MP4...`);
  try {
    execSync(
      `npx remotion render src/remotion/index.ts ${compositionId} ${outputDir}/${config.id}.mp4 ` +
        `--props='${propsJson}' --frames=${frameRange} --public-dir=src/remotion/public`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
    if (verbose) console.log(`    ✓ MP4 done`);
  } catch (e) {
    throw new Error(`MP4 render failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Render GIF (Requirement 9.2)
  if (verbose) console.log(`  ${progress} Rendering GIF...`);
  try {
    execSync(
      `npx remotion render src/remotion/index.ts ${compositionId} ${outputDir}/${config.id}.gif ` +
        `--props='${propsJson}' --frames=${frameRange} --codec=gif --public-dir=src/remotion/public`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
    if (verbose) console.log(`    ✓ GIF done`);
  } catch (e) {
    throw new Error(`GIF render failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Render poster image (Requirement 9.2)
  if (verbose) console.log(`  ${progress} Rendering poster...`);
  try {
    execSync(
      `npx remotion still src/remotion/index.ts ${compositionId} ${outputDir}/${config.id}-poster.png ` +
        `--props='${propsJson}' --frame=0 --public-dir=src/remotion/public`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
    if (verbose) console.log(`    ✓ Poster done`);
  } catch (e) {
    throw new Error(`Poster render failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  console.log(`  ${progress} [DONE] ${config.id} -> ${outputDir}/`);
}

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY RENDER FUNCTION (deprecated)
// Kept for backward compatibility with old screenshot-based tutorials
// ═══════════════════════════════════════════════════════════════════════════

async function renderTutorial(config: TutorialConfig, verbose: boolean = true) {
  if (verbose) console.log(`\n[RENDER] ${config.title}`);

  const outputDir = `static/tutorials/${config.category}`;
  fs.mkdirSync(outputDir, { recursive: true });

  const frameDuration = config.frameDuration || 45;
  const durationFrames = config.screenshots.length * frameDuration;
  const frameRange = `0-${durationFrames - 1}`;

  // Escape the props JSON for shell
  const props = {
    screenshots: config.screenshots,
    title: config.title,
    annotations: config.annotations || [],
    frameDuration,
    transitionDuration: 15,
  };
  const propsJson = JSON.stringify(props).replace(/'/g, "'\\''");

  // Render MP4
  if (verbose) console.log('  - Rendering MP4...');
  try {
    execSync(
      `npx remotion render src/remotion/index.ts ScreencastSlideshow ${outputDir}/${config.id}.mp4 ` +
      `--props='${propsJson}' --frames=${frameRange} --public-dir=src/remotion/public`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
    if (verbose) console.log('    ✓ MP4 done');
  } catch (e) {
    console.error('    ✗ MP4 failed:', e);
  }

  // Render GIF
  if (verbose) console.log('  - Rendering GIF...');
  try {
    execSync(
      `npx remotion render src/remotion/index.ts ScreencastSlideshow ${outputDir}/${config.id}.gif ` +
      `--props='${propsJson}' --frames=${frameRange} --codec=gif --public-dir=src/remotion/public`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
    if (verbose) console.log('    ✓ GIF done');
  } catch (e) {
    console.error('    ✗ GIF failed:', e);
  }

  // Render poster
  if (verbose) console.log('  - Rendering poster...');
  try {
    execSync(
      `npx remotion still src/remotion/index.ts ScreencastSlideshow ${outputDir}/${config.id}-poster.png ` +
      `--props='${propsJson}' --frame=0 --public-dir=src/remotion/public`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
    if (verbose) console.log('    ✓ Poster done');
  } catch (e) {
    console.error('    ✗ Poster failed:', e);
  }

  if (verbose) console.log(`  [DONE] ${config.id}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// Supports both preset-based and legacy rendering modes
// Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Prints usage information for the batch render script.
 */
function printUsage(): void {
  console.log(`
Usage: npx ts-node scripts/tutorials/batch-render.ts [options]

Options:
  --presets           Use preset-based rendering (recommended, default)
  --legacy            Use legacy screenshot-based rendering
  --id=<preset-id>    Render only the specified preset/tutorial
  --category=<cat>    Render only presets in the specified category
                      (tutorial, showcase, project, design-tips)
  --quiet             Suppress verbose output
  --help              Show this help message

Examples:
  npx ts-node scripts/tutorials/batch-render.ts --presets
  npx ts-node scripts/tutorials/batch-render.ts --presets --id=showcase-testimonials
  npx ts-node scripts/tutorials/batch-render.ts --presets --category=showcase
  npx ts-node scripts/tutorials/batch-render.ts --legacy --id=open-props-panel
`);
}

async function main() {
  const args = process.argv.slice(2);

  // Show help if requested
  if (args.includes('--help')) {
    printUsage();
    process.exit(0);
  }

  const verbose = !args.includes('--quiet');
  const useLegacy = args.includes('--legacy');
  const usePresets = args.includes('--presets') || !useLegacy; // Default to presets

  // Filter by ID if specified
  const filterArg = args.find((a) => a.startsWith('--id='));
  const categoryArg = args.find((a) => a.startsWith('--category='));

  if (usePresets) {
    // ─────────────────────────────────────────────────────────────────────────
    // Preset-based rendering (new approach)
    // ─────────────────────────────────────────────────────────────────────────
    let presetsToRender = [...ALL_TUTORIALS];

    // Filter by ID
    if (filterArg) {
      const id = filterArg.split('=')[1];
      presetsToRender = presetsToRender.filter((t) => t.id === id);
      if (presetsToRender.length === 0) {
        console.error(`Preset not found: ${id}`);
        console.log('Available presets:', ALL_TUTORIALS.map((t) => t.id).join(', '));
        process.exit(1);
      }
    }

    // Filter by category
    if (categoryArg) {
      const category = categoryArg.split('=')[1] as PresetTutorialConfig['category'];
      presetsToRender = presetsToRender.filter((t) => t.category === category);
      if (presetsToRender.length === 0) {
        console.error(`No presets found in category: ${category}`);
        console.log('Available categories: tutorial, showcase, project, design-tips');
        process.exit(1);
      }
    }

    // Progress reporting header (Requirement 9.3)
    console.log('═══════════════════════════════════════════════════════════════════════════');
    console.log('  SCREENCAST TUTORIAL BATCH RENDERER (Preset-Based)');
    console.log('═══════════════════════════════════════════════════════════════════════════');
    console.log(`  Total presets: ${presetsToRender.length}`);
    console.log(`  Output format: MP4, GIF, Poster PNG`);
    console.log(`  Output path: static/tutorials/{category}/{preset-id}/`);
    console.log('═══════════════════════════════════════════════════════════════════════════\n');

    // Group by category for progress reporting
    const byCategory = presetsToRender.reduce(
      (acc, preset) => {
        acc[preset.category] = (acc[preset.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    console.log('Categories to render:');
    Object.entries(byCategory).forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count} preset(s)`);
    });

    const success: string[] = [];
    const failed: { id: string; error: string }[] = [];

    // Render each preset with progress reporting
    for (let i = 0; i < presetsToRender.length; i++) {
      const preset = presetsToRender[i];
      try {
        await renderPresetTutorial(preset, i, presetsToRender.length, verbose);
        success.push(preset.id);
      } catch (error) {
        // Error continuation: continue with remaining presets on failure (Requirement 9.4)
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`\n  [FAILED] ${preset.id}: ${errorMessage}`);
        failed.push({ id: preset.id, error: errorMessage });
        // Continue loop - do not break or throw, process remaining presets
      }
    }

    // Final results summary (Requirement 9.3)
    console.log('\n═══════════════════════════════════════════════════════════════════════════');
    console.log('  BATCH RENDER RESULTS');
    console.log('═══════════════════════════════════════════════════════════════════════════');
    console.log(`  ✓ Success: ${success.length}/${presetsToRender.length}`);
    console.log(`  ✗ Failed: ${failed.length}/${presetsToRender.length}`);

    if (failed.length > 0) {
      console.log('\n  Failed presets:');
      failed.forEach(({ id, error }) => {
        console.log(`    - ${id}: ${error}`);
      });
      console.log('═══════════════════════════════════════════════════════════════════════════');
      process.exit(1);
    }

    console.log('═══════════════════════════════════════════════════════════════════════════');
  } else {
    // ─────────────────────────────────────────────────────────────────────────
    // Legacy rendering (deprecated)
    // ─────────────────────────────────────────────────────────────────────────
    let tutorialsToRender = tutorials;

    if (filterArg) {
      const id = filterArg.split('=')[1];
      tutorialsToRender = tutorials.filter((t) => t.id === id);
      if (tutorialsToRender.length === 0) {
        console.error(`Tutorial not found: ${id}`);
        console.log('Available tutorials:', tutorials.map((t) => t.id).join(', '));
        process.exit(1);
      }
    }

    console.log('=== Tutorial Batch Renderer (Legacy Mode) ===');
    console.log(`Rendering ${tutorialsToRender.length} tutorial(s)...\n`);

    const success: string[] = [];
    const failed: string[] = [];

    for (const tutorial of tutorialsToRender) {
      try {
        await renderTutorial(tutorial, verbose);
        success.push(tutorial.id);
      } catch (error) {
        console.error(`[FAILED] ${tutorial.id}:`, error);
        failed.push(tutorial.id);
      }
    }

    console.log('\n=== Results ===');
    console.log(`✓ Success: ${success.length}`);
    console.log(`✗ Failed: ${failed.length}`);

    if (failed.length > 0) {
      console.log('Failed tutorials:', failed.join(', '));
      process.exit(1);
    }
  }
}

main().catch(console.error);
