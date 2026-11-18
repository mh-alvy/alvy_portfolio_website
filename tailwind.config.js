/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-cyan': '#00f2ff',
        'primary-purple': '#bc13fe',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        tech: ['Orbitron', 'monospace'],
        'mono-code': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
