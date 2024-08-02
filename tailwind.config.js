/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ["./src/**/*.{html,js,svelte,ts}", './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#9575cd',
          300: '#9575cd',
          400: '#9575cd',
          500: '#9575cd',
          600: '#b388ff',
          700: '#7c4dff',
          800: '#651fff',
          900: '#6200ea'
        }
      }
    }
  },

  plugins: [flowbitePlugin]
} ;
