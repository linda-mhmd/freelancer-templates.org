/**
 * Batch Render Script - ScreencastSlideshow approach
 * 
 * Renders all tutorials using the simple stop-motion slideshow component.
 * No live browser capture needed - just static screenshots.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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

// Tutorial configurations using existing preview images as placeholders
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

async function main() {
  const args = process.argv.slice(2);
  const verbose = !args.includes('--quiet');
  
  // Filter by ID if specified
  const filterArg = args.find((a) => a.startsWith('--id='));
  let tutorialsToRender = tutorials;
  
  if (filterArg) {
    const id = filterArg.split('=')[1];
    tutorialsToRender = tutorials.filter((t) => t.id === id);
    if (tutorialsToRender.length === 0) {
      console.error(`Tutorial not found: ${id}`);
      console.log('Available tutorials:', tutorials.map(t => t.id).join(', '));
      process.exit(1);
    }
  }

  console.log('=== Tutorial Batch Renderer ===');
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

main().catch(console.error);
