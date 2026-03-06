import { test, expect } from '../../fixtures/api-fixture'
import { ScreensService } from '../../services/sector/sector-help.service'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Sector Help'
const SECTOR_ID = 'EDU'
const SCREEN_ID = '13594498-8d30-4b16-8e7a-eaefb71f7248'
const SCREEN_NO = 5

test.describe('Sector - Screens', () => {
  let service: ScreensService

  test.beforeAll(async ({ api }) => {
    service = new ScreensService(api)
  })

  // =====================================================
  //  GET ALL
  // =====================================================
  test('get screens by sector', async () => {
    const res = await service.getScreens(SECTOR_ID)

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.isSuccess).toBeTruthy()
    expect(Array.isArray(body.result)).toBeTruthy()

    recordPass(MODULE)
  })

  // =====================================================
  //  GET BY ID
  // =====================================================
  test('get screen by id', async () => {
    const res = await service.getScreenById(SCREEN_ID)

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.result.scrId).toBe(SCREEN_ID)

    recordPass(MODULE)
  })

  // =====================================================
  //  GET HELP TEXT
  // =====================================================
  test('get screen help text', async () => {
    const res = await service.getScreenHelp(SCREEN_NO)

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.result.scrNo).toBe(SCREEN_NO)

    recordPass(MODULE)
  })

  // =====================================================
  //  TRACKING
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