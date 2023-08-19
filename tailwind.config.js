/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1020px',
        xl: '1440px',
      },
      extend: {
        colors: {
          softOrange: '#E8A87C',
          darkOrange: '#E27D60',
          lightTeal: '#85DCB0',
          darkTeal: '#41B3A3',
          brickRed: '#C38D9E',
          veryDarkBlue: 'hsl(229, 31%, 21%)',
        },
        fontFamily: {
          sans: ['Rubik', 'sans-serif'],
        },
        backgroundImage: () => ({
          dots: "url('../images/bg-dots.svg')",
        }),
      },
    },
    plugins: [],
  }
  