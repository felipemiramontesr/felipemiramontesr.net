import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        // Add other pages if necessary (e.g. cv.html)
        cv: resolve(__dirname, 'cv.html'),
        v1: resolve(__dirname, 'tarjeta-felipe-v1.html'),
        v2: resolve(__dirname, 'tarjeta-felipe-v2.html'),
      },
    },
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clean dist before building
    sourcemap: false, // No sourcemaps for production
  },
  server: {
    port: 3000,
    open: true,
  },
});
