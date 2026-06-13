/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#A67C2E',
        'gold-light': '#E2C87A',
        'gold-dark': '#A07C2E',
        'bg-main': '#0A0A0A',
        'bg-card': '#111111',
        'bg-section': '#0F0F0F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
