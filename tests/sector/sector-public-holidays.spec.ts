import { test, expect } from '../../fixtures/api-fixture'
import { PublicHolidaysService } from '../../services/sector/sector-public-holidays.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Public Holidays'
const cleanup = new CleanupHelper()

test.describe.serial('Sector - Public Holidays', () => {

  let service: PublicHolidaysService
  let holidayId: string
  let holidayName: string
  let deleted = false

  const REGION = 'ENG'

  test.beforeAll(async ({ api }) => {
    service = new PublicHolidaysService(api)
  })

  // =====================================================
  // CREATE
  // =====================================================
  test('create public holiday', async () => {

    const now = new Date().toISOString()

    holidayName = `API_HOLIDAY_${Date.now()}`

    const res = await service.createHoliday({
      regionId: REGION,
      hDate: '2026-12-30',
      description: holidayName,
      creBy: 0,
      creDate: now,
      amdBy: 0,
      amdDate: now
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    holidayId = body.result

    // fallback cleanup
    cleanup.add(async () => {
      if (!holidayId || deleted) return
      await service.deleteHoliday(holidayId)
    })

    recordPass(MODULE)

  })

  // =====================================================
  // GET LIST
  // =====================================================
  test('get public holidays by region', async () => {

    const res = await service.getHolidays(REGION)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =====================================================
  // GET BY ID
  // =====================================================
  test('get public holiday by id', async () => {

    const res = await service.getHolidayById(holidayId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =====================================================
  // UPDATE
  // =====================================================
  test('update public holiday', async () => {

    const now = new Date().toISOString()

    const updatedName = `${holidayName}_UPDATED`

    const res = await service.updateHoliday(holidayId, {
      id: holidayId,
      regionId: REGION,
      hDate: '2026-12-30',
      description: updatedName,
      creBy: 0,
      creDate: now,
      amdBy: 0,
      amdDate: now
    })

    expect(res.status()).toBe(200)

    holidayName = updatedName

    recordPass(MODULE)

  })

  // =====================================================
  // DELETE (Primary)
  // =====================================================
  test('delete public holiday', async () => {

    const res = await service.deleteHoliday(holidayId)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)

  })

  // =====================================================
  // FAILURE TRACKING
  // =====================================================
  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }

  })

  // =====================================================
  // CLEANUP (Fallback)
  // =====================================================
  test.afterAll(async () => {

    printModuleSummary(MODULE)

    await cleanup.runAll(MODULE)

  })

})