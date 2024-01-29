/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFC70F',
      },
      screens: {
        'sm': '640px',  // Small screens
        'md': '768px',  // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra large screens
      }
    },
  },
  plugins: [],
}

