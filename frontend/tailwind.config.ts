import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#D8C3A5",
        terracotta: "#E07A5F",
        sage: "#81B29A",
      },
    },
  },
  plugins: [],
};

export default config;
