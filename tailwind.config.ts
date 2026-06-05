import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
      },
      maxWidth: {
        "screen-2xl": "1440px",
      },
      colors: {
        neon: {
          cyan: "#00f0ff",
          purple: "#b400ff",
          green: "#00ff88",
        },
        dark: {
          primary: "#0a0a0f",
          secondary: "#1a1a2e",
        },
      },
      backgroundColor: {
        "dark-primary": "#0a0a0f",
        "dark-secondary": "#1a1a2e",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-dark":
          "linear-gradient(to bottom, #0a0a0f, #1a1a2e)",
        "gradient-neon-cyan":
          "linear-gradient(135deg, #00f0ff20, transparent)",
        "gradient-neon-purple":
          "linear-gradient(135deg, #b400ff20, transparent)",
        "gradient-hero":
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
        "gradient-section":
          "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)",
        "neon-purple": "0 0 20px rgba(180, 0, 255, 0.3), 0 0 40px rgba(180, 0, 255, 0.1)",
        "neon-green": "0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
