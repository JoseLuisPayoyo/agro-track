/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf4",
          100: "#d5f5e4",
          200: "#aee9cb",
          300: "#7bdab0",
          400: "#4fca99",
          500: "#2abf89",
          600: "#1e9e73",
          700: "#187c5c",
          800: "#125f48",
          900: "#0f4d3b"
        }
      }
    }
  },
  plugins: []
}
