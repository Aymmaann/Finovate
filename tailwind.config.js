/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-button-gradient': 'linear-gradient(to right, #1dc8fd, #0890ff)',
      },
    },
  },
  plugins: [],
}