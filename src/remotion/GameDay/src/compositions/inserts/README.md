# Inserts

30-second full-screen announcements for live use during gameplay. Each is independently renderable from Remotion Studio and triggered on demand by the stream operator.

See `docs/inserts.md` for the full contributor guide including color coding and design rules.
See `docs/playbook.md` for when and how to use them during a live event.

---

## Folder structure

Inserts are organized by purpose. Each subfolder has its own README.

| Folder | Purpose | Color |
|--------|---------|-------|
| `event-flow/` | Phase markers: kickoff, halftime, breaks, end of game | Gold / Orange / Violet |
| `commentary/` | Narrative moments: first completion, close race, comeback, spotlights | Accent / Violet |
| `quest/` | Quest status: fixed, broken, hints, new quests | Green / Red / Orange |
| `ops/` | Operational: platform issues, scores, Gamemaster announcements | Orange / Red / Violet |
| `people/` | Person-focused: stream host, location shoutouts, reminders | Violet / Accent |

---

## Quick reference

### Event Flow
| ID | Color | Use case |
|----|-------|----------|
| Insert-QuestsLive | Orange | Kickoff - quests are accessible |
| Insert-HalfTime | Gold | 60-minute check-in |
| Insert-FinalCountdown | Orange | Last X minutes warning |
| Insert-GameExtended | Gold | Extra time added |
| Insert-LeaderboardHidden | Gold | Scores go dark for final stretch |
| Insert-ScoresCalculating | Gold | Waiting for final results |
| Insert-BreakAnnouncement | Violet | Short pause |
| Insert-WelcomeBack | Violet | Returning from a break |

### Live Commentary
| ID | Color | Use case |
|----|-------|----------|
| Insert-FirstCompletion | Accent | First team to finish a quest |
| Insert-CloseRace | Accent | Two teams neck and neck |
| Insert-ComebackAlert | Accent | Team climbing dramatically |
| Insert-TopTeams | Violet | Mid-game standings snapshot |
| Insert-CollectiveMilestone | Accent | X of Y teams completed a quest |
| Insert-TeamSpotlight | Violet | Feature a specific team |

### Quest Operations
| ID | Color | Use case |
|----|-------|----------|
| Insert-QuestFixed | Green | Specific quest repaired |
| Insert-QuestBroken | Red | Quest unavailable |
| Insert-QuestUpdate | Green + Orange | Quest fixed + new quest |
| Insert-QuestHint | Orange | Gamemaster hint for stuck teams |
| Insert-NewQuestAvailable | Orange | New quest just unlocked |
| Insert-SurveyReminder | Gold | Bonus quest available |

### Operational
| ID | Color | Use case |
|----|-------|----------|
| Insert-StreamInterruption | Orange + Violet | Environment + team update |
| Insert-TechnicalIssue | Red | Known issue being investigated |
| Insert-Leaderboard | Violet | Scores updated |
| Insert-ScoreCorrection | Violet | Scores adjusted |
| Insert-GamemastersUpdate | Orange | Gamemaster announcement |

### People & Community
| ID | Color | Use case |
|----|-------|----------|
| Insert-StreamHostUpdate | Violet | Announcement from the stream host |
| Insert-LocationShoutout | Accent | City or group shoutout |
| Insert-ImportantReminder | Gold | Generic - anything else |

---

## Adding a new insert

1. Copy `_TEMPLATE.tsx` into the appropriate subfolder
2. Change the 3 variables at the top (`TITLE`, `MESSAGE`, `ACCENT_COLOR`)
3. Register it in `src/Root.tsx` under the matching section
4. Add a row to the subfolder's `README.md`
5. Add a row to the table above

For complex layouts (dual cards, face photos, data arrays), use an existing insert in the same subfolder as a reference.
