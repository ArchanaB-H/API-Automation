import { defineConfig } from '@playwright/test'

export default defineConfig({
  workers: 1,
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts'
})