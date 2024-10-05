import { background } from '@chakra-ui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",],
  important: "#root",
  theme: {
    extend: {
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      colors: {
        mainBgColor: '#dd4975',
        errorBgColor: '#344e41',
        successBgColor: '#c1121f',
        backgroundOne: '#292929',
        backgroundTwo: '#111',
        backgroundThree: '#1e1e1e',
        inputBorder: '#b9bcbe',
        inputBg: '#f1f5f7',
        inputActiveBorderColor: '#dd4975',
        'white-1f': '#FFFFFF1F',
        'white-0a': '#FFFFFF0A',
        'white-12': '#FFFFFF12',

      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}

