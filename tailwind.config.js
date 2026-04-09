/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          950: '#0c0a09',
        },
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
        },
      },
    },
  },
  plugins: [],
};
