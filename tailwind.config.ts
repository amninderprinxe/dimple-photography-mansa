import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07070A",
        charcoal: "#121214",
        "charcoal-light": "#1C1C1F",
        "charcoal-glass": "rgba(255,255,255,0.04)",
        gold: {
          DEFAULT: "#C9A227",
          light: "#E9CE79",
          soft: "#D9B75A",
          deep: "#8F6B12",
        },
        ivory: "#F4F2EA",
        smoke: "#A6A39B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E9CE79 0%, #C9A227 45%, #8F6B12 100%)",
        "noise": "url('/noise.png')",
      },
      boxShadow: {
        "gold-glow": "0 0 40px rgba(201, 162, 39, 0.25)",
        "glass": "0 8px 32px rgba(0,0,0,0.45)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 34s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
