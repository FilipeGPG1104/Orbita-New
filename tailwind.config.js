/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Fonte de UI / corpo de texto
        sans: ["Inter", "sans-serif"],
        // Fonte de destaque / títulos (headlines, "P22 Mackinac")
        serif: ["P22 Mackinac W01 Book", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
