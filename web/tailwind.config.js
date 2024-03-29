/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.liquid', './src/**/*.njk', './src/**/*.md'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        darkBlue: '#233760',
        red: '#9d132e',
      },
    },
  },
  variants: {
    backgroundColor: ['even', 'odd'],
  },
  plugins: [require('@tailwindcss/typography')],
};
