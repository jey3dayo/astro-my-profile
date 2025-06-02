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
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:@typescript-eslint/stylistic",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:astro/recommended",
      "plugin:tailwindcss/recommended",
      "prettier",
    ],
    overrides: [
      {
        files: ["*.astro"],
        parser: "astro-eslint-parser",
        parserOptions: {
          // project: "./tsconfig.json",
          parser: "@typescript-eslint/parser",
          extraFileExtensions: [".astro"],
        },
      },
    ],
    plugins: ["@typescript-eslint", "react", "tailwindcss"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "tailwindcss/classnames-order": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "tailwindcss/no-custom-classname": 0,
    },
  }),
  {
    ignores: [
      "node_modules",
      "public",
      "dist",
      ".vercel",
      "astro.config.mjs",
      "eslint.config.js",
      "commitlint.config.cjs",
      "lint-staged.config.cjs",
      "env.mjs",
    ],
  },
];
