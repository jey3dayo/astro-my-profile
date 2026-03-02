import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "rose-pine-moon",
      langs: ["json"],
      wrap: true,
    },
  },
  env: {
    schema: {
      APP_NAME: envField.string({ context: "client", access: "public" }),
      SITE_DOMAIN: envField.string({ context: "client", access: "public" }),
    },
  },
});
