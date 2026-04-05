# Inserts: Live Commentary

Narrative broadcast moments. These make the stream feel like live commentary rather than a status board. Use them to build tension, celebrate milestones, and give the audience someone and something to follow.

| Insert ID | The moment | Update |
|-----------|------------|--------|
| `Insert-FirstCompletion` | First team to complete a quest — the "goal scored" moment | `QUEST_NAME`, `TEAM_NAME`, `TEAM_GROUP` |
| `Insert-CloseRace` | Two teams neck and neck | `TEAM_A`, `TEAM_B`, `POINT_DIFF` |
| `Insert-ComebackAlert` | Team climbing dramatically from low rank | `TEAM_NAME`, `USER_GROUP`, `FROM_RANK`, `TO_RANK` |
| `Insert-TopTeams` | Mid-game standings snapshot | `LABEL`, `TOP_TEAMS` array |
| `Insert-CollectiveMilestone` | "X of Y teams completed Quest Z" | `QUEST_NAME`, `COMPLETED_COUNT`, `TOTAL_COUNT` |
| `Insert-TeamSpotlight` | Feature a specific team — human interest | `TEAM_NAME`, `USER_GROUP`, `COUNTRY`, `COUNTRY_FLAG`, `FACT` |

**Color:** Accent (`GD_ACCENT`) for celebrations and drama. Violet (`GD_VIOLET`) for community-focused moments.

**Usage cadence:** Aim for one commentary insert every 15–20 minutes during gameplay. Don't cluster them — space them so each one lands. See `docs/playbook.md` for a suggested run order.

---

## Previews

| | | |
|--|--|--|
| ![FirstCompletion](../../../../../screenshots/inserts/readme-insert-first-completion.png) | ![CloseRace](../../../../../screenshots/inserts/readme-insert-close-race.png) | ![ComebackAlert](../../../../../screenshots/inserts/readme-insert-comeback-alert.png) |
| `Insert-FirstCompletion` | `Insert-CloseRace` | `Insert-ComebackAlert` |
| ![TopTeams](../../../../../screenshots/inserts/readme-insert-top-teams.png) | ![CollectiveMilestone](../../../../../screenshots/inserts/readme-insert-collective-milestone.png) | ![TeamSpotlight](../../../../../screenshots/inserts/readme-insert-team-spotlight.png) |
| `Insert-TopTeams` | `Insert-CollectiveMilestone` | `Insert-TeamSpotlight` |

---

All inserts are 900 frames (30 seconds) at 30fps. See `src/compositions/inserts/README.md` for the full reference and design rules.
