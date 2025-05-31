import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    preact(),
  ],
  vite: {
    ssr: {
      noExternal: ["astro"],
    },
  },
  markdown: {
    shikiConfig: {
      theme: "rose-pine-moon",
      langs: ["json"],
      wrap: true,
    },
  },
});
