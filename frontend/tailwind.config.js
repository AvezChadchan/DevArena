/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/context/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
  },
  plugins: [],
};

export default config;
