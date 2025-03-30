/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Megrim', 'sans-serif'], // This makes Tourney the default font
      },
    },
  },
  plugins: [],
}

