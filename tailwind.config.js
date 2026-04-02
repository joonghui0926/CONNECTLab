/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111111',
        primary: '#ffffff',
        secondary: '#e5e7eb',
        accent: '#fccd4d', // 3D 애니메이션의 골드 포인트 컬러
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}