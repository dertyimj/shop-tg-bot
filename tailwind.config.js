/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mainbg: "#222034",
        cardbg: "#292744",
        accent: "#8f7cff",      // красивый фиолетовый вайб
        accent2: "#00ffe7",     // бирюзовый для кнопок
        btnbg: "#3e3266",
        pink: "#ff6dc2",
        vibebg: "#232850",
        green: "#12c988",
      },
      fontFamily: {
        inter: ["Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        'card': '0 4px 20px 0 rgba(80,60,180,0.15)',
      }
    }
  },
  plugins: [],
};
