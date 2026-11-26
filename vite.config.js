import { fileURLToPath, URL } from 'node:url'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replaceAll('\\', '/')
          if (path.includes('/node_modules/')) {
            if (
              path.includes('/node_modules/react/') ||
              path.includes('/node_modules/react-dom/') ||
              path.includes('/node_modules/scheduler/')
            ) {
              return 'react'
            }
            if (path.includes('/node_modules/motion/')) {
              return 'motion'
            }
            if (path.includes('/node_modules/lenis/')) {
              return 'lenis'
            }
          }
        },
      },
    },
  },
})
