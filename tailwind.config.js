/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        light: '0px 16px 40px -2px rgba(20, 38, 86, 0.16)',
      },
      fontFamily: {
        rubik:  ['Rubik', "sans-serif"],
      },
      fontSize: {
        sm: ['14px'],
        base: ['16px'],
        lg: ['24px'],
        xl: ['32px'],
      },
      fontWeight: {
        light: "400",
        medium: "500",
        hard: "600",
      },
      colors: {
        primary: {
          "00": "#E6E9F0",
          "20": "#98A5C4",
          "40": "#53699C",
          "60": "#1961E4",
          "90": "#2E4885",
        },
        secondary: {
          "00": "#FFF8E1",
          "20": "#FFE083",
          "30": "#FFC123",
          "40": "#FFCA2A",
          "60": "#FFB306",
          "90": "#FE6F04",
        },
        white: {
          "00": "#FFFFFF",
          "10": "#FAFAFA",
          "20": "#F5F5F5",
          "30": "#F0F0F0",
          "60": "#F6F7F9",
          "70": "#E6E9F0"
        },
        black: {
          "00": "#C2C2C2",
          "10": "#979797",
          "20": "#818181",
          "30": "#606060",
          "40": "#3C3C3C",
          "60": "#000000"
        },
        green: {
          "00": "#E6F5EB",
          "20": "#9AD6AE",
          "40": "#4FBA77",
          "60": "#1F9F55",
          "90": "#005D2B"
        },
        red: {
          "00": "#CB2D3E",
          "20": "#EC9C9D",
          "40": "#EB5757",
          "60": "#E13F3D",
          "90": "#B32425"
        },
        blue: {
          "00": "#2F80ED"
        }
      },
    },
  },
  plugins: [],
}