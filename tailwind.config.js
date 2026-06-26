export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: ({ opacityValue }) =>
          `rgba(var(--color-background), ${opacityValue ?? 1})`,
        primary: ({ opacityValue }) =>
          `rgba(var(--color-primary), ${opacityValue ?? 1})`,
        secondary: ({ opacityValue }) =>
          `rgba(var(--color-secondary), ${opacityValue ?? 1})`,
        fg: ({ opacityValue }) =>
          `rgba(var(--color-fg), ${opacityValue ?? 1})`,
        accent: '#fccd4d',
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
