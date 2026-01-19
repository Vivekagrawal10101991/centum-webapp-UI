/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a73e8',
          50: '#e8f2fe',
          100: '#d1e5fd',
          200: '#a3cbfb',
          300: '#75b1f9',
          400: '#4797f7',
          500: '#1a73e8',
          600: '#155cba',
          700: '#10458b',
          800: '#0a2e5d',
          900: '#05172e',
        },
      },
    },
  },
  plugins: [],
}
