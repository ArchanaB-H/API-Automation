import { test, expect } from '../../fixtures/api-fixture'
import { NewsAlertService } from '../../services/Home/news-alert.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const MODULE = 'News Alert'
const cleanup = new CleanupHelper()

test.describe.serial('News Alert API', () => {

  let service: NewsAlertService
  let newsNo: number
  let newsTitle: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new NewsAlertService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create news alert', async () => {

    newsTitle = `NewsAlert_API_${Date.now()}`

    const body = {
      nType: "2",
      nTitle: newsTitle,
      nShowAs: 1,
      nUrl: "",
      nPopupText: "<p>Hello</p>",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000).toISOString(),
      hide: true
    }

    const res = await service.create(body)

    expect(res.status()).toBe(200)

    const json = await res.json()
    newsNo = json.result

    // fallback cleanup
    cleanup.add(async () => {
      if (!newsNo || deleted) return
      await service.delete(newsNo)
    })

    recordPass(MODULE)

  })

  // =============================
  // GET ALL
  // =============================
  test('get news alerts', async () => {

    const res = await service.getAll()

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // GET BY ID
  // =============================
  test('get news alert by id', async () => {

    const res = await service.getById(newsNo)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // UPDATE
  // =============================
  test('update news alert', async () => {

    const updatedTitle = `${newsTitle}_UPDATED`

    const body = {
      newsNo: newsNo,
      nType: "2",
      nTitle: updatedTitle,
      nShowAs: 1,
      nUrl: "",
      nPopupText: "<p>Hello</p>",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000).toISOString(),
      hide: false
    }

    const res = await service.update(body)

    expect(res.status()).toBe(200)

    newsTitle = updatedTitle

    recordPass(MODULE)

  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive news alert', async () => {

    const res = await service.archive(newsNo)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive news alert', async () => {

    const res = await service.unarchive(newsNo)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // DELETE 
  // =============================
  test('delete news alert', async () => {

    const res = await service.delete(newsNo)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)

  })

  // =============================
  // FAILURE TRACKING
  // =============================
  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {

      recordFail(MODULE)

    }

  })

  // =============================
  // CLEANUP (Fallback)
  // =============================
  test.afterAll(async () => {

    await cleanup.runAll(MODULE)

    printModuleSummary(MODULE)

  })

})