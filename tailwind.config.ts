import radixUiColors from "@radix-ui/colors";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import tailwindColors from "tailwindcss/colors";
import { createPlugin } from "windy-radix-palette";

const radixGrayColor = "slate";
const primaryColor = "violet";
const accentColor = "teal";

export const grayColor = "neutral";
const palette = {
  black: tailwindColors[grayColor]["950"],
  dark: tailwindColors[grayColor]["800"],
  medium: tailwindColors[grayColor]["500"],
  light: tailwindColors[grayColor]["100"],
  white: tailwindColors[grayColor]["50"],
};

const windyRadixPalette = createPlugin();

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-color": windyRadixPalette.alias(primaryColor),
        "gray-color": windyRadixPalette.alias(radixGrayColor),
        "accent-color": windyRadixPalette.alias(accentColor),
        ...radixUiColors,
        ...palette,

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        weak: {
          DEFAULT: "var(--weak)",
          foreground: "var(--weak-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, windyRadixPalette.plugin],
};

export default config;
