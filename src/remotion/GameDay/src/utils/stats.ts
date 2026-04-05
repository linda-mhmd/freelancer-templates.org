/**
 * Stats resolver — maps StatType keys to display values.
 *
 * Imported by InfoLoop, MainEvent, and ClosingPreRendered so that DISPLAY_STATS
 * from participants.ts drives all "By the Numbers" sections automatically.
 */

import { TIMEZONE_COUNT, EDITION, GAMEPLAY_HOURS } from "../../config/event";
import { USER_GROUPS, COUNTRIES, EVENT_REGION, type StatType, type StatConfig } from "../../config/participants";
import { GEO_EXTREMES } from "../../config/geo-extremes";

export interface StatItem {
  /** Display string (e.g. "57", "1st") */
  v: string;
  /** Numeric value for count-up animations */
  n: number;
  /** Short label */
  l: string;
  /** Sub-label / description */
  sub: string;
  /** Suffix appended in count-up (e.g. "+", "st", "") */
  suffix: string;
}

const STAT_DEFS: Record<StatType, StatItem> = {
  "user-groups":    { v: String(USER_GROUPS.length), n: USER_GROUPS.length, l: "User Groups",      sub: `Cities across ${EVENT_REGION}`,       suffix: "+" },
  "countries":      { v: String(COUNTRIES.length),   n: COUNTRIES.length,   l: "Countries",         sub: `From ${GEO_EXTREMES.northCountry} to ${GEO_EXTREMES.southCountry}`, suffix: "+" },
  "timezones":      { v: String(TIMEZONE_COUNT),     n: TIMEZONE_COUNT,     l: "Timezones",         sub: "UTC+0 through UTC+3",        suffix: "+" },
  "edition":        { v: EDITION,                    n: 1,                  l: "Edition",           sub: "History being made today",   suffix: "st" },
  "gameplay-hours": { v: String(GAMEPLAY_HOURS),     n: GAMEPLAY_HOURS,     l: "Hours of Gameplay", sub: "Non-stop community action",  suffix: "" },
};

/** Resolve a DISPLAY_STATS array into fully populated StatItems.
 *  Each entry is either a plain StatType string or a { type, sub } object
 *  that overrides the default sub-label for that stat.
 */
export function resolveStats(configs: StatConfig[]): StatItem[] {
  return configs.map((cfg) => {
    const type: StatType = typeof cfg === "string" ? cfg : cfg.type;
    const sub             = typeof cfg === "string" ? undefined : cfg.sub;
    return sub ? { ...STAT_DEFS[type], sub } : STAT_DEFS[type];
  });
}
