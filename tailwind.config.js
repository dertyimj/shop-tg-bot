/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        mainbg: "#101012",
        accent: "#00fff7",
        accent2: "#fff",
        cardbg: "#181820",
        darkglow: "#232335",
        pink: "#ee31aa",
        gold: "#ffc600",
        silver: "#cccccc",
        green: "#19ffb5",
        red: "#f15468"
      },
      fontFamily: {
        main: ["Montserrat", "Roboto", "Arial", "sans-serif"],
        display: ["Russo One", "Montserrat", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px 0 #00fff799, 0 0 80px #ee31aa33",
        'btn-accent': "0 0 16px 2px #00fff7cc",
        'card': "0 2px 40px 0 #00fff72b",
        'input': "0 0 0 2px #00fff733"
      },
      dropShadow: {
        neon: "0 0 6px #00fff7",
        pink: "0 0 8px #ee31aa"
      },
      borderRadius: {
        'xl': '1.2rem',
        '3xl': '2.4rem',
        '4xl': '3rem'
      },
      animation: {
        'glow': 'glowPulse 2.5s infinite alternate',
        'bounce-slow': 'bounce 2.2s infinite'
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 10px #00fff7bb, 0 0 40px #ee31aa33' },
          '100%': { boxShadow: '0 0 26px #00fff7, 0 0 60px #ee31aa44' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  darkMode: 'class'
};
