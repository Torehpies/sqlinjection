/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'google': ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
        'sans': ['Google Sans', 'Inter', 'system-ui', 'sans-serif'], // Override default sans
      },
    },
  },
  plugins: [],
}