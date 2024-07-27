import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blackBG: "060215",
        woodLogo: "#BC976C",
        greenT: "#7ACAB4",
        gray100: "#E6E5E5",
        freshMint:'rgb(50, 178, 166)',
        softWood: "#DECBB5",
        gray300: "#C2BDBD",
        white: "#F9F9F9",
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
        '2xs': '375px',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}