// tailwind.config.ts
import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"; // 👈 Ensure this import is here

const config: Config = {
  darkMode: ["class"],
  content: [ // 👈 This required 'content' property is now clearly here
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        // 🌿 ProGro / Visionaire Brand Palette
        primary: {
          DEFAULT: "#0B6E4F", // Deep green (Visionaire core)
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F9B234", // Brand gold
          foreground: "#003399", // Deep navy text contrast
        },
        accent: {
          DEFAULT: "#2B7A78", // Muted teal accent
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#737373",
        },
        background: "#FFFFFF",
        foreground: "#1C1C1C",

        // UI/Neutral scales
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#0B6E4F",

        // Semantic colors
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        // 👈 Assuming you have custom font variables defined
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }, // 👈 Completed the keyframe value
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
  // 👈 CRITICAL: The 'plugins' property MUST exist in the main object
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
} satisfies Config // 👈 The 'satisfies Config' ensures we check against the full type

export default config