import { test, expect } from '../../fixtures/api-fixture'
import { EventsCategoriesService } from '../../services/sector/sector-event-categories.service'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Events Categories'

// 🔹 from your swagger example
const CATEGORY_ID = 'a05583f8-5fb0-45ea-8753-ad2bed8d1a97'
const EVENT_ID = 'b4c4e86a-1081-4e72-89da-e1a22d457f2a'

test.describe('Sector - Events Categories', () => {
  let service: EventsCategoriesService

  test.beforeAll(async ({ api }) => {
    service = new EventsCategoriesService(api)
  })

  // =====================================================
  // ⭐ GET ALL CATEGORIES
  // =====================================================
  test('get event categories', async () => {
    const res = await service.getCategories()

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.isSuccess).toBeTruthy()
    expect(Array.isArray(body.result)).toBeTruthy()

    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ GET EVENTS BY CATEGORY
  // =====================================================
  test('get events by category', async () => {
    const res = await service.getEventsByCategory(CATEGORY_ID)

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.isSuccess).toBeTruthy()
    expect(Array.isArray(body.result)).toBeTruthy()

    recordPass(MODULE)
  })

  // =====================================================
  // ⭐ GET EVENT BY ID (YOUR API)
  // =====================================================
  test('get event by id', async () => {
    const res = await service.getEventById(
      CATEGORY_ID,
      EVENT_ID
    )

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.result.evtId).toBe(EVENT_ID)

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