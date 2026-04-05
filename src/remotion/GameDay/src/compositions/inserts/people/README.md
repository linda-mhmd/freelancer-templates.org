# Inserts: People & Community

Person-focused moments and location highlights. These keep the stream personal and connected to the community.

| Insert ID | When to use | Update |
|-----------|-------------|--------|
| `Insert-StreamHostUpdate` | Stream host has something to say | `STREAM_HOST_NAME` (must match config), `MESSAGE` |
| `Insert-LocationShoutout` | Greet a specific city or user group | `CITY`, `COUNTRY` |
| `Insert-ImportantReminder` | Anything that doesn't fit another category | `TITLE`, `MESSAGE` |

**Color:** Violet (`GD_VIOLET`) for community-facing moments. Accent (`GD_ACCENT`) for location highlights.

**StreamHostUpdate:** The host's face photo, name, and role are pulled automatically from `ORGANIZERS` in `config/participants.ts`. Set `STREAM_HOST_NAME` to match the `name` field in the config.

**LocationShoutout:** Country flag emoji is intentionally allowed here - it provides location context at a glance.

---

## Previews

| | | |
|--|--|--|
| ![StreamHostUpdate](../../../../../screenshots/inserts/readme-insert-stream-host-update.png) | ![LocationShoutout](../../../../../screenshots/inserts/readme-insert-location-shoutout.png) | ![ImportantReminder](../../../../../screenshots/inserts/readme-insert-important-reminder.png) |
| `Insert-StreamHostUpdate` | `Insert-LocationShoutout` | `Insert-ImportantReminder` |

---

All inserts are 900 frames (30 seconds) at 30fps. See `src/compositions/inserts/README.md` for the full reference and design rules.
