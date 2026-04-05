# Config

Event configuration. Update these files before each GameDay to match your specific event.

---

## `event.ts`

Core event metadata: name, date, timezone, and duration constants.

Update `EVENT_DATE`, `HOST_TIMEZONE`, and the timing constants (`GAMEPLAY_DURATION_MINUTES`, etc.) for your event. Everything that depends on timing derives from these values.

---

## `participants.ts`

All people involved in the event.

**`ORGANIZERS`** - Community organizers. Each entry has: `name`, `role` (user group), `country`, `flag`, `face` (path to photo in `public/assets/faces/`), `type: "community"`.

**`AWS_SUPPORTERS`** - AWS staff supporting the event. Same shape as ORGANIZERS but `type: "aws"`. Entries with `country: "Gamemaster"` are automatically shown in the `Insert-GamemastersUpdate` insert.

**`USER_GROUPS`** - All participating user groups. Each entry has `flag`, `name`, `location` ("City, Country"), and an optional `logo` path.

To add a UG logo: drop the image into `public/assets/logos/` and set `logo: "assets/logos/your-ug.png"` on the matching `USER_GROUPS` entry. The logo will appear automatically in all compositions (InfoLoop, MainEvent, Closing).

Face images go in `public/assets/faces/` and are referenced as `"assets/faces/name.jpg"`. Use `staticFile()` from Remotion when referencing them in compositions.

---

## `schedule.ts`

The event timeline as an array of `ScheduleSegment` objects with `label`, `startMinute`, `endMinute`, and `type`. Used by the InfoLoop pre-show and any composition that needs to know the current phase.

---

## Adding a new organizer or supporter

1. Add their photo to `public/assets/faces/`
2. Add an entry to `ORGANIZERS` or `AWS_SUPPORTERS` in `participants.ts`
3. Their face will appear automatically in inserts that pull from config (`Insert-GamemastersUpdate`, `Insert-StreamHostUpdate`)
