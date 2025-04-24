/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.85)',
        oceanStart: '#98d6ea',
        oceanEnd: '#bdeeff',
        textMain: '#2a2a2a',
        correct: '#b4e1c5',
        wrong: '#f4c6c6',
        skip: '#d9d9d9',
        cardBg: 'rgba(255,255,255,0.85)',
        buttonBg: '#98d6ea',
        buttonHover: '#bdeeff',
        buttonActive: '#7dcbe6',
        shadow: 'rgba(44,62,80,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'San Francisco', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '20px',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        soft: '0 2px 16px 0 rgba(44,62,80,0.08)',
      },
      keyframes: {
        ripple: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        ripple: 'ripple 18s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
};
