/**
 * @file tailwind.config.js — Tailwind CSS configuration for the Ultrasooq frontend.
 *
 * @intent
 *   Configures Tailwind CSS with custom design tokens (colors, radii, animations)
 *   that integrate with the Shadcn UI component library via CSS custom properties.
 *
 * @idea
 *   All colors are defined as HSL CSS variables (e.g., `--primary`, `--background`)
 *   set in the global CSS. This allows theme switching by changing the variable values.
 *   The Radix UI accordion keyframes/animations are included for smooth expand/collapse.
 *
 * @usage
 *   Loaded automatically by PostCSS/Tailwind during build. CSS classes like
 *   `bg-primary`, `text-muted-foreground`, `rounded-lg` are available in JSX.
 *
 * @depends
 *   - tailwindcss-animate — Plugin for animation utilities (animate-in, animate-out).
 *   - CSS custom properties defined in global stylesheet (--primary, --border, etc.).
 *
 * @notes
 *   - Content paths scan pages/, components/, and app/ directories for class usage.
 *   - Color tokens follow the Shadcn UI convention: semantic names mapped to HSL vars.
 *   - Border radius uses a `--radius` CSS variable for consistent rounding.
 *   - Accordion animations are for Radix UI Accordion component height transitions.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
  plugins: [require("tailwindcss-animate")],
}

