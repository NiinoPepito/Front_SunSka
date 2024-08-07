/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white:'#fff',
        orange: '#f28f43',
        bleugris: '#32445a',
        vertbleu: '#3c7471',
        tabvertbleu: '#9ccbc8',
        annuler: '#7dadaa',
      },
    },
  },
  plugins: [],
}