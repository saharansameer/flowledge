import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: {
    files: [
      "./src/**/*.{ts,tsx}",
      "./src/routes/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
      "./src/components/ui/**/*.{ts,tsx}",
    ],
  },
  theme: {},
  plugins: [],
};

export default config;