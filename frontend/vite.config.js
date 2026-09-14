import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split react + react-dom into their own chunk
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react/jsx-runtime')) {
              return 'vendor-react';
            }
            // Split react-icons (large icon library)
            if (id.includes('/react-icons/')) {
              return 'vendor-icons';
            }
            // Split react-router
            if (id.includes('/react-router') || id.includes('/@remix-run')) {
              return 'vendor-router';
            }
            // Everything else from node_modules goes to vendor-misc
            return 'vendor-misc';
          }
        },
      },
    },
  },
})
