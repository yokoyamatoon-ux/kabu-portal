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
          DEFAULT: '#FF6B6B',
          light: '#FFF0F0',
          dark: '#E85555',
        },
        secondary: {
          DEFAULT: '#FFE66D',
          light: '#FFF8E0',
          dark: '#E8A000',
        },
        success: '#00B894',
        danger: '#FF7675',
        background: '#FFF9F0',
        card: '#FFFFFF',
        text: '#2D3436',
        muted: '#636E72',
      },
      fontFamily: {
        rounded: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
      borderRadius: {
        'manga': '24px',
        'bubble': '16px',
      },
      boxShadow: {
        'manga': '0 8px 20px rgba(0,0,0,0.05)',
        'manga-hover': '0 16px 32px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
