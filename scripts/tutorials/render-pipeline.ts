/**
 * Render Pipeline - Orchestrates tutorial rendering
 * Requirements: 8.1, 8.2, 8.4, 8.5, 8.6
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { validateOverlayConfig, formatValidationErrors } from './validate-configs';

export interface TutorialDefinition {
  id: string;
  captureScript: string;
  overlayConfig: string;
  outputDir: string;
  formats: ('mp4' | 'gif' | 'webm')[];
}

export interface RenderOptions {
  cleanupCaptures?: boolean;
  verbose?: boolean;
}

/**
 * Render a single tutorial
 */
export async function renderTutorial(
  definition: TutorialDefinition,
  options: RenderOptions = {}
): Promise<void> {
  const { verbose = true, cleanupCaptures = false } = options;

  if (verbose) console.log(`\n[RENDER] ${definition.id}`);

  // Step 1: Validate overlay config
  if (verbose) console.log('  - Validating config...');
  const configContent = fs.readFileSync(definition.overlayConfig, 'utf-8');
  const config = JSON.parse(configContent);
  const validation = validateOverlayConfig(config);
  
  if (!validation.valid) {
    throw new Error(`Invalid config:\n${formatValidationErrors(validation)}`);
  }

  // Step 2: Run capture script (if frames don't exist)
  const framesDir = path.join('public/tutorials', definition.id);
  if (!fs.existsSync(path.join(framesDir, 'metadata.json'))) {
    if (verbose) console.log('  - Running capture...');
    try {
      execSync(`npx tsx ${definition.captureScript}`, { stdio: 'inherit' });
    } catch (error) {
      throw new Error(`Capture failed for ${definition.id}`);
    }
  } else {
    if (verbose) console.log('  - Using existing captures');
  }

  // Step 3: Render each format
  for (const format of definition.formats) {
    if (verbose) console.log(`  - Rendering ${format}...`);
    
    const outputFile = path.join(definition.outputDir, `${definition.id}.${format}`);
    fs.mkdirSync(definition.outputDir, { recursive: true });

    const codec = format === 'gif' ? 'gif' : format === 'webm' ? 'vp8' : 'h264';
    const fps = format === 'gif' ? 15 : 30;

    try {
      execSync(
        `npx remotion render TutorialComposition ${outputFile} --codec=${codec} --fps=${fps}`,
        { stdio: verbose ? 'inherit' : 'pipe' }
      );
    } catch (error) {
      throw new Error(`Render failed for ${definition.id} (${format})`);
    }
  }

  // Step 4: Generate poster frame
  if (verbose) console.log('  - Generating poster...');
  const posterFile = path.join(definition.outputDir, `${definition.id}-poster.png`);
  try {
    execSync(
      `npx remotion still TutorialComposition ${posterFile} --frame=0`,
      { stdio: verbose ? 'inherit' : 'pipe' }
    );
  } catch {
    // Poster generation is optional
  }

  // Step 5: Cleanup if requested
  if (cleanupCaptures && fs.existsSync(framesDir)) {
    if (verbose) console.log('  - Cleaning up captures...');
    fs.rmSync(framesDir, { recursive: true });
  }

  if (verbose) console.log(`  [DONE] ${definition.id}`);
}

/**
 * Render multiple tutorials
 */
export async function batchRender(
  definitions: TutorialDefinition[],
  options: RenderOptions = {}
): Promise<{ success: string[]; failed: string[] }> {
  const success: string[] = [];
  const failed: string[] = [];

  console.log(`\n[BATCH] Rendering ${definitions.length} tutorials...\n`);

  for (const def of definitions) {
    try {
      await renderTutorial(def, options);
      success.push(def.id);
    } catch (error) {
      console.error(`[FAILED] ${def.id}`, error);
      failed.push(def.id);
    }
  }

  console.log(`\n[RESULTS] ${success.length} succeeded, ${failed.length} failed`);
  return { success, failed };
}
