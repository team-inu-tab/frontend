import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@screens": path.resolve(__dirname, './src/screens'),
      "@components": path.resolve(__dirname, './src/components'),
      "@css": path.resolve(__dirname, './src/screens/css'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@utils": path.resolve(__dirname, './src/utils')
    },
  },
});
