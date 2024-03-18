import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        eigengrau: 'rgba(22 22 29)',
        eigengrauLight: 'rgba(43 43 53)',
      },
    },
  },
  plugins: [],
} satisfies Config;
