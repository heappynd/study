import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [vue()],
  build: {
    // outDir: 'dist',
    assetsInlineLimit: 0,
    // target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  // publicDir: 'public',
  // base: '/my/public/path/',
  // envPrefix: 'VITE_',
  define: {
    'import.meta.env.CUSTOM_ENV_VARIABLE': JSON.stringify('custom'),
  },
})
