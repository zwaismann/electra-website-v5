import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Main entry point
        lorenzo: resolve(__dirname, 'pages/lorenzo-deguia.html'), // Additional entry point
      },
    },
  },
})
