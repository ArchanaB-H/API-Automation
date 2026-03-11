import { test, expect } from '../../fixtures/api-fixture'
import { DataService } from '../../services/Home/regions.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const MODULE = 'Data Regions'

test.describe.serial('Data API', () => {

  let service: DataService

  test.beforeAll(async ({ api }) => {
    service = new DataService(api)
  })

  // =============================
  // GET REGIONS
  // =============================
  test('get regions by sector', async () => {

    const res = await service.getRegions('EDU')

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