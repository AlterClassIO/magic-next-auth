module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        appear: 'appear 300ms ease-out 150ms both',
        zoomIn: 'appear 300ms ease-out 150ms both',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
