/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#3c7471',
        customHover: '#f28f43',
      },
    },
  },
  plugins: [],
}