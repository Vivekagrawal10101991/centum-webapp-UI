/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- YOUR BRAND PALETTE ---
        // Replace these HEX codes with your specific ones if needed
        primary: {
          DEFAULT: '#0056D2', // Main Brand Color (Samsung Blue)
          50: '#EAF4FF',      // Very Light Blue (Backgrounds)
          100: '#D5E6FF',     // Light Blue
          500: '#3B82F6',     // Bright Blue
          600: '#0056D2',     // Brand Standard
          700: '#0041A3',     // Darker Blue (Hover states)
          900: '#002B6B',     // Deepest Blue (Text/Footer)
        },
        secondary: {
          DEFAULT: '#64748B', // Slate Gray (Subtitles)
          50: '#F8FAFC',      // Off White
          900: '#0F172A',     // Dark Text
        },
        accent: {
          DEFAULT: '#00C4CC', // Teal/Cyan Accent
          purple: '#8B5CF6',
          rose: '#F43F5E',
          orange: '#F97316',
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}