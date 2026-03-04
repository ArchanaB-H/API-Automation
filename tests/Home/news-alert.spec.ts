import { test, expect } from '../../fixtures/api-fixture'
import { NewsAlertService } from '../../services/Home/news-alert.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const MODULE = 'News Alert'

test.describe.serial('News Alert API', () => {

  let service: NewsAlertService
  let newsNo: number

  const cleanup = new CleanupHelper()

  test.beforeAll(async ({ api }) => {
    service = new NewsAlertService(api)
  })

  // GET ALL
  test('get news alerts', async () => {
    const res = await service.getAll()
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // CREATE
  test('create news alert', async () => {

    const body = {
      nType: "2",
      nTitle: `NewsAlert_API_${Date.now()}`,
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

    // cleanup registration
    cleanup.add(async () => {
      await service.delete(newsNo)
    })

    recordPass(MODULE)
  })

  // GET BY ID
  test('get news alert by id', async () => {

    const res = await service.getById(newsNo)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // UPDATE
  test('update news alert', async () => {

    const body = {
      newsNo: newsNo,
      nType: "2",
      nTitle: `NewsAlert_API_UPDATED`,
      nShowAs: 1,
      nUrl: "",
      nPopupText: "<p>Hello</p>",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000).toISOString(),
      hide: false
    }

    const res = await service.update(body)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // ARCHIVE
  test('archive news alert', async () => {

    const res = await service.archive(newsNo)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // UNARCHIVE
  test('unarchive news alert', async () => {

    const res = await service.unarchive(newsNo)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // DELETE (validation)
  test('delete news alert', async () => {

    const res = await service.delete(newsNo)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // FAILURE TRACKING
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }
  })

  // CLEANUP
  test.afterAll(async () => {
    await cleanup.runAll(MODULE)
    printModuleSummary(MODULE)
  })

})