import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist']
  },
  css: {
    modules: {
      // Same scoping logic as vite.config.ts — keeps test behavior
      // aligned with production build output, so a class-name collision
      // bug can't hide in tests while still existing in the real build.
      generateScopedName: (name, filename) => {
        const relative = filename.split('/src/')[1]?.replace('.module.css', '').replace(/\//g, '_') ?? 'unknown'
        return `flex-${relative}_${name}`
      }
    }
  }
})
