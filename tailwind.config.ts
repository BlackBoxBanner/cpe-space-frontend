import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-outfit)",
          "var(--font-space-grotesk)",
          "Nunito",
          "sans-serif",
        ],
        decorate: ["var(--font-space-grotesk)", "Nunito", "sans-serif"],
      },
      colors: {
        "smoky-black": "#0D0D0D",
        alabaster: "#F3F4E5",
        gray: "#B7B6BF",
        timberwolf: "#DCDCD1",
        liberty: "#4960AC",
        "cobalt-blue": "#83B3E1",
        orange: "#F15825",
        "yellow-orange": "#FCB43E",
        white: "#FFFFFF",
        yonder: "#9EAAC9",
      },
    },
  },
  plugins: [],
};
export default config;
