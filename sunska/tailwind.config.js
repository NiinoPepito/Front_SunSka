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
        white:'#fff',
        orange: '#f28f43',
        bleugris: '#32445a',
        vertbleu: '#3c7471',
      },
    },
  },
  plugins: [],
}