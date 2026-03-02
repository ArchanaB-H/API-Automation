import { test as base, request as playwrightRequest } from '@playwright/test'
import { getToken } from '../utils/auth'
import { ApiClient } from '../utils/api-client'

// 👇 IMPORTANT — split worker fixtures
type WorkerFixtures = {
  api: ApiClient
}

export const test = base.extend<{}, WorkerFixtures>({
  api: [
    async ({}, use) => {
      const reqContext = await playwrightRequest.newContext()

      const token = await getToken()
      const client = new ApiClient(reqContext, token)

      await use(client)

      await reqContext.dispose()
    },
    { scope: 'worker' }
  ]
})

export { expect } from '@playwright/test'