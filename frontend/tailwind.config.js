/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: "#53d22d",
      "primary-hover": "#46b026",
      "background-dark": "#0f1115",
      "surface-dark": "#181b21",
      background: "#152012",
      surface: "#1e2b1a",
    },
    fontFamily: {
      display: ["Manrope", "sans-serif"],
    },
    boxShadow: {
      neon: "0 0 15px rgba(83,210,45,.4)",
    },
  },
};
export const plugins = [];
