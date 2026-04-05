import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  publicDir: path.resolve(__dirname, "../src/remotion/public"),
  build: {
    outDir: path.resolve(__dirname, "../static/player"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // Deduplicate packages - all source outside player/ must use player's node_modules
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      remotion: path.resolve(__dirname, "node_modules/remotion"),
      "lucide-react": path.resolve(__dirname, "node_modules/lucide-react"),
      "@remotion/transitions": path.resolve(__dirname, "node_modules/@remotion/transitions"),
      "@remotion/paths": path.resolve(__dirname, "node_modules/@remotion/paths"),
      "@remotion/shapes": path.resolve(__dirname, "node_modules/@remotion/shapes"),
      // Templates live at the repo root, not inside player/
      "@templates": path.resolve(__dirname, "../src/remotion/templates"),
      // Sims4 AI/tech explainer compositions
      "@sims4": path.resolve(__dirname, "../src/remotion/Sims4"),
      // Community GameDay stream templates
      "@gameday": path.resolve(__dirname, "../src/remotion/GameDay/src"),
    },
  },
});
