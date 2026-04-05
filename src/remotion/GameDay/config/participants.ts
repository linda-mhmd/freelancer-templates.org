/**
 * Participants Configuration  -  AWS Community GameDay Europe
 *
 * Contains all organizers, AWS supporters, and participating user groups.
 * Update face image paths if you move the assets folder.
 * Update names/roles/groups to match your own event.
 *
 * Face images live in: public/assets/faces/
 * Note: asset paths here are relative to public/, so use "assets/faces/..."
 */

// ── User Group Interface ──
export interface UserGroup {
  flag: string;
  name: string;
  location: string; // "City, Country"
  logo?: string; // Logo URL — add directly here, no need for a separate logos.ts
}

// ── All 57 Participating User Groups ──
// AWS Community GameDay Europe 2026
//
// `as const satisfies UserGroup[]` preserves the literal string types of every
// `name` field so that TypeScript can derive the UserGroupName union below.
export const USER_GROUPS = [
  { flag: "🇪🇸", name: "AWS Barcelona User Group",         location: "Barcelona, Spain",                    logo: "https://secure.meetupstatic.com/photos/event/a/6/c/e/clean_524682702.webp" },
  { flag: "🇬🇧", name: "AWS Leeds User Group",             location: "Leeds, United Kingdom",               logo: "https://secure.meetupstatic.com/photos/event/a/8/f/c/600_478303260.webp" },
  { flag: "🇫🇮", name: "AWS Meetup JKL",                   location: "Jyväskylä, Finland",                  logo: "https://secure.meetupstatic.com/photos/event/4/d/f/7/clean_502519959.webp" },
  { flag: "🇨🇭", name: "AWS Swiss UG - Lausanne",          location: "Lausanne, Switzerland",               logo: "https://secure.meetupstatic.com/photos/event/3/b/1/8/clean_507495128.webp" },
  { flag: "🇨🇭", name: "AWS Swiss UG - Zürich",            location: "Zürich, Switzerland",                 logo: "https://secure.meetupstatic.com/photos/event/d/5/4/7/clean_481554599.webp" },
  { flag: "🇨🇭", name: "AWS Swiss UG - Geneva",            location: "Geneva, Switzerland",                 logo: "https://secure.meetupstatic.com/photos/event/6/f/2/1/clean_512908449.webp" },
  { flag: "🇷🇴", name: "AWS Transylvania Cloud",           location: "Cluj-Napoca, Romania",                logo: "https://secure.meetupstatic.com/photos/event/5/1/f/600_528241311.webp" },
  { flag: "🇵🇱", name: "AWS User Group 3City",             location: "Gdansk, Poland",                      logo: "https://secure.meetupstatic.com/photos/event/9/d/3/e/clean_519460254.webp" },
  { flag: "🇪🇸", name: "AWS UG Asturias",                  location: "Oviedo, Spain",                       logo: "https://secure.meetupstatic.com/photos/event/2/8/0/6/clean_513130246.webp" },
  { flag: "🇬🇷", name: "AWS User Group Athens",            location: "Athens, Greece",                      logo: "https://secure.meetupstatic.com/photos/event/a/1/8/b/clean_520181355.webp" },
  { flag: "🇧🇪", name: "AWS User Group Belgium",           location: "Brussels, Belgium",                   logo: "https://secure.meetupstatic.com/photos/event/7/d/7/b/clean_523472123.webp" },
  { flag: "🇩🇪", name: "AWS User Group Bonn",              location: "Bonn, Germany",                       logo: "https://secure.meetupstatic.com/photos/event/3/f/5/2/clean_513136210.webp" },
  { flag: "🇭🇺", name: "AWS User Group Budapest",          location: "Budapest, Hungary",                   logo: "https://secure.meetupstatic.com/photos/event/7/3/e/5/clean_524189669.webp" },
  { flag: "🇩🇪", name: "AWS User Group Cologne",           location: "Köln, Germany",                       logo: "https://secure.meetupstatic.com/photos/event/e/4/3/8/clean_518038424.webp" },
  { flag: "🇮🇹", name: "AWS User Group Cuneo",             location: "Cuneo, Italy",                        logo: "https://secure.meetupstatic.com/photos/event/c/e/d/5/clean_527092949.webp" },
  { flag: "🇩🇪", name: "AWS User Group Dortmund",          location: "Dortmund, Germany",                   logo: "https://secure.meetupstatic.com/photos/event/4/9/3/e/clean_531138750.webp" },
  { flag: "🇫🇮", name: "AWS User Group Finland",           location: "Helsinki, Finland",                   logo: "https://secure.meetupstatic.com/photos/event/5/9/8/a/clean_484822922.webp" },
  { flag: "🇫🇷", name: "AWS UG France - Paris",            location: "Paris, France",                       logo: "https://secure.meetupstatic.com/photos/event/c/5/1/5/clean_497630453.webp" },
  { flag: "🇪🇸", name: "AWS UG Galicia",                   location: "Santiago de Compostela, Spain",       logo: "https://secure.meetupstatic.com/photos/event/3/3/1/c/600_531253084.webp" },
  { flag: "🇮🇹", name: "AWS User Group Genova",            location: "Genova, Italy",                       logo: "https://secure.meetupstatic.com/photos/event/c/d/8/2/clean_530272610.webp" },
  { flag: "🇩🇪", name: "AWS User Group Hannover",          location: "Hannover, Germany",                   logo: "https://secure.meetupstatic.com/photos/event/5/d/e/d/highres_457224045.jpeg" },
  { flag: "🇳🇴", name: "AWS UG Innlandet",                 location: "Hamar, Norway",                       logo: "https://secure.meetupstatic.com/photos/event/4/4/a/5/clean_529097573.webp" },
  { flag: "🇹🇷", name: "AWS User Group Istanbul",          location: "Istanbul, Turkey" },
  { flag: "🇺🇦", name: "AWS UG Ivano-Frankivsk",           location: "Ivano-Frankivsk, Ukraine",            logo: "https://secure.meetupstatic.com/photos/event/7/7/3/b/clean_487470523.webp" },
  { flag: "🇫🇮", name: "AWS User Group Kuopio",            location: "Kuopio, Finland",                     logo: "https://secure.meetupstatic.com/photos/event/6/c/5/c/clean_516627740.webp" },
  { flag: "🇸🇮", name: "AWS UG Ljubljana",                 location: "Ljubljana, Slovenia",                 logo: "https://secure.meetupstatic.com/photos/event/7/6/5/0/clean_488190288.webp" },
  { flag: "🇲🇰", name: "AWS UG Macedonia",                 location: "Skopje, Macedonia",                   logo: "https://secure.meetupstatic.com/photos/event/3/3/2/8/clean_502273096.webp" },
  { flag: "🇪🇸", name: "AWS User Group Malaga",            location: "Malaga, Spain",                       logo: "https://secure.meetupstatic.com/photos/event/6/c/6/clean_531001734.webp" },
  { flag: "🇲🇩", name: "AWS UG Moldova",                   location: "Chisinau, Moldova",                   logo: "https://secure.meetupstatic.com/photos/event/9/e/b/5/clean_509920629.webp" },
  { flag: "🇲🇪", name: "AWS UG Montenegro",                location: "Podgorica, Montenegro",               logo: "https://secure.meetupstatic.com/photos/event/3/9/3/e/clean_520514654.webp" },
  { flag: "🇩🇪", name: "AWS User Group Munich",            location: "München, Germany",                    logo: "https://secure.meetupstatic.com/photos/event/c/0/3/4/clean_504529204.webp" },
  { flag: "🇩🇪", name: "AWS UG Münsterland",               location: "Münster, Germany",                    logo: "https://secure.meetupstatic.com/photos/event/3/b/c/2/clean_530115298.webp" },
  { flag: "🇮🇹", name: "AWS User Group Napoli",            location: "Naples, Italy",                       logo: "https://secure.meetupstatic.com/photos/event/1/c/7/7/clean_520447287.webp" },
  { flag: "🇩🇪", name: "AWS UG Nürnberg",                  location: "Nürnberg, Germany",                   logo: "https://secure.meetupstatic.com/photos/event/d/0/9/b/clean_466973403.webp" },
  { flag: "🇳🇴", name: "AWS UG Oslo",                      location: "Oslo, Norway",                        logo: "https://secure.meetupstatic.com/photos/event/3/c/d/c/clean_531375580.webp" },
  { flag: "🇮🇹", name: "AWS User Group Pavia",             location: "Pavia, Italy",                        logo: "https://secure.meetupstatic.com/photos/event/b/b/b/e/clean_519588062.webp" },
  { flag: "🇮🇹", name: "AWS User Group Roma",              location: "Roma, Italy",                         logo: "https://secure.meetupstatic.com/photos/event/9/4/d/2/clean_526178098.webp" },
  { flag: "🇮🇹", name: "AWS User Group Salerno",           location: "Salerno, Italy",                      logo: "https://secure.meetupstatic.com/photos/event/9/9/2/5/clean_531519205.webp" },
  { flag: "🇧🇦", name: "AWS UG Sarajevo",                  location: "Sarajevo, Bosnia & Herzegovina",      logo: "https://secure.meetupstatic.com/photos/event/9/9/8/6/clean_503679302.webp" },
  { flag: "🇸🇪", name: "AWS UG Skåne",                     location: "Malmö, Sweden",                       logo: "https://secure.meetupstatic.com/photos/event/6/9/5/d/clean_526586973.webp" },
  { flag: "🇫🇮", name: "AWS UG Tampere",                   location: "Tampere, Finland",                    logo: "https://secure.meetupstatic.com/photos/event/7/d/6/e/clean_485432110.webp" },
  { flag: "🇨🇭", name: "AWS UG Ticino",                    location: "Lugano, Switzerland",                 logo: "https://secure.meetupstatic.com/photos/event/2/9/4/d/clean_531490573.webp" },
  { flag: "🇷🇴", name: "AWS UG Timisoara",                 location: "Timisoara, Romania",                  logo: "https://secure.meetupstatic.com/photos/event/8/9/a/8/clean_513815240.webp" },
  { flag: "🇮🇹", name: "AWS UG Venezia",                   location: "Venice, Italy",                       logo: "https://secure.meetupstatic.com/photos/event/8/8/7/7/clean_523654935.webp" },
  { flag: "🇦🇹", name: "AWS User Group Vienna",            location: "Vienna, Austria",                     logo: "https://secure.meetupstatic.com/photos/event/9/8/d/5/highres_523779125.jpeg" },
  { flag: "🇵🇱", name: "AWS UG Warsaw",                    location: "Warsaw, Poland",                      logo: "https://secure.meetupstatic.com/photos/event/6/1/e/5/clean_516145061.webp" },
  { flag: "🇬🇧", name: "AWS UG West Midlands",             location: "Birmingham, United Kingdom",          logo: "https://secure.meetupstatic.com/photos/event/6/8/3/a/clean_526886682.webp" },
  { flag: "🇮🇹", name: "AWS Well-Architected UG Italy",    location: "Milano, Italy",                       logo: "https://secure.meetupstatic.com/photos/event/b/a/9/8/clean_528767768.webp" },
  { flag: "🇩🇪", name: "AWS Women's UG Munich",            location: "Munich, Germany",                     logo: "https://secure.meetupstatic.com/photos/event/2/e/5/b/clean_523991867.webp" },
  { flag: "🇩🇪", name: "Berlin AWS User Group",            location: "Berlin, Germany",                     logo: "https://secure.meetupstatic.com/photos/event/1/4/c/2/clean_495125314.webp" },
  { flag: "🇷🇴", name: "Bucharest AWS User Group",         location: "Bucharest, Romania",                  logo: "https://secure.meetupstatic.com/photos/event/9/6/0/1/clean_515798401.webp" },
  { flag: "🇩🇪", name: "Dresden AWS User Group",           location: "Dresden, Germany",                    logo: "https://secure.meetupstatic.com/photos/event/7/f/4/4/clean_469592580.webp" },
  { flag: "🇩🇪", name: "Frankfurt AWS User Group",         location: "Frankfurt, Germany",                  logo: "https://secure.meetupstatic.com/photos/event/b/4/5/f/clean_495406175.webp" },
  { flag: "🇫🇷", name: "Grenoble AWS User Group",          location: "Grenoble, France",                    logo: "https://secure.meetupstatic.com/photos/event/c/d/1/c/clean_497632508.webp" },
  { flag: "🇩🇪", name: "Leipzig AWS User Group",           location: "Leipzig, Germany",                    logo: "https://secure.meetupstatic.com/photos/event/8/1/3/7/clean_495873079.webp" },
  { flag: "🇫🇷", name: "Lille AWS User Group",             location: "Lille, France",                       logo: "https://secure.meetupstatic.com/photos/event/c/6/2/1/clean_479690721.webp" },
  { flag: "🇫🇷", name: "Poitiers AWS User Group",          location: "Poitiers, France",                    logo: "https://secure.meetupstatic.com/photos/event/c/d/3/1/clean_497632529.webp" },
] as const satisfies UserGroup[];

