import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./env",
  plugins: [react()],
  server: {
    "proxy": {
      "/api": {
        target: "http://localhost:5000"
      },
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
        "./tests/setup.js",
    ],
    include: [
      './src/*/*/*.test.{jsx,js}',
      './src/*/*/*/*.test.{jsx,js}'
    ]
  }
})
