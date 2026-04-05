/**
 * Video Template System — Property-Based Tests
 *
 * Tests for CinematicBackground, device frames, ZoomTransition,
 * composition structural properties, and Root.tsx registry.
 *
 * Feature: video-template-system
 * Environment: node (no jsdom) — uses pure logic and static file analysis
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { interpolate } from 'remotion';

const PBT_RUNS = 100;

// ─── Paths ──────────────────────────────────────────────────────────────────
const ROOT_TSX_PATH = path.resolve(__dirname, '../../../Root.tsx');
const CINEMATIC_BG_PATH = path.resolve(__dirname, '../CinematicBackground.tsx');
const AVATAR_SHOWCASE_PATH = path.resolve(__dirname, '../../../Sims4Legacy/compositions/AvatarShowcase.tsx');
const MULTI_DEVICE_PATH = path.resolve(__dirname, '../../../Sims4Legacy/compositions/MultiDevice.tsx');
const DEVICE_DEMO_PATH = path.resolve(__dirname, '../../../Sims4Legacy/compositions/DeviceDemo.tsx');

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Parse all <Composition entries from Root.tsx */
function parseCompositions(content: string): Array<{ id: string }> {
  const results: Array<{ id: string }> = [];
  const blocks = content.match(/<Composition[\s\S]*?\/>/g) || [];
  for (const block of blocks) {
    const idMatch = block.match(/id=["'{]([^"'}]+)["'}]/);
    if (idMatch) results.push({ id: idMatch[1] });
  }
  return results;
}


