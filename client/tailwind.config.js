/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPink: "#C48491",
        customPinkDarker: "#B16670",
        background: "#ECAEB9",
        counterBg: "#8BD4FF",
        modes: "#DAA1AB",
        modesHover: "#F5B6C1",
      },
    },
  },
  plugins: [],
};
