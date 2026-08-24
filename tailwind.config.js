/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Auth.Client/**/*.{js,ts,jsx,tsx}",
    "./portfolio.client/**/*.{js,ts,jsx,tsx}",
    "./Shared/UI/components/**/*.{js,ts,jsx,tsx}",
    "./Shared/UI/router/**/*.{js,ts,jsx,tsx}",
    "./Shared/UI/axios/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
