import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deepblue: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#bae0ff',
          300: '#7cc2ff',
          400: '#369eff',
          500: '#1e50ff',
          600: '#0052ff',
          700: '#003ecc',
          800: '#0032aa',
          900: '#0a1d56',
        },
        brandpurple: '#7c3aed',
        softbg: '#f4f7fe',
        cardbg: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        heading: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
