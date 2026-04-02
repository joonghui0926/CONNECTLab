/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // rgba() comma-separated 방식 - 모든 브라우저에서 100% 동작
        background: ({ opacityValue }) =>
          `rgba(var(--color-background), ${opacityValue ?? 1})`,
        primary: ({ opacityValue }) =>
          `rgba(var(--color-primary), ${opacityValue ?? 1})`,
        secondary: ({ opacityValue }) =>
          `rgba(var(--color-secondary), ${opacityValue ?? 1})`,
        // fg = 다크모드 흰색 / 라이트모드 검정 (border-fg/10 등 불투명도 유틸리티용)
        fg: ({ opacityValue }) =>
          `rgba(var(--color-fg), ${opacityValue ?? 1})`,
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
