/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4BC0BB",
          light: "#8FE8E4",
          dark: "#39A692",
        },
        secondary: {
          DEFAULT: "#1D4C82",
          light: "#396CA7",
          dark: "#0E3A6B",
        },
        success: {
          DEFAULT: "#19CC95",
          light: "#2DDFA8",
          dark: "#11AF7F",
        },
        alert: {
          DEFAULT: "#E43030",
        },
        gray: {
          50: "#f2f2f2",
          100: "#e4e4e4",
          200: "#bfbfbf",
          300: "#8c8c8c",
          400: "#8f8f8f",
          500: "#737373",
          600: "#595959",
          700: "#404040",
          800: "#262626",
          900: "#0d0d0d",
        },
      },
      fontFamily: {
        sans: ["Kanit", "ChulaCharasNew", "sans-serif"],
      },
    },
  },
  plugins: [],
};
