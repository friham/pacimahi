import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react/jsx-runtime')) {
              return 'vendor-react';
            }
            if (id.includes('/react-icons/')) {
              return 'vendor-icons';
            }
            if (id.includes('/react-router') || id.includes('/@remix-run')) {
              return 'vendor-router';
            }
            return 'vendor-misc';
          }
        },
      },
    },
  },
})
