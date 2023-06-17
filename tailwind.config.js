/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        lato: ["var(--font-lato)"],
      },
      colors: {
        hyperlink: "#346BD4",
        primary: "#fff",
        secondary: "#000",
      },
      dropShadow: {
        "button-overlay": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
