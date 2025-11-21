import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: mode === 'production' ? '/EarVibes/' : '/',
    plugins: [
      react({
      }),
    ],
  };
});