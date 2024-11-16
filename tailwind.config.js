/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        3.75: "15px", // Adding 15px spacing
      },
    },
  },
  plugins: [],
};
