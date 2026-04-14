/**
 * Stock image helper for content creator templates.
 *
 * Returns Picsum/Unsplash-style stock URLs as placeholders so templates
 * have something visual until the user uploads real footage. Uses
 * picsum.photos with seeded URLs for deterministic results across renders
 * (Remotion renders the same composition many times — random sources
 * would flicker between frames).
 *
 * To use: `<img src={getStockImage('festival', 1080, 1920, 1)} />`
 *
 * The seed parameter ensures the same image is returned for the same
 * (category, seed) pair, so a template that shows 4 outfit images at
 * scenes 1-4 always shows the same 4 images.
 *
 * When the user uploads real assets, swap the helper out for an
 * `assetUrl` prop on the spec.
 */

export type StockCategory =
  | "festival"
  | "outfit"
  | "makeup"
  | "coffee"
  | "sunset"
  | "party"
  | "nature"
  | "city"
  | "food"
  | "work"
  | "fitness"
  | "concert"
  | "fashion"
  | "travel"
  | "lifestyle"
  | "minimalist"
  | "dark"
  | "warm";

/**
 * Picsum.photos seed buckets — per-category seed offset so images feel
 * thematic without random flicker on re-render. These were chosen by
 * scrolling picsum and picking seeds that returned the right vibe.
 */
const SEED_BUCKETS: Record<StockCategory, number[]> = {
  festival: [1015, 1018, 1027, 1043, 1057],
  outfit: [177, 219, 305, 338, 1027],
  makeup: [219, 338, 449, 535, 593],
  coffee: [225, 312, 431, 766, 1080],
  sunset: [110, 184, 281, 367, 416],
  party: [453, 538, 593, 718, 823],
  nature: [10, 15, 28, 36, 99],
  city: [164, 169, 244, 274, 380],
  food: [292, 312, 365, 488, 766],
  work: [3, 48, 119, 160, 180],
  fitness: [177, 416, 593, 718, 823],
  concert: [1015, 1018, 1027, 1043, 1057],
  fashion: [219, 305, 338, 449, 535],
  travel: [110, 184, 281, 367, 416],
  lifestyle: [177, 225, 312, 449, 535],
  minimalist: [3, 48, 119, 160, 180],
  dark: [10, 15, 28, 36, 99],
  warm: [110, 184, 281, 367, 416],
};

/**
 * Returns a stable stock image URL for the given category + seed.
 * Same inputs always return the same image — safe for Remotion renders.
 */
export function getStockImage(
  category: StockCategory,
  width: number,
  height: number,
  seed: number = 1
): string {
  const bucket = SEED_BUCKETS[category];
  const id = bucket[(seed - 1) % bucket.length];
  // Picsum CDN — no API key, deterministic by ID, returns JPG
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}

/**
 * Returns a list of N stock images for sequential scenes (e.g. GRWM
 * 4-scene auto-cut: bare → makeup → hair → outfit). Each call gets a
 * different image but stable across renders.
 */
export function getStockImageSequence(
  category: StockCategory,
  count: number,
  width: number,
  height: number
): string[] {
  const bucket = SEED_BUCKETS[category];
  return Array.from({ length: count }, (_, i) => {
    const id = bucket[i % bucket.length];
    return `https://picsum.photos/id/${id}/${width}/${height}`;
  });
}

/**
 * Returns a blurhash-style placeholder color for the category — useful as
 * a background while the image loads, or as a fallback if the network is
 * unavailable during rendering.
 */
export function getStockImagePlaceholder(category: StockCategory): string {
  const placeholders: Record<StockCategory, string> = {
    festival: "#1a0f2e",
    outfit: "#2d1f3d",
    makeup: "#3d1f2d",
    coffee: "#3d2a1f",
    sunset: "#3d2a1f",
    party: "#1f1f3d",
    nature: "#1f3d2a",
    city: "#1f2a3d",
    food: "#3d2a1f",
    work: "#1f1f1f",
    fitness: "#1f3d3d",
    concert: "#1a0f2e",
    fashion: "#2d1f3d",
    travel: "#1f2a3d",
    lifestyle: "#3d1f2d",
    minimalist: "#1f1f1f",
    dark: "#0a0a0a",
    warm: "#3d2a1f",
  };
  return placeholders[category];
}
