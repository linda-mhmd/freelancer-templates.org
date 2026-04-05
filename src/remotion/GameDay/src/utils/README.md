# Utils

Helper functions for time calculations and composition logic. These are pure functions with no side effects - safe to call anywhere.

## `timing.ts`

Time and frame calculation utilities.

- `formatTime(seconds)` - formats seconds into `MM:SS` display string
- `calculateCountdown(targetTime, currentTime, timezone)` - calculates remaining seconds to a target time in the host's timezone
- `staggeredEntry(index, baseDelay, fps)` - returns a frame offset for staggered animations (e.g. list items entering one after another)

## `phases.ts`

Event phase utilities for compositions that change over time.

- `getCardState(frame, startFrame, endFrame)` - returns `"hidden" | "entering" | "active" | "exiting"` for a card in a timed sequence
- `getActiveSegment(frame, fps, schedule)` - returns the currently active schedule segment
- `getPhaseInfo(frame, fps)` - returns high-level phase info (pre-event, gameplay, closing)

## `closing.ts`

Utilities specific to the closing ceremony compositions.

- Score formatting and podium ordering helpers used by `ClosingWinnersTemplate`

## Notes

- All timing functions work in frames, not seconds - multiply by `fps` when needed
- The host timezone is set in `config/event.ts` as `HOST_TIMEZONE`
