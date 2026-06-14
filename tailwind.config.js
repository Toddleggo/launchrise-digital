/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#503C00',
        'gold-light': '#6B5000',
        'gold-dark': '#3A2B00',
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
