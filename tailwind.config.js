/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F618D",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        laptop: "1024px",
        laptop2: "1350px",
        laptop3: "1260px",
        desktop: "1420px",
      },
    },
  },
  plugins: [],
};
