/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          slate: '#1e1b4b', // Dark Slate Blue
          violet: '#2e1065', // Deep Violet
          gold: '#FCD34D',   // Glowing Gold
          pink: '#F472B6',   // Neon Pink
        }
      },
      fontFamily: {
        handwriting: ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(252, 211, 77, 0.6)',
        'glow-pink': '0 0 15px rgba(244, 114, 182, 0.6)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
