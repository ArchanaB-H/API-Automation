import { test, expect } from '../../fixtures/api-fixture'
import { ReleaseNotesService } from '../../services/Home/release-notes.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const MODULE = 'Release Notes'

test.describe.serial('Release Notes API', () => {

  let service: ReleaseNotesService

  test.beforeAll(async ({ api }) => {
    service = new ReleaseNotesService(api)
  })

  // =============================
  // GET RELEASE NOTES
  // =============================
  test('get release notes', async () => {

    const res = await service.getAll()

    expect(res.status()).toBe(200)

    const body = await res.json()

    expect(body.isSuccess).toBe(true)
    expect(Array.isArray(body.result)).toBeTruthy()

    recordPass(MODULE)
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