/** @type {import('prettier').Config} */
module.exports = {
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.json",
      options: {
        trailingComma: "none",
      },
    },
  ],
  printWidth: 120,
  trailingComma: "all",
  importOrder: [
    "^server-only$",
    "^(react/(.*)$)|^(react$)",
    "^(astro/(.*)$)|^(astro$)",
    "^(radix-ui/(.*)$)",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/app/(.*)$",
    "^@/components/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/(config/(.*)$)|^@/(config$)",
    "^@/(constants/(.*)$)|^@/(constants$)",
    "^@/hooks/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
