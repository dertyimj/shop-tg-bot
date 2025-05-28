/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#111217",
        light: "#fff",
        grayish: "#232429",
        accent: "#ffffff",
        neon: "#00ffe7",
        warning: "#ffae00",
        error: "#ff3b6b",
      },
      boxShadow: {
        glow: "0 0 18px 3px #00ffe777",
        bigglow: "0 0 40px 8px #00ffe788",
        neon: "0 0 8px #00ffe7, 0 0 32px #00ffe7aa",
      },
      fontFamily: {
        inter: ["Inter", "Arial", "sans-serif"]
      },
    },
  },
  plugins: [],
};
