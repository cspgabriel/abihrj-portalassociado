import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // TODO(abih-rj): validar valores exatos contra brandbook oficial da ABIH-RJ
        abihrj: {
          blue: '#003B7A',
          gold: '#C9A227',
          light: '#f3f6f9',
        },
        // Alias retrocompatível durante a migração — remover quando todos os usos de `rio.*` forem trocados
        rio: {
          blue: '#003B7A',
          gold: '#C9A227',
          light: '#f3f6f9',
        },
      },
    },
  },
  plugins: [],
};

export default config;
