/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-slate': '#1e1b4b',
        'deep-violet': '#2e1065',
        'glowing-gold': '#FCD34D',
        'neon-pink': '#F472B6',
      },
      fontFamily: {
        'handwriting': ['Dancing Script', 'Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}

