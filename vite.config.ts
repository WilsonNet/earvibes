import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const _env = loadEnv(mode, process.cwd(), '');
  return {
    base: mode === 'production' ? '/earvibes/' : '/',
    plugins: [react(), tailwindcss()] as PluginOption[],
  };
});
