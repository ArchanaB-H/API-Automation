import { test, expect } from '../../fixtures/api-fixture'
import { PublicHolidaysService } from '../../services/sector/sector-public-holidays.service'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Public Holidays'

test.describe('Sector - Public Holidays', () => {
  let service: PublicHolidaysService
  let holidayId: string

  const REGION = 'ENG'

  test.beforeAll(async ({ api }) => {
    service = new PublicHolidaysService(api)
  })

  // =====================================================
  // ⭐ CREATE
  // =====================================================
  test('create public holiday', async () => {
    const now = new Date().toISOString()

    const res = await service.createHoliday({
      regionId: REGION,
      hDate: '2026-12-30',
      description: `API_HOLIDAY`,
      creBy: 0,
      creDate: now,
      amdBy: 0,
      amdDate: now
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    holidayId = body.result

    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ GET LIST
  // =====================================================
  test('get public holidays by region', async () => {
    const res = await service.getHolidays(REGION)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ GET BY ID
  // =====================================================
  test('get public holiday by id', async () => {
    const res = await service.getHolidayById(holidayId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ UPDATE
  // =====================================================
  test('update public holiday', async () => {
    const now = new Date().toISOString()

    const res = await service.updateHoliday(holidayId, {
      id: holidayId,
      regionId: REGION,
      hDate: '2026-12-30',
      description: `API_UPDATED_${Date.now()}`,
      creBy: 0,
      creDate: now,
      amdBy: 0,
      amdDate: now
    })

    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ DELETE
  // =====================================================
  test('delete public holiday', async () => {
    const res = await service.deleteHoliday(holidayId)
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