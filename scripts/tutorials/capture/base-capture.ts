/**
 * BaseCapture - Playwright-based screen capture for tutorials
 *
 * Captures screenshots at intervals while recording mouse positions and clicks.
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import type { CaptureMetadata, FrameData, ClickEvent } from '../../../src/remotion/tutorials/types';

export interface CaptureConfig {
  /** URL to capture (default: http://localhost:3000) */
  url?: string;
  /** Viewport width (default: 1280) */
  width?: number;
  /** Viewport height (default: 720) */
  height?: number;
  /** Capture interval in ms (default: 100) */
  captureInterval?: number;
  /** Output directory for frames */
  outputDir: string;
}

const DEFAULTS = {
  url: 'http://localhost:3000',
  width: 1280,
  height: 720,
  captureInterval: 100,
};

export class BaseCapture {
  private config: Required<CaptureConfig>;
  private browser: Browser | null = null;
  private page: Page | null = null;
  private frames: FrameData[] = [];
  private clicks: ClickEvent[] = [];
  private frameNumber = 0;
  private startTime = 0;
  private captureTimer: NodeJS.Timeout | null = null;
  private mouseX = 0;
  private mouseY = 0;

  constructor(config: CaptureConfig) {
    this.config = {
      url: config.url ?? DEFAULTS.url,
      width: config.width ?? DEFAULTS.width,
      height: config.height ?? DEFAULTS.height,
      captureInterval: config.captureInterval ?? DEFAULTS.captureInterval,
      outputDir: config.outputDir,
    };
  }

  /**
   * Initialize browser and page
   */
  async init(): Promise<void> {
    // Ensure output directory exists
    fs.mkdirSync(this.config.outputDir, { recursive: true });

    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({
      width: this.config.width,
      height: this.config.height,
    });

    // Track mouse position
    await this.page.exposeFunction('__trackMouse', (x: number, y: number) => {
      this.mouseX = x;
      this.mouseY = y;
    });

    await this.page.addInitScript(() => {
      document.addEventListener('mousemove', (e) => {
        (window as any).__trackMouse(e.clientX, e.clientY);
      });
    });
  }

  /**
   * Navigate to URL
   */
  async navigate(url?: string): Promise<void> {
    if (!this.page) throw new Error('Not initialized');
    const targetUrl = url ?? this.config.url;
    
    try {
      await this.page.goto(targetUrl, { timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to connect to ${targetUrl}. Is Remotion Studio running?`);
    }
  }

  /**
   * Start capturing frames
   */
  startCapture(): void {
    this.startTime = Date.now();
    this.frameNumber = 0;
    this.frames = [];
    this.clicks = [];

    this.captureTimer = setInterval(async () => {
      await this.captureFrame();
    }, this.config.captureInterval);
  }

  /**
   * Stop capturing and save metadata
   */
  async stopCapture(): Promise<CaptureMetadata> {
    if (this.captureTimer) {
      clearInterval(this.captureTimer);
      this.captureTimer = null;
    }

    const duration = Date.now() - this.startTime;
    const fps = Math.round(1000 / this.config.captureInterval);

    const metadata: CaptureMetadata = {
      frames: this.frames,
      clicks: this.clicks,
      duration,
      fps,
    };

    // Save metadata
    const metadataPath = path.join(this.config.outputDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    return metadata;
  }

  /**
   * Capture a single frame
   */
  private async captureFrame(): Promise<void> {
    if (!this.page) return;

    const timestamp = Date.now() - this.startTime;
    const filename = `frame-${String(this.frameNumber + 1).padStart(4, '0')}.png`;
    const filepath = path.join(this.config.outputDir, filename);

    await this.page.screenshot({ path: filepath });

    this.frames.push({
      frameNumber: this.frameNumber,
      timestamp,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
    });

    this.frameNumber++;
  }

  /**
   * Click at element
   */
  async click(selector: string): Promise<void> {
    if (!this.page) throw new Error('Not initialized');

    const element = await this.page.$(selector);
    if (!element) throw new Error(`Element not found: ${selector}`);

    const box = await element.boundingBox();
    if (!box) throw new Error(`Cannot get bounds: ${selector}`);

    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    this.clicks.push({
      frameNumber: this.frameNumber,
      timestamp: Date.now() - this.startTime,
      x,
      y,
      button: 'left',
    });

    await this.page.click(selector);
  }

  /**
   * Click at coordinates
   */
  async clickAt(x: number, y: number): Promise<void> {
    if (!this.page) throw new Error('Not initialized');

    this.clicks.push({
      frameNumber: this.frameNumber,
      timestamp: Date.now() - this.startTime,
      x,
      y,
      button: 'left',
    });

    await this.page.mouse.click(x, y);
  }

  /**
   * Type text
   */
  async type(selector: string, text: string): Promise<void> {
    if (!this.page) throw new Error('Not initialized');
    await this.page.fill(selector, text);
  }

  /**
   * Hover over element
   */
  async hover(selector: string): Promise<void> {
    if (!this.page) throw new Error('Not initialized');
    await this.page.hover(selector);
  }

  /**
   * Wait for time
   */
  async wait(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Wait for selector
   */
  async waitForSelector(selector: string, timeout = 5000): Promise<void> {
    if (!this.page) throw new Error('Not initialized');
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Close browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}
