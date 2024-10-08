import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "340px",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },
      fontFamily: {
        segoe: ["Segoe UI", "sans-serif"],
        kolker: ["var(--font-kolker)"],
      },
      colors: {
        "custom-gray": "#23272F",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      buttonGradient: "#0179FE",
      footerbackground: "#23272F",
      backgroundImage: {
        gradient: "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
        footer: "url('/assets/images/footerbg.png)",
        exercise: "url('/assets/images/exercise.png')",
        plans: "url('/assets/images/plans.png')",
        injury: "url('/assets/images/injury.png')",
      },
      gray: {
        25: "#FCFCFD",
        200: "#EAECF0",
        300: "#D0D5DD",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        900: "#101828",
      },
      dark: {
        200: "#0D0F10",
        300: "#131619",
        400: "#1A1D21",
        500: "#363A3D",
        600: "#76828D",
        700: "#ABB8C4",
        800: "#23272F",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
export default config;
