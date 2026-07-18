/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0B1830",
          900: "#0F2036",
          800: "#12233D",
          700: "#1B324F",
        },
        brass: {
          400: "#C9A66B",
          500: "#B8925A",
          600: "#9C7A47",
        },
        ivory: "#F7F5F0",
        stone: "#8C9A8E",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Work Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
