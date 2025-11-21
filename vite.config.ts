import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/EarVibes/',
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {}],
        ],
      },
    }),
  ],
});