// Derived from USER_GROUPS — every valid user group name as a TypeScript union.
// Used as the type for CommunityMembership.userGroup so that an invalid name is a compile error.
export type UserGroupName = typeof USER_GROUPS[number]["name"];

export const COUNTRIES = Array.from(new Set(USER_GROUPS.map((g) => g.flag)));

// ── Community Program Types ──
export type CommunityProgram =
  | "ug-leader"
  | "aws-hero"
  | "aws-community-builder"
  | "cloud-club-captain"
  | "aws-ambassador";

export const COMMUNITY_PROGRAM_LABELS: Record<CommunityProgram, string> = {
  "ug-leader":              "AWS User Group Leader",
  "aws-hero":               "AWS Hero",
  "aws-community-builder":  "AWS Community Builder",
  "cloud-club-captain":     "Cloud Club Captain",
  "aws-ambassador":         "AWS Ambassador",
};

export interface CommunityMembership {
  program: CommunityProgram;
  userGroup?: UserGroupName; // The UG this person leads or represents — must match a UserGroup.name exactly
}

// ── Organizer Interface ──
export interface Organizer {
  name: string;
  fullName?: string;         // Only when display name differs from lookup name (e.g., host intro card)
  streamRole?: "host" | "co-organizer" | "support-presenter" | "gamemaster";
  programs?: CommunityMembership[]; // Community program memberships — set for community organizers
  jobTitle?: string;         // Job title shown on cards — set for AWS employees instead of programs
  location?: string;         // "City, Country" — set for community organizers, not needed for AWS employees
  flag: string;
  face: string;
  type: "community" | "aws";
  title?: string;            // Shown on intro cards (e.g., "AWS Community Hero")
  subtitle?: string;         // Secondary line on intro card
  bio?: string[];            // Bullet points for the preshow bio slide
}

