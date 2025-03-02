const createPalette = require("./src/constants/themes/create-palette");

/** @type {import('tailwindcss').Config} */

const palette = createPalette();


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...palette,
      },
    },
  },
  plugins: [],
}

