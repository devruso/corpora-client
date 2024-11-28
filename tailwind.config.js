/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], 
  theme: {
    extend: {
      colors: {
        primary1: '#2D5C8A',
        primary2: '#78A9FF',
        secondary: '#F9A825',
        background: '#F5F5F5',
        text: '#212121',
        muted: '#757575',
        danger: '#D32F2F',
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

