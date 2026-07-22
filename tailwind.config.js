/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gov-navy': '#0F2C59',
        'gov-blue': '#1D4ED8',
        'gov-bg': '#F8FAFC',
        'gov-border': '#E2E8F0',
        'saffron-alert': '#E65F2B',
        'amber-alert': '#F1A208',
        'teal-success': '#2A9D8F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'flat': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
        'premium': '0 4px 6px -1px rgba(15, 44, 89, 0.08), 0 2px 4px -1px rgba(15, 44, 89, 0.04)',
      }
    },
  },
  plugins: [],
}
