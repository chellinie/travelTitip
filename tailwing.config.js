/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');


module.exports = {
  content: [
    "./*.{html,js}" // Scans all HTML and JS files in the root folder
  ],
  theme: {
    extend: {
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-pink': '#D9AAB7',
        'brand-bg': '#EBF0F5',
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none'  /* Firefox */
        }
      })
    })
  ],
}