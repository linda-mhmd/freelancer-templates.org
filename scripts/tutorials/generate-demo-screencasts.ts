/**
 * Generate Demo Screencasts
 * 
 * Creates simple stop-motion style tutorial videos from placeholder screenshots.
 * No live capture needed - just renders Remotion compositions.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface TutorialConfig {
  id: string;
  title: string;
  category: string;
  screenshots: string[];
  annotations?: Array<{
    text: string;
    x: number;
    y: number;
    startSlide: number;
    endSlide?: number;
  }>;
}

// Tutorial configurations
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

async function generatePlaceholderScreenshots() {
  console.log('Creating placeholder screenshot directories...');
  
  const demoDir = 'src/remotion/public/tutorials/demo';
  fs.mkdirSync(demoDir, { recursive: true });
  
  // Create simple placeholder images using ImageMagick or just copy existing ones
  const placeholders = [
    'studio-overview.png',
    'props-hover.png', 
    'props-open.png',
    'timeline-start.png',
    'timeline-middle.png',
    'timeline-end.png',
    'props-panel.png',
    'text-field-focus.png',
    'text-edited.png',
    'terminal-empty.png',
    'terminal-command.png',
    'terminal-progress.png',
    'terminal-complete.png',
  ];
  
  for (const placeholder of placeholders) {
    const filepath = path.join(demoDir, placeholder);
    if (!fs.existsSync(filepath)) {
      // Create a simple colored placeholder
      console.log(`  Creating placeholder: ${placeholder}`);
      // We'll use existing preview images as placeholders for now
    }
  }
}

async function renderTutorial(config: TutorialConfig) {
  console.log(`\nRendering: ${config.title}`);
  
  const outputDir = `static/tutorials/${config.category}`;
  fs.mkdirSync(outputDir, { recursive: true });
  
  const propsJson = JSON.stringify({
    screenshots: config.screenshots,
    title: config.title,
    annotations: config.annotations || [],
    frameDuration: 45,
    transitionDuration: 15,
  });
  
  const durationFrames = config.screenshots.length * 45;
  
  // Render MP4
  console.log('  - Rendering MP4...');
  try {
    execSync(
      `npx remotion render ScreencastSlideshow ${outputDir}/${config.id}.mp4 ` +
      `--props='${propsJson}' --frames=${durationFrames}`,
      { stdio: 'pipe' }
    );
    console.log('    ✓ MP4 done');
  } catch (e) {
    console.log('    ✗ MP4 failed');
  }
  
  // Render GIF
  console.log('  - Rendering GIF...');
  try {
    execSync(
      `npx remotion render ScreencastSlideshow ${outputDir}/${config.id}.gif ` +
      `--props='${propsJson}' --frames=${durationFrames} --codec=gif`,
      { stdio: 'pipe' }
    );
    console.log('    ✓ GIF done');
  } catch (e) {
    console.log('    ✗ GIF failed');
  }
  
  // Render poster
  console.log('  - Rendering poster...');
  try {
    execSync(
      `npx remotion still ScreencastSlideshow ${outputDir}/${config.id}-poster.png ` +
      `--props='${propsJson}' --frame=0`,
      { stdio: 'pipe' }
    );
    console.log('    ✓ Poster done');
  } catch (e) {
    console.log('    ✗ Poster failed');
  }
}

async function main() {
  console.log('=== Demo Screencast Generator ===\n');
  
  await generatePlaceholderScreenshots();
  
  for (const tutorial of tutorials) {
    await renderTutorial(tutorial);
  }
  
  console.log('\n=== Complete ===');
}

main().catch(console.error);
