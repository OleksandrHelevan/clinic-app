import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  define: {
    global: 'window',
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
