/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        veryDarkBlue: "#1B1E28",
        darkerBlue: "#2F3542",
        darkBlue: "#6A7589",
        primaryBlue: "#DDFFFF",
        secondaryBlue: "#b6d9de",
        lightBlue: "#C5E9FF",
        primaryPurple: "#E4C7FF",
        secondaryPurple: "#be99e0",
        primaryGreen: "#abe0b9",
        secondaryGreen: "#8fba9b",
        primaryRed: "#BF616A",
        secondaryRed: "#a64750",
      },
    },
  },
  plugins: [],
};
