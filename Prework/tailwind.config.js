/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Uses system UI by default; swap to your preferred font via CSS if desired
        sans: [
          'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol'
        ],
      },
    },
  },
  plugins: [],
}