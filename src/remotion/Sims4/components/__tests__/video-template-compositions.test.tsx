/**
 * Video Template System — Composition Unit Tests (Task 10.3)
 *
 * Structural verification of compositions via source analysis.
 * Environment: node (no jsdom)
 *
 * Feature: video-template-system
 * Validates: Requirements 2.1–2.8, 3.6, 4.5, 5.5, 8.6, 10.4, 10.8, 11.6, 12.1–12.4, 13.1–13.5
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// ─── Paths ──────────────────────────────────────────────────────────────────
const CINEMATIC_BG_PATH = path.resolve(__dirname, '../CinematicBackground.tsx');
const MACBOOK_PATH = path.resolve(__dirname, '../../../Sims4Legacy/components/MacBookFrame.tsx');
const IPHONE_PATH = path.resolve(__dirname, '../../../Sims4Legacy/components/IPhoneFrame.tsx');
const MONITOR_PATH = path.resolve(__dirname, '../../../Sims4Legacy/components/MonitorFrame.tsx');
const AVATAR_SHOWCASE_PATH = path.resolve(__dirname, '../../../Sims4Legacy/compositions/AvatarShowcase.tsx');
const MULTI_DEVICE_PATH = path.resolve(__dirname, '../../../Sims4Legacy/compositions/MultiDevice.tsx');
const ROOT_TSX_PATH = path.resolve(__dirname, '../../../Root.tsx');


// ── CinematicBackground renders all 5 layers ────────────────────────────────

describe('CinematicBackground: 5 layers', () => {
  const src = fs.readFileSync(CINEMATIC_BG_PATH, 'utf-8');

  it('has Layer 1: sky gradient background', () => {
    expect(src).toContain('SKY GRADIENT');
    expect(src).toContain('linear-gradient');
  });

  it('has Layer 2: horizon glow', () => {
    expect(src).toContain('HORIZON GLOW');
    expect(src).toContain('radial-gradient');
  });

  it('has Layer 3: silhouette skyline', () => {
    expect(src).toContain('SILHOUETTE');
    expect(src).toContain('<svg');
    expect(src).toContain('<polygon');
  });

  it('has Layer 4: floating particles', () => {
    expect(src).toContain('FLOATING PARTICLES');
    expect(src).toContain('Array.from');
  });

  it('has Layer 5: vignette overlay', () => {
    expect(src).toContain('VIGNETTE');
  });
});

// ── Device frames render dark placeholder when no children ──────────────────

describe('Device frames: dark placeholder when no children', () => {
  it('MacBookFrame shows dark placeholder (#0a0f2e) when no children', () => {
    const src = fs.readFileSync(MACBOOK_PATH, 'utf-8');
    // Pattern: background: children ? 'transparent' : '#0a0f2e'
    expect(src).toContain("children ? 'transparent' : '#0a0f2e'");
  });

  it('IPhoneFrame shows dark placeholder (#0a0f2e) when no children', () => {
    const src = fs.readFileSync(IPHONE_PATH, 'utf-8');
    expect(src).toContain("children ? 'transparent' : '#0a0f2e'");
  });

  it('MonitorFrame shows dark placeholder (#0a0f2e) when no children', () => {
    const src = fs.readFileSync(MONITOR_PATH, 'utf-8');
    expect(src).toContain("children ? 'transparent' : '#0a0f2e'");
  });
});

// ── AvatarShowcase includes Plumbob and AvatarImage ─────────────────────────

describe('AvatarShowcase: Plumbob and AvatarImage', () => {
  const src = fs.readFileSync(AVATAR_SHOWCASE_PATH, 'utf-8');

  it('imports Plumbob from SimsUI', () => {
    expect(src).toContain('Plumbob');
    expect(src).toMatch(/import.*Plumbob.*from/);
  });

  it('imports AvatarImage', () => {
    expect(src).toContain('AvatarImage');
    expect(src).toMatch(/import.*AvatarImage.*from/);
  });

  it('renders <Plumbob> component', () => {
    expect(src).toContain('<Plumbob');
  });

  it('renders <AvatarImage> component', () => {
    expect(src).toContain('<AvatarImage');
  });
});

// ── MultiDevice: empty array renders no devices, 5 devices renders 3 ────────

describe('MultiDevice: device count clamping', () => {
  const src = fs.readFileSync(MULTI_DEVICE_PATH, 'utf-8');

  it('uses .slice(0, 3) to clamp device count', () => {
    expect(src).toContain('.slice(0, 3)');
  });

  it('maps over visibleDevices (clamped array)', () => {
    expect(src).toContain('visibleDevices.map');
  });

  it('defaults devices to empty array', () => {
    expect(src).toMatch(/devices\s*=\s*\[\]/);
  });

  it('renders data-testid for each device', () => {
    expect(src).toContain('data-testid={`device-${i}`}');
  });
});

// ── Root.tsx has all 4 video-template-system entries ─────────────────────────

describe('Root.tsx: video-template-system composition entries', () => {
  const rootContent = fs.readFileSync(ROOT_TSX_PATH, 'utf-8');

  const expectedEntries = [
    { id: 'archive-Sims4-AvatarShowcase', component: 'AvatarShowcase' },
    { id: 'archive-Sims4-DeviceDemo', component: 'DeviceDemo' },
    { id: 'archive-Sims4-MultiDevice', component: 'MultiDevice' },
    { id: 'archive-Sims4-AvatarWithDevice', component: 'AvatarWithDevice' },
  ];

  for (const entry of expectedEntries) {
    it(`has Composition id="${entry.id}"`, () => {
      expect(rootContent).toContain(`id="${entry.id}"`);
    });

    it(`imports ${entry.component} from Sims4Legacy`, () => {
      expect(rootContent).toMatch(
        new RegExp(`import\\s+\\{\\s*${entry.component}\\s*\\}\\s+from.*Sims4Legacy`),
      );
    });
  }

  it('all 4 entries use width={1280} height={720} fps={30}', () => {
    for (const entry of expectedEntries) {
      // Find the Composition block for this id
      const blockRegex = new RegExp(
        `<Composition[\\s\\S]*?id="${entry.id}"[\\s\\S]*?\\/>`,
      );
      const match = rootContent.match(blockRegex);
      expect(match).not.toBeNull();
      const block = match![0];
      expect(block).toContain('width={1280}');
      expect(block).toContain('height={720}');
      expect(block).toContain('fps={30}');
    }
  });
});
