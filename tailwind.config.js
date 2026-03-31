/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1628',
          blue: '#1E40AF',
          cyan: '#06B6D4',
        },
        surface: {
          DEFAULT: '#111827',
          card: '#1F2937',
          hover: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
