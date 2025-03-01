/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{vue,js}', // Include pages folder
    './components/**/*.{vue,js}', // If you have a components folder
    './layouts/**/*.vue', // If you have layouts
    './plugins/**/*.{js,ts}', // If you have plugins
    './nuxt.config.{js,ts}' // Nuxt config
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
