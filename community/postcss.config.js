export default {

  plugins: {
    tailwindcss: {  content: [
    "./index.html",
    "./src/App.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],},
    autoprefixer: {},
  },
}
