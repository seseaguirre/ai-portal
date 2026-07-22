import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // MUI ships as one large dependency; the single bundle is expected for a
    // prototype. Lift the advisory so a clean build reports no warnings.
    chunkSizeWarningLimit: 900,
  },
})
