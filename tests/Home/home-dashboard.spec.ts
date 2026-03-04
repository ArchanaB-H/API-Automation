import { test, expect } from '../../fixtures/api-fixture'
import { HomeDashboardService } from '../../services/Home/home-dashboard.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const MODULE = 'Home Dashboard'

test.describe.serial('Home Dashboard API', () => {

  let service: HomeDashboardService
  const employerId = '6b7fedc5-ccf3-4e49-bba5-916325e44e97'

  test.beforeAll(async ({ api }) => {
    service = new HomeDashboardService(api)
  })

  // =============================
  // GET DASHBOARD DETAILS
  // =============================
  test('get dashboard details', async () => {

    const res = await service.getDashboardDetails(employerId)

    expect(res.status()).toBe(200)

    const body = await res.json()

    expect(body.isSuccess).toBe(true)

    recordPass(MODULE)
    console.log('✅ get dashboard details — passed')
  })

  // =============================
  // GET DASHBOARD LOGOS
  // =============================
  test('get dashboard logos', async () => {

    const res = await service.getDashboardLogos(employerId)

    expect(res.status()).toBe(200)

    const body = await res.json()

    expect(body.isSuccess).toBe(true)

    recordPass(MODULE)
    console.log('✅ get dashboard logos — passed')
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