/**
 * Event Configuration  -  AWS Community GameDay Europe
 *
 * These are the only values you need to change to adapt this template
 * for your own community event. Everything else (compositions, design,
 * schedule) derives from these constants.
 *
 * For a new edition, update:
 *   EVENT_EDITION, EVENT_DATE, HOST_TIMEZONE, HOST_LOCATION,
 *   and the offset constants below.
 */

export const EVENT_NAME = "AWS Community GameDay Europe";

export const EVENT_EDITION = "2026"; // First edition
export const EVENT_DATE = "2026-03-17";

/**
 * Stream host timezone.
 * All times in config/schedule.ts are expressed relative to event start
 * in this timezone. For this edition, Linda hosts from Vienna (CET = UTC+1).
 */
export const HOST_TIMEZONE = "CET"; // stream host timezone (CET for this edition)
export const HOST_LOCATION = "Vienna, Austria"; // Linda's location

// ── Stream Configuration ──
export const STREAM_FPS = 30;
export const STREAM_WIDTH = 1280;
export const STREAM_HEIGHT = 720;

// ── Timing Offsets (minutes from event start) ──
// All offsets are relative to EVENT_START_TIME in HOST_TIMEZONE.
// The event spans 4+ timezones  -  HOST_TIMEZONE is used as the reference.
export const EVENT_START_TIME = "17:30";   // Base event start — Pre-Show begins
export const STREAM_START_TIME = "18:00";  // Live stream goes live
export const EVENT_START_OFFSET_MINUTES = 0;  // Pre-Show begins (optional local setup)
export const STREAM_START_OFFSET_MINUTES = 30; // Live stream starts
export const GAME_START_OFFSET_MINUTES = 60;   // 18:30 CET  -  GameDay game begins
export const GAME_END_OFFSET_MINUTES = 180;    // 20:30 CET  -  Game ends, closing ceremony
export const EVENT_END_OFFSET_MINUTES = 210;   // 21:00 CET  -  Stream ends with music

// ── Assets ──
// Set to true once public/assets/support-process-h264.mp4 has been added.
// When false, the support process scene shows a placeholder card instead of the video.
export const SUPPORT_VIDEO_AVAILABLE = false;

// ── Derived Frame Constants ──
export const FRAMES_PER_MINUTE = 60 * STREAM_FPS; // 1800 frames per minute

// ── Time Offset Helper (private) ──
function timeOffset(base: string, minutes: number): string {
  const [h, m] = base.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// Derived time strings — computed from the offsets above so you never need to edit these
export const STREAM_START    = `${STREAM_START_TIME} ${HOST_TIMEZONE}`;  // "18:00 CET"
export const GAME_START      = `${timeOffset(EVENT_START_TIME, GAME_START_OFFSET_MINUTES)} ${HOST_TIMEZONE}`;  // "18:30 CET"
export const GAME_END        = `${timeOffset(EVENT_START_TIME, GAME_END_OFFSET_MINUTES)} ${HOST_TIMEZONE}`;    // "20:30 CET"
export const AUDIO_CHECK     = `${timeOffset(STREAM_START_TIME, -5)} ${HOST_TIMEZONE}`;   // "17:55 CET"
export const GM_INTRO_TIME   = `~${timeOffset(STREAM_START_TIME, 8)} ${HOST_TIMEZONE}`;   // "~18:08 CET"
export const GM_INSTRUCTIONS_TIME = `~${timeOffset(STREAM_START_TIME, 10)} ${HOST_TIMEZONE}`; // "~18:10 CET"
export const CODES_TIME      = `${timeOffset(STREAM_START_TIME, 25)} ${HOST_TIMEZONE}`;   // "18:25 CET"

// Event stats
export const EDITION         = "1st";
export const EDITION_LABEL   = "First Edition";
export const GAMEPLAY_HOURS  = 2;
export const TIMEZONE_COUNT  = 4;
