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
        'sm': '360px',  // Small screens
        'md': '392px',  // Medium screens
        'lg': '400px', // Large screens
        'xl': '450px', // Extra large screens
      }
    },
  },
  plugins: [],
}

