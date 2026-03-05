import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        rio: {
          blue: '#004aad',
          gold: '#fbba00',
          light: '#f3f6f9',
        },
      },
    },
  },
  plugins: [],
};

export default config;

