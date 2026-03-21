import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/luxe-media-card.ts',
      formats: ['es'],
      fileName: () => 'luxe-media-card.js'
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    target: 'es2022'
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts']
  }
});
