module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mainbg: "#111113",
        cardbg: "#18181c",
        accent: "#00fff7",
        accent2: "#fff",
        btnbg: "#191921",
        pink: "#ff45e4",
        vibebg: "#141419",
        darkglow: "#24242c",
      },
      boxShadow: {
        'glow': '0 0 20px #00fff7cc, 0 0 40px #fff5',
        'btn': '0 0 18px #00fff799, 0 0 30px #fff6',
      }
    }
  },
  plugins: [],
}

