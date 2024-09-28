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
                "main-navy": "#09001C",
                "main-orange": "#EE6F00",
            },
            fontFamily: {
                "sans": ["var(--font-jetbrains-mono)", "sans-serif"],
                "mattone": ["var(--font-mattone)"],
                "mattone-bold": ["var(--font-mattone-bold)"],
            },
        },
    },
    plugins: [],
};

export default config;
