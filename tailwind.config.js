/** @type {import('tailwindcss').Config} */

const colors = {
  myColors: {
    yellow: '#FDC500',
    mainBlueBg: '#003F88',
    blackMainBanner: '#1C1C1C',
    postBlack: '#252525',
    authorsItem: '#004BA2',
  },
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { colors: colors },
    gridTemplateColumns: {
      avatar: 'max-content 1fr',
    },
    fontFamily: {
      body: ['Schibsted-bold'],
      h1: ['Syne'],
    },
  },
  plugins: [],
};
