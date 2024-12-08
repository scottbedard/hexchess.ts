import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
