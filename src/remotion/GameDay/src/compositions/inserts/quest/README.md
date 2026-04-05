# Inserts: Quest Operations

Quest status changes. Use these whenever the state of a quest changes — broken, fixed, new, or needing a hint.

| Insert ID | When to use | Update |
|-----------|-------------|--------|
| `Insert-QuestFixed` | A specific broken quest has been repaired | `QUEST_NAME` |
| `Insert-QuestBroken` | A quest is unavailable — teams should skip it | `QUEST_NAME` |
| `Insert-QuestUpdate` | Quest fixed AND new quest available simultaneously | Edit both cards directly |
| `Insert-QuestHint` | Gamemasters want to nudge stuck teams without giving away the answer | `QUEST_NAME`, `HINT_TEXT` |
| `Insert-NewQuestAvailable` | A new quest just unlocked (not a repair — a fresh challenge) | `QUEST_NAME`, `DESCRIPTION` |
| `Insert-SurveyReminder` | A bonus survey quest is available | `QUEST_NAME` |

**Color:** Green (`GD_GREEN`) for fixed/resolved. Red (`GD_RED`) for broken. Orange (`GD_ORANGE`) for new and hints — AWS platform activity.

**Important:** `QuestFixed` and `QuestBroken` are for single-quest updates. Use `QuestUpdate` only when you need to communicate both a fix AND a new quest in one insert.

---

## Previews

| | | |
|--|--|--|
| ![QuestFixed](../../../../../screenshots/inserts/readme-insert-quest-fixed.png) | ![QuestBroken](../../../../../screenshots/inserts/readme-insert-quest-broken.png) | ![QuestUpdate](../../../../../screenshots/inserts/readme-insert-quest-update.png) |
| `Insert-QuestFixed` | `Insert-QuestBroken` | `Insert-QuestUpdate` |
| ![QuestHint](../../../../../screenshots/inserts/readme-insert-quest-hint.png) | ![NewQuestAvailable](../../../../../screenshots/inserts/readme-insert-new-quest.png) | ![SurveyReminder](../../../../../screenshots/inserts/readme-insert-survey-reminder.png) |
| `Insert-QuestHint` | `Insert-NewQuestAvailable` | `Insert-SurveyReminder` |

---

All inserts are 900 frames (30 seconds) at 30fps. See `src/compositions/inserts/README.md` for the full reference and design rules.
