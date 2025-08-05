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
        // Permite acceso a toda la carpeta del proyecto
        path.resolve(__dirname, './'),
        // Necesario para módulos de node
        path.resolve(__dirname, './node_modules')
      ]
    }
  }
})