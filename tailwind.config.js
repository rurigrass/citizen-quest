/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      nice: {
        blue: "#00AEDE",
        purple: "#6E559A",
        pink: "#F77F98",
        orange: "#FFAF39",
        green: "#2EFFAB",
        yellow: "#FCFD43",
        red: "#C6001E",
      },
    },
    extend: {},
  },
  plugins: [],
};
