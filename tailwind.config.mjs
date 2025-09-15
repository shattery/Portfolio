/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        background: 'var(--color-background)',
        cardBackground: 'var(--color-card-background)',
        textColor: 'var(--color-text)',
        headingColor: 'var(--color-heading)',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px var(--color-shadow-rgb) / 0.1, 0 2px 4px -2px var(--color-shadow-rgb) / 0.1',
        'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', /* Standard black shadow */
        'dark-glow': '0 4px 10px -1px var(--color-shadow-rgb) / 0.4, 0 2px 6px -2px var(--color-shadow-rgb) / 0.4, 0 0 25px var(--color-shadow-rgb) / 0.5',
      }
    },
  },
  plugins: [],
} 