/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#FB00C7",
        secondary: "#744BCE",
      },
      aspectRatio: {
        "10/5": "10 / 5",
      },
    },
  },
  plugins: [],
};