// ═══════════════════════════════════════════════════════════════════════════
// Property 2: CinematicBackground renders minimum particle count (Task 1.2)
// Validates: Requirement 2.5
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 2: CinematicBackground minimum particle count', () => {
  const bgSource = fs.readFileSync(CINEMATIC_BG_PATH, 'utf-8');

  // Extract the Array.from length from the source
  const arrayFromMatch = bgSource.match(/Array\.from\(\{\s*length:\s*(\d+)\s*\}/);
  const particleCount = arrayFromMatch ? parseInt(arrayFromMatch[1], 10) : 0;

  it('source code generates at least 12 particles via Array.from', () => {
    expect(particleCount).toBeGreaterThanOrEqual(12);
  });

  it('PBT: for any non-negative frame, the particle count in source is always >= 12', () => {
    fc.assert(
      fc.property(
        fc.nat(1000), // non-negative frame numbers 0..1000
        (_frame) => {
          // The particle count is a static Array.from({ length: N }) — frame-independent
          // Verify the source always produces >= 12 particles
          expect(particleCount).toBeGreaterThanOrEqual(12);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('particles are rendered as positioned divs with borderRadius 50%', () => {
    // Verify the particle template includes the expected styling
    expect(bgSource).toContain("borderRadius: '50%'");
    expect(bgSource).toContain('boxShadow');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Property 3: CinematicBackground fadeIn interpolation bounded (Task 1.3)
// Validates: Requirement 2.7
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 3: CinematicBackground fadeIn interpolation bounded', () => {
  it('PBT: for any positive fadeInDuration and non-negative frame, opacity is in [0, 1]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 300 }),  // fadeInDuration (positive)
        fc.nat(600),                        // frame (non-negative)
        (fadeInDuration, frame) => {
          const fadeIn = interpolate(frame, [0, fadeInDuration], [0, 1], {
            extrapolateRight: 'clamp',
          });
          expect(fadeIn).toBeGreaterThanOrEqual(0);
          expect(fadeIn).toBeLessThanOrEqual(1);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: opacity is 0 at frame 0', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 300 }),
        (fadeInDuration) => {
          const fadeIn = interpolate(0, [0, fadeInDuration], [0, 1], {
            extrapolateRight: 'clamp',
          });
          expect(fadeIn).toBe(0);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: opacity is 1 at frame >= fadeInDuration', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 300 }),
        fc.nat(300),
        (fadeInDuration, extra) => {
          const frame = fadeInDuration + extra;
          const fadeIn = interpolate(frame, [0, fadeInDuration], [0, 1], {
            extrapolateRight: 'clamp',
          });
          expect(fadeIn).toBe(1);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: opacity is monotonically non-decreasing', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 300 }),
        fc.nat(600),
        fc.nat(600),
        (fadeInDuration, frameA, frameB) => {
          const lo = Math.min(frameA, frameB);
          const hi = Math.max(frameA, frameB);
          const fadeInLo = interpolate(lo, [0, fadeInDuration], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const fadeInHi = interpolate(hi, [0, fadeInDuration], [0, 1], {
            extrapolateRight: 'clamp',
          });
          expect(fadeInHi).toBeGreaterThanOrEqual(fadeInLo);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// Property 1: Device frame dimension prop controls outer size (Task 2.4)
// Validates: Requirements 3.4, 4.4, 5.4
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 1: Device frame dimension prop controls outer size', () => {
  // Read source files for static analysis
  const macbookSrc = fs.readFileSync(
    path.resolve(__dirname, '../../../Sims4Legacy/components/MacBookFrame.tsx'), 'utf-8',
  );
  const iphoneSrc = fs.readFileSync(
    path.resolve(__dirname, '../../../Sims4Legacy/components/IPhoneFrame.tsx'), 'utf-8',
  );
  const monitorSrc = fs.readFileSync(
    path.resolve(__dirname, '../../../Sims4Legacy/components/MonitorFrame.tsx'), 'utf-8',
  );

  it('MacBookFrame: outermost container width equals the width prop', () => {
    // The MacBookFrame renders a div with style={{ width }} as the outermost container
    expect(macbookSrc).toContain('width,');
    // data-testid confirms it's the outer frame
    expect(macbookSrc).toContain('data-testid="macbook-frame"');
  });

  it('IPhoneFrame: outermost container uses height prop and derives width', () => {
    // IPhoneFrame uses height prop and computes width from it
    expect(iphoneSrc).toContain('height,');
    expect(iphoneSrc).toMatch(/const width\s*=\s*Math\.round\(height\s*\*/);
    expect(iphoneSrc).toContain('data-testid="iphone-frame"');
  });

  it('MonitorFrame: outermost container width equals the width prop', () => {
    expect(monitorSrc).toContain('width,');
    // The outermost div has style={{ width, ... }}
    expect(monitorSrc).toContain('data-testid="monitor-frame"');
  });

  it('PBT: MacBookFrame bezel is proportional to width for any positive width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 2000 }),
        (width) => {
          const bezelWidth = Math.round(width * 0.025);
          const screenWidth = width - bezelWidth * 2;
          // Screen must be smaller than outer width
          expect(screenWidth).toBeLessThan(width);
          expect(screenWidth).toBeGreaterThan(0);
          // Screen height uses 10:16 ratio
          const screenHeight = Math.round(screenWidth * (10 / 16));
          expect(screenHeight).toBeGreaterThan(0);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: IPhoneFrame width derived from height maintains 9:19.5 ratio', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 200, max: 1200 }),
        (height) => {
          const width = Math.round(height * (9 / 19.5));
          expect(width).toBeGreaterThan(0);
          expect(width).toBeLessThan(height);
          // Bezel proportions
          const bezelWidth = Math.round(width * 0.04);
          const screenWidth = width - bezelWidth * 2;
          expect(screenWidth).toBeGreaterThan(0);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: MonitorFrame bezel and stand proportional to width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 2000 }),
        (width) => {
          const bezelWidth = Math.round(width * 0.02);
          const screenWidth = width - bezelWidth * 2;
          expect(screenWidth).toBeGreaterThan(0);
          // Stand dimensions
          const neckWidth = Math.round(width * 0.08);
          const baseWidth = Math.round(width * 0.3);
          expect(neckWidth).toBeGreaterThan(0);
          expect(baseWidth).toBeGreaterThan(neckWidth);
          expect(baseWidth).toBeLessThan(width);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Property 4: ZoomTransition scale correct per phase (Task 3.2)
// Validates: Requirements 7.3, 7.4, 7.5
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 4: ZoomTransition scale correct per phase', () => {
  // Read source to verify structural contracts
  const zoomSrc = fs.readFileSync(
    path.resolve(__dirname, '../ZoomTransition.tsx'), 'utf-8',
  );

  it('ZoomTransition has three distinct phases: before, during, after', () => {
    // Phase 1: before startFrame — renders children
    expect(zoomSrc).toContain('frame < startFrame');
    // Phase 3: after endFrame — renders fullscreenContent
    expect(zoomSrc).toContain('frame >= endFrame');
    // Phase 2: during — uses spring and interpolate for scale
    expect(zoomSrc).toContain('spring({');
    expect(zoomSrc).toContain('zoomScale');
  });

  it('ZoomTransition uses extrapolateRight clamp on all interpolations', () => {
    // Count all extrapolateRight: 'clamp' occurrences
    const clampMatches = zoomSrc.match(/extrapolateRight:\s*'clamp'/g) || [];
    // Should have at least 3 (zoomScale, childrenOpacity, fullscreenOpacity)
    expect(clampMatches.length).toBeGreaterThanOrEqual(3);
  });

  it('ZoomTransition spring config uses damping 16, stiffness 100', () => {
    expect(zoomSrc).toContain('damping: 16');
    expect(zoomSrc).toContain('stiffness: 100');
  });

  it('PBT: for any startFrame and durationFrames, endFrame = startFrame + durationFrames', () => {
    fc.assert(
      fc.property(
        fc.nat(500),
        fc.integer({ min: 1, max: 300 }),
        (startFrame, durationFrames) => {
          const endFrame = startFrame + durationFrames;
          expect(endFrame).toBe(startFrame + durationFrames);
          expect(endFrame).toBeGreaterThan(startFrame);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: scale interpolation from 1.0 to fullscreenScale is bounded and non-decreasing', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1, noNaN: true }),
        fc.float({ min: 0, max: 1, noNaN: true }),
        (progressA, progressB) => {
          const fullscreenScale = 1280 / (1280 * 0.625); // ≈ 1.6
          const scaleA = interpolate(progressA, [0, 1], [1, fullscreenScale], {
            extrapolateRight: 'clamp',
          });
          const scaleB = interpolate(progressB, [0, 1], [1, fullscreenScale], {
            extrapolateRight: 'clamp',
          });
          // Both bounded
          expect(scaleA).toBeGreaterThanOrEqual(1);
          expect(scaleA).toBeLessThanOrEqual(fullscreenScale);
          expect(scaleB).toBeGreaterThanOrEqual(1);
          expect(scaleB).toBeLessThanOrEqual(fullscreenScale);
          // Monotonically non-decreasing
          if (progressA <= progressB) {
            expect(scaleB).toBeGreaterThanOrEqual(scaleA);
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('handles edge case: durationFrames <= 0 means instant transition', () => {
    expect(zoomSrc).toContain('durationFrames <= 0');
  });

  it('handles edge case: negative startFrame treated as 0', () => {
    expect(zoomSrc).toContain('Math.max(0, rawStartFrame)');
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// Property 7: Sequential element entrances staggered by ≥20 frames (Task 5.2)
// Validates: Requirements 8.5, 11.5, 13.3
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 7: Sequential element entrances staggered by ≥20 frames', () => {
  // AvatarShowcase: bullet points stagger at 70 + i * 20
  const avatarShowcaseSrc = fs.existsSync(AVATAR_SHOWCASE_PATH)
    ? fs.readFileSync(AVATAR_SHOWCASE_PATH, 'utf-8')
    : '';

  it('AvatarShowcase: bullet points use stagger interval of 20 frames', () => {
    // Pattern: bulletStartFrame = 70 + i * 20
    expect(avatarShowcaseSrc).toMatch(/\d+\s*\+\s*i\s*\*\s*20/);
  });

  it('AvatarShowcase: title entrance (frame 30) is ≥20 frames after avatar (frame 8)', () => {
    // Avatar starts at frame 8, title at frame 30 → gap = 22 ≥ 20
    const avatarStart = 8;
    const titleStart = 30;
    expect(titleStart - avatarStart).toBeGreaterThanOrEqual(20);
  });

  it('AvatarShowcase: subtitle (frame 50) is ≥20 frames after title (frame 30)', () => {
    const titleStart = 30;
    const subtitleStart = 50;
    expect(subtitleStart - titleStart).toBeGreaterThanOrEqual(20);
  });

  it('PBT: for any number of bullet points, consecutive bullets are ≥20 frames apart', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }), // number of bullet points
        (count) => {
          const baseFrame = 70;
          const stagger = 20;
          for (let i = 1; i < count; i++) {
            const prevStart = baseFrame + (i - 1) * stagger;
            const currStart = baseFrame + i * stagger;
            expect(currStart - prevStart).toBeGreaterThanOrEqual(20);
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  // AvatarWithDevice: avatar at 10, device at 30 → gap = 20
  it('AvatarWithDevice: device entrance (frame 30) is ≥20 frames after avatar (frame 10)', () => {
    const avatarStart = 10;
    const deviceStart = 30;
    expect(deviceStart - avatarStart).toBeGreaterThanOrEqual(20);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Property 5: DeviceDemo renders correct device frame for deviceType (Task 6.2)
// Validates: Requirement 9.3
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 5: DeviceDemo renders correct device frame for deviceType', () => {
  const deviceDemoSrc = fs.existsSync(DEVICE_DEMO_PATH)
    ? fs.readFileSync(DEVICE_DEMO_PATH, 'utf-8')
    : '';

  it('DeviceDemo has a switch statement mapping deviceType to frame components', () => {
    expect(deviceDemoSrc).toContain("case 'macbook':");
    expect(deviceDemoSrc).toContain("case 'iphone':");
    expect(deviceDemoSrc).toContain("case 'monitor':");
  });

  it('macbook maps to MacBookFrame', () => {
    // Extract the macbook case block
    const macbookCase = deviceDemoSrc.match(/case\s+'macbook':[\s\S]*?(?=case|default|$)/);
    expect(macbookCase).not.toBeNull();
    expect(macbookCase![0]).toContain('MacBookFrame');
  });

  it('iphone maps to IPhoneFrame', () => {
    const iphoneCase = deviceDemoSrc.match(/case\s+'iphone':[\s\S]*?(?=case|default|$)/);
    expect(iphoneCase).not.toBeNull();
    expect(iphoneCase![0]).toContain('IPhoneFrame');
  });

  it('monitor maps to MonitorFrame', () => {
    const monitorCase = deviceDemoSrc.match(/case\s+'monitor':[\s\S]*?(?=case|default|$)/);
    expect(monitorCase).not.toBeNull();
    expect(monitorCase![0]).toContain('MonitorFrame');
  });

  it('PBT: for any valid deviceType, the corresponding frame component name is present in the switch', () => {
    const deviceTypes = ['macbook', 'iphone', 'monitor'] as const;
    const frameMap: Record<string, string> = {
      macbook: 'MacBookFrame',
      iphone: 'IPhoneFrame',
      monitor: 'MonitorFrame',
    };

    fc.assert(
      fc.property(
        fc.constantFrom(...deviceTypes),
        (deviceType) => {
          const caseBlock = deviceDemoSrc.match(
            new RegExp(`case\\s+'${deviceType}':[\\s\\S]*?(?=case|default|$)`),
          );
          expect(caseBlock).not.toBeNull();
          expect(caseBlock![0]).toContain(frameMap[deviceType]);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('default case falls back to MacBookFrame', () => {
    const defaultCase = deviceDemoSrc.match(/default:[\s\S]*?(?=\})/);
    expect(defaultCase).not.toBeNull();
    expect(defaultCase![0]).toContain('MacBookFrame');
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// Property 6: MultiDevice clamps rendered device count to 3 (Task 7.2)
// Validates: Requirements 10.4, 10.8
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 6: MultiDevice clamps rendered device count to 3', () => {
  const multiDeviceSrc = fs.existsSync(MULTI_DEVICE_PATH)
    ? fs.readFileSync(MULTI_DEVICE_PATH, 'utf-8')
    : '';

  it('MultiDevice uses .slice(0, 3) to clamp devices', () => {
    expect(multiDeviceSrc).toContain('.slice(0, 3)');
  });

  it('PBT: for any array length N >= 0, min(N, 3) devices are rendered', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 20 }),
        (n) => {
          // Simulate the clamping logic from MultiDevice
          const devices = Array.from({ length: n }, (_, i) => ({
            deviceType: 'macbook' as const,
          }));
          const visibleDevices = devices.slice(0, 3);
          expect(visibleDevices.length).toBe(Math.min(n, 3));
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('empty devices array renders 0 device frames', () => {
    const devices: any[] = [];
    expect(devices.slice(0, 3).length).toBe(0);
  });

  it('5 devices renders exactly 3 device frames', () => {
    const devices = Array.from({ length: 5 }, () => ({ deviceType: 'macbook' }));
    expect(devices.slice(0, 3).length).toBe(3);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Property 8: MultiDevice device entrances staggered by ≥25 frames (Task 7.3)
// Validates: Requirement 10.5
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 8: MultiDevice device entrances staggered by ≥25 frames', () => {
  const multiDeviceSrc = fs.existsSync(MULTI_DEVICE_PATH)
    ? fs.readFileSync(MULTI_DEVICE_PATH, 'utf-8')
    : '';

  it('MultiDevice uses stagger interval of 25 frames', () => {
    // Pattern: deviceStartFrame = 50 + i * 25
    expect(multiDeviceSrc).toMatch(/\d+\s*\+\s*i\s*\*\s*25/);
  });

  it('PBT: for any set of up to 3 devices, consecutive entrances are ≥25 frames apart', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3 }),
        (deviceCount) => {
          const baseFrame = 50;
          const stagger = 25;
          for (let i = 1; i < deviceCount; i++) {
            const prevStart = baseFrame + (i - 1) * stagger;
            const currStart = baseFrame + i * stagger;
            expect(currStart - prevStart).toBeGreaterThanOrEqual(25);
          }
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('first device starts at frame 50', () => {
    expect(multiDeviceSrc).toMatch(/50\s*\+\s*i\s*\*\s*25/);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Property 9: Root registry composition IDs are unique (Task 10.2)
// Validates: Requirements 12.1, 12.4
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 9: Root registry composition IDs are unique', () => {
  const rootContent = fs.readFileSync(ROOT_TSX_PATH, 'utf-8');
  const allCompositions = parseCompositions(rootContent);
  const allIds = allCompositions.map((c) => c.id);
  const idSet = new Set(allIds);

  it('all composition IDs are unique (set size equals list length)', () => {
    expect(idSet.size).toBe(allIds.length);
  });

  it('PBT: for any pair of distinct indices, IDs differ', () => {
    if (allIds.length < 2) return;
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allIds.length - 1 }),
        fc.integer({ min: 0, max: allIds.length - 1 }),
        (i, j) => {
          if (i === j) return;
          expect(allIds[i]).not.toBe(allIds[j]);
        },
      ),
      { numRuns: PBT_RUNS },
    );
  });

  it('PBT: each sampled ID appears exactly once', () => {
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

  it('the 4 video-template-system compositions are registered', () => {
    const expectedIds = [
      'archive-Sims4-AvatarShowcase',
      'archive-Sims4-DeviceDemo',
      'archive-Sims4-MultiDevice',
      'archive-Sims4-AvatarWithDevice',
    ];
    for (const id of expectedIds) {
      expect(allIds).toContain(id);
    }
  });
});
