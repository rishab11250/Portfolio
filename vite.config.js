import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js / R3F is the largest vendor (~900 kB)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Framer Motion is ~130 kB
          'vendor-animation': ['framer-motion'],
        },
      },
    },
    // Warn at 300 kB for individual chunks (500 kB default)
    chunkSizeWarningLimit: 400,
  },
})
