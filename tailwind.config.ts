import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-orange": "#EE6F00",
        "dark-orange": "#B65603",
      },
      fontFamily: {
        sans: ["var(--font-gabarito)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
