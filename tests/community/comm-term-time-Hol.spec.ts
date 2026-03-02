import { test, expect } from '../../fixtures/api-fixture'
import { CommTermTimeService } from '../../services/community/comm-term-time-Hol.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Comm Term Time'

test.describe('Community Term Time API', () => {
  let service: CommTermTimeService
  let termTimeId: string

  test.beforeAll(async ({ api }) => {
    service = new CommTermTimeService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create term time', async () => {
    const res = await service.create({
      ttName: `Holiday_API`,
      ttDesc: 'Created by Playwright',
      logoExtension: '.jpg',
      termTimeThresholds: [
        {
          threshold: 10,
          commTermTimeOnlyGrades: [
            {
              gradeName: 'g1',
              commTermTimeOnlyValues: [
                { worked: 10, paid: 10 }
              ],
              commTermTimeOnlyPtOverrideDtos: [
                { worked: 10, ptName: 'g2', paid: 10 }
              ]
            }
          ]
        }
      ]
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    termTimeId = body.result

    recordPass(MODULE)
  })

  // =============================
  // GET ALL
  // =============================
  test('get term time list', async () => {
    const res = await service.getAll()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET BY ID
  // =============================
  test('get term time by id', async () => {
    const res = await service.getById(termTimeId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET DETAILS
  // =============================
  test('get term time details', async () => {
    const res = await service.getDetails(termTimeId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UPDATE
  // =============================
  test('update term time', async () => {
    const res = await service.update(termTimeId, {
      ttId: termTimeId,
      ttName: `UPDATED_API`,
      ttDesc: 'Updated by Playwright',
      logoExtension: '.jpg'
    })

    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive term time', async () => {
    const res = await service.archive(termTimeId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive term time', async () => {
    const res = await service.unarchive(termTimeId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // CARDS
  // =============================
  test('get term time cards', async () => {
    const res = await service.getCards()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // LOGO UPLOAD
  // =============================
  test('upload term time logo', async () => {
    const logoPath = path.resolve('test-data/payscale-logo.jpg')
    const res = await service.uploadLogo(termTimeId, logoPath)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET LOGO
  // =============================
  test('get term time logo', async () => {
    const res = await service.getLogo(termTimeId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // TEMPLATE
  // =============================
  test('get term time template', async () => {
    const res = await service.getTemplate()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // EXPORT
  // =============================
  test('export term time', async () => {
    const res = await service.export(termTimeId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // DELETE
  // =============================
  test('delete term time', async () => {
    const res = await service.delete(termTimeId)
    expect(res.status()).toBe(200)
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