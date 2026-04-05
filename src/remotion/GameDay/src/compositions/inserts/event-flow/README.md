# Inserts: Event Flow

Phase markers and timing anchors. Use these to mark the major transitions in the event. They set the rhythm of the broadcast.

| Insert ID | When to use | Update |
|-----------|-------------|--------|
| `Insert-QuestsLive` | The moment quests become accessible — the kickoff | Nothing |
| `Insert-HalfTime` | At the 60-minute mark | Nothing |
| `Insert-FinalCountdown` | Last 15–30 minutes warning | `MINUTES_REMAINING` |
| `Insert-GameExtended` | Extra time added to the game | `EXTRA_MINUTES` |
| `Insert-LeaderboardHidden` | When scores go dark for the final stretch | Nothing |
| `Insert-ScoresCalculating` | After gameplay ends, while results are being tallied | Nothing |
| `Insert-BreakAnnouncement` | Any short pause in the stream | Nothing |
| `Insert-WelcomeBack` | Returning from a break (pair with BreakAnnouncement) | Nothing |

**Color:** Gold (`GD_GOLD`) for most — neutral timing events. Orange (`GD_ORANGE`) for QuestsLive — AWS platform activating. Violet (`GD_VIOLET`) for break-related — community context.

---

## Previews

| | | |
|--|--|--|
| ![QuestsLive](../../../../../screenshots/inserts/readme-insert-quests-live.png) | ![HalfTime](../../../../../screenshots/inserts/readme-insert-halftime.png) | ![FinalCountdown](../../../../../screenshots/inserts/readme-insert-final-countdown.png) |
| `Insert-QuestsLive` | `Insert-HalfTime` | `Insert-FinalCountdown` |
| ![GameExtended](../../../../../screenshots/inserts/readme-insert-game-extended.png) | ![LeaderboardHidden](../../../../../screenshots/inserts/readme-insert-leaderboard-hidden.png) | ![ScoresCalculating](../../../../../screenshots/inserts/readme-insert-scores-calculating.png) |
| `Insert-GameExtended` | `Insert-LeaderboardHidden` | `Insert-ScoresCalculating` |
| ![BreakAnnouncement](../../../../../screenshots/inserts/readme-insert-break-announcement.png) | ![WelcomeBack](../../../../../screenshots/inserts/readme-insert-welcome-back.png) | |
| `Insert-BreakAnnouncement` | `Insert-WelcomeBack` | |

---

All inserts are 900 frames (30 seconds) at 30fps. See `src/compositions/inserts/README.md` for the full reference and design rules.
