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
      colors: {
        // lightGreen: '#4cc1c0',
        lightGreen: '#1dadc3',
        lightRed: '#fe6483',
        lightGray: '#f7f6f9'
      }
    },
  },
  plugins: [],
}