/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      'blue': '#003057',
      'gold': '#C69214',
      'accent-blue': '#327DA9',
      'accent-green': '#42892E',
      'accent-orange': '#E66E24',
      'accent-yellow': '#F6BE00',
      'accent-red': '#840028',
      'accent-purple': '#7C235E',
      'gray-light': '#E0E0E0',
      'gray': '#63666A',
      'gray-dark': '#404048',
      'accent-teal': '#49B1B3',
      'sel-peach': '#F79843',
      'pd-purple': '#6A5ACD',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}