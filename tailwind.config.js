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
        pink: "#ee31aa"
      },
      boxShadow: {
        glow: "0 0 24px #00fff799, 0 0 80px #ee31aa33"
      }
    }
  },
  plugins: []
}

