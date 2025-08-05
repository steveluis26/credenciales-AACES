import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    fs: {
      allow: [
        // Ruta completa a tu proyecto
        path.resolve(__dirname, './'),
        // Para módulos necesarios
        path.resolve(__dirname, './node_modules')
      ]
    }
  }
})