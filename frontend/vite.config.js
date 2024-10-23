import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//exporte la configuration de Vite
export default defineConfig({
  plugins: [react()], //utilise le plugin react pour vite ce qui permet d'intégrer react dans le projet
  server: {
    port: 9000,
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/_variable.scss";` //import automatique des variables dans tous les fichiers
      }
    }
  }
})