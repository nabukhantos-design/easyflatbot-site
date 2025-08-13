import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build path is derived from BASE_PATH env variable set in CI (GitHub Pages).
// Locally it's '/'. On project pages it's '/<repo>/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
