import { test, expect } from '../../fixtures/api-fixture'
import { UsersService } from '../../services/Home/users.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const MODULE = 'Users'

test.describe.serial('Users API', () => {
  let service: UsersService

  test.beforeAll(async ({ api }) => {
    service = new UsersService(api)
  })

  // =============================
  // GET ALL USERS
  // =============================
  test('get all users', async () => {
    const res = await service.getAllUsers()

    expect(res.status()).toBe(200)

    const body = await res.json()

    expect(body.isSuccess).toBe(true)
    expect(Array.isArray(body.result)).toBeTruthy()

    recordPass(MODULE)
    console.log('✅ get all users — passed')
  })

  // =============================
  // FAILURE TRACKING
  // =============================
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
      console.log(`❌ ${testInfo.title} — failed`)
    }
  })

  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})