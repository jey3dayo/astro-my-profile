import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.config({
    env: {
      node: true,
    },
    extends: ["eslint:recommended", "plugin:astro/recommended", "plugin:tailwindcss/recommended", "prettier"],
    plugins: ["react", "tailwindcss"],
    rules: {
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": 0,
    },
  }),
  {
    ignores: ["node_modules", "public", "dist", "eslint.config.js", "astro.config.mjs", "**/*.astro"],
  },
];
