import { test, expect } from '../../fixtures/api-fixture'
import { PensionService } from '../../services/sector/sector-pensions.service'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Pension'

test.describe('Pension API', () => {
  let service: PensionService
  let rtId: string
  let pfId: string
  let acId: string

  test.beforeAll(async ({ api }) => {
    service = new PensionService(api)
  })

  // =====================================================
  // ⭐ RATE TABLE FLOW
  // =====================================================

  test('create rate table', async () => {
    const res = await service.createRateTable({
      rtName: `API_RT_${Date.now()}`,
      isPercentage: true,
      creDate: new Date().toISOString(),
      pensionRateTableDates: [
        {
          effectiveDate: '2026-02-01',
          creDate: new Date().toISOString(),
          pensionRateBands: [
            { earnMin: 1, earnMax: 100, value: 10 }
          ]
        }
      ]
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    rtId = body.result

    recordPass(MODULE)
  })

  test('get rate tables', async () => {
    const res = await service.getRateTables()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  test('get rate table by id', async () => {
    const res = await service.getRateTableById(rtId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ PENSION FUND FLOW
  // =====================================================

  test('create pension fund', async () => {
    const res = await service.createFund({
      fundName: `API_PF_${Date.now()}`,
      fundType: 1,
      hide: true,
      schemeType: 1,
      isQualifying: true,
      contractualEnroll: true,
      allow5050: true,
      portalSite: 'https://eg.com',
      pensionAdministrator: 'admin',
      portalUsername: 'user',
      portalPwd: 'pwd',
      bankAccName: 'acc',
      bankAccNo: '12345678',
      sortCode: '123456',
      pdMethod: 1,
      pdValue: 1,
      bdMethod: 1,
      bdValue: 1,
      mdMethod: 1,
      mdValue: 1,
      annualDeadline: '2026-02-27',
      contactEmail: 'api@test.com',
      contactNo: '9999999999',
      rateTable: '',
      rtId: rtId,
      pensionFundGuidances: []
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    pfId = body.result

    recordPass(MODULE)
  })

  test('get pension fund by id', async () => {
    const res = await service.getFundById(pfId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ ADDITIONAL CONTRIBUTION FLOW
  // =====================================================

  test('create additional contribution', async () => {
    const res =
      await service.createAdditionalContribution({
        acName: `API_AC_${Date.now()}`,
        thirdPartyReq: true,
        creDate: new Date().toISOString()
      })

    expect(res.status()).toBe(200)

    const body = await res.json()
    acId = body.result

    recordPass(MODULE)
  })

  test('get additional contribution by id', async () => {
    const res =
      await service.getAdditionalContributionById(acId)

    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ CLEANUP
  // =====================================================

  test('delete additional contribution', async () => {
    const res =
      await service.deleteAdditionalContribution(acId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  test('delete pension fund', async () => {
    const res = await service.deleteFund(pfId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  test('delete rate table', async () => {
    const res = await service.deleteRateTable(rtId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ TRACKING
  // =====================================================

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }
  })

  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})