// Returns the display role string for an organizer.
// For community: joins all program labels (e.g., "AWS User Group Leader & AWS Hero").
// For AWS employees: returns the job title.
export function getOrganizerRole(p: Organizer): string {
  if (p.jobTitle) return p.jobTitle;
  if (p.programs?.length) {
    return p.programs.map((m) => COMMUNITY_PROGRAM_LABELS[m.program]).join(" & ");
  }
  return "";
}

// Returns the UserGroupName this organizer represents (from their ug-leader membership).
// Used for UG logo lookup against USER_GROUPS.
export function getOrganizerUserGroup(p: Organizer): UserGroupName | undefined {
  return p.programs?.find((m) => m.program === "ug-leader")?.userGroup;
}

// ── Community Organizers ──
// Note: Face images use placeholder avatars. Only Linda Mohamed's photo is retained.
export const ORGANIZERS: Organizer[] = [
  {
    name: "Jerome", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Belgium" }],
    location: "Brussels, Belgium", flag: "🇧🇪", face: "avatar/placeholder.svg", type: "community",
    bio: ["AWS User Group Leader and co-founder of this initiative. Jerome co-architected the event structure, competition framework, and built the network of 53 User Groups across 23 countries."],
  },
  {
    name: "Anda", streamRole: "co-organizer",
    programs: [
      { program: "ug-leader", userGroup: "AWS Swiss UG - Geneva" },
      { program: "aws-community-builder" },
    ],
    location: "Geneva, Switzerland", flag: "🇨🇭", face: "avatar/placeholder.svg", type: "community",
    bio: ["AWS User Group Leader and initiator of this GameDay. Anda had the original vision for a pan-European AWS community event and brought together volunteer organizers from 53 User Groups across the continent."],
  },
  {
    name: "Marcel", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "AWS UG Münsterland" }],
    location: "Münster, Germany", flag: "🇩🇪", face: "avatar/placeholder.svg", type: "community",
  },
  {
    name: "Linda", fullName: "Linda Mohamed", streamRole: "host",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group Vienna" },
      { program: "aws-hero" },
    ],
    location: "Vienna, Austria", flag: "🇦🇹", face: "assets/faces/linda.jpg", type: "community",
    title: "AWS Community Hero",
    subtitle: "AWS User Group Vienna · Förderverein AWS Community DACH",
    bio: [
      "Your host for today's GameDay Europe stream - broadcasting live across 53 cities",
      "Leader of AWS User Group Vienna & AWS Women's User Group Vienna",
      "Chairwoman of Förderverein AWS Community DACH e.V.",
      "Vice Chair of the largest open source foundation in Austria",
    ],
  },
  {
    name: "Manuel", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "Frankfurt AWS User Group" }],
    location: "Frankfurt, Germany", flag: "🇩🇪", face: "avatar/placeholder.svg", type: "community",
  },
  {
    name: "Andreas", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Bonn" }],
    location: "Bonn, Germany", flag: "🇩🇪", face: "avatar/placeholder.svg", type: "community",
  },
  {
    name: "Lucian", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "AWS UG Timisoara" }],
    location: "Timisoara, Romania", flag: "🇷🇴", face: "avatar/placeholder.svg", type: "community",
  },
  {
    name: "Mihaly", streamRole: "support-presenter",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Budapest" }],
    location: "Budapest, Hungary", flag: "🇭🇺", face: "avatar/placeholder.svg", type: "community",
  },
];

// ── AWS Supporters (Gamemasters & Community Team) ──
// Note: Face images use placeholder avatars.
export const AWS_SUPPORTERS: Organizer[] = [
  { name: "Arnaud", streamRole: "gamemaster", jobTitle: "Sr. Developer Advocate, AWS",        flag: "🇫🇷", face: "avatar/placeholder.svg", type: "aws",
    bio: ["Sr. Developer Advocate at AWS. Arnaud will deliver the official GameDay instructions and guide all teams through the competition format, rules, and scoring system."] },
  { name: "Loïc",   streamRole: "gamemaster", jobTitle: "Sr. Technical Account Manager, AWS", flag: "🇫🇷", face: "avatar/placeholder.svg",   type: "aws",
    bio: ["Sr. Technical Account Manager at AWS. Loïc co-delivers the GameDay instructions and is available as a gamemaster throughout the competition to help with any technical questions."] },
  { name: "Uliana", jobTitle: "Community Manager, AWS",             flag: "🌍", face: "avatar/placeholder.svg", type: "aws" },
  { name: "Natalia", jobTitle: "DevEx Community Manager, AWS",      flag: "🌍", face: "avatar/placeholder.svg", type: "aws" },
];

export const EVENT_REGION = "Europe";

// ── Display Stats Config ────────────────────────────────────────────────────
// Pick which 1–5 stats appear in the "By the Numbers" sections.
// Values are resolved automatically from participants + event config.
//
// Available options:
//   "user-groups"    → USER_GROUPS.length   (UG count)
//   "countries"      → COUNTRIES.length     (unique flags)
//   "timezones"      → TIMEZONE_COUNT       (from event.ts)
//   "edition"        → EDITION              (from event.ts, e.g. "1st")
//   "gameplay-hours" → GAMEPLAY_HOURS       (from event.ts)
export type StatType =
  | "user-groups"
  | "countries"
  | "timezones"
  | "edition"
  | "gameplay-hours";

/** Each entry is either a plain type or a type + sub-label override. */
export type StatConfig = StatType | { type: StatType; sub: string };

export const DISPLAY_STATS: StatConfig[] = [
  "user-groups",
  "countries",
  "timezones",
  "edition",
];
