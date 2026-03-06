import { test, expect } from '../../fixtures/api-fixture'
import { CommPayscalesService } from '../../services/community/comm-payscales.service'
import path from 'path'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm PayScales'
const cleanup = new CleanupHelper()

test.describe.serial('Community PayScales API', () => {

  let service: CommPayscalesService
  let payscaleId: string
  let psName: string
  let pointName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new CommPayscalesService(api)
  })

  // =============================
  // CREATE PAYSCALE
  // =============================
  test('create payscale', async () => {

    psName = `PS_API_${Date.now()}`

    const res = await service.create([
      {
        psName: psName,
        psDesc: 'Created by Playwright',
        uploadFile: null,
        logo: true,
        isHidden: false,
        creDate: new Date().toISOString(),
        logoCnt: 0,
        logoExtension: '.jpg',
        logoUrl: 'string'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    payscaleId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!payscaleId || deleted) return
      await service.delete(payscaleId)
    })

    recordPass(MODULE)
  })

  // =============================
  // GET ALL
  // =============================
  test('get payscales', async () => {

    const res = await service.getAll()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // GET BY ID
  // =============================
  test('get payscale by id', async () => {

    const res = await service.getById(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // UPDATE
  // =============================
  test('update payscale', async () => {

    const updatedName = `${psName}_UPDATED`

    const res = await service.update({
      psId: payscaleId,
      psName: updatedName,
      psDesc: 'Updated by Playwright',
      uploadFile: null,
      logo: true,
      isHidden: false,
      creDate: new Date().toISOString(),
      logoCnt: 0,
      logoExtension: '.jpg',
      logoUrl: 'string'
    })

    expect(res.status()).toBe(200)

    psName = updatedName

    recordPass(MODULE)
  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive payscale', async () => {

    const res = await service.archive(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('unarchive payscale', async () => {

    const res = await service.unarchive(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('get archived payscales', async () => {

    const res = await service.getArchived()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // LOGO
  // =============================
  test('upload payscale logo', async () => {

    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(payscaleId, logoPath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('get payscale logo', async () => {

    const res = await service.getLogo(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // TEMPLATE / EXPORT
  // =============================
  test('get payscale template', async () => {

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('export payscale', async () => {

    const res = await service.exportPayscale(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // POINTS
  // =============================
  test('get points', async () => {

    const res = await service.getPoints(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('create points', async () => {

    pointName = `API_PT_${Date.now()}`

    const res = await service.createPoints(payscaleId, [
      {
        ptName: pointName,
        ptOrder: 0,
        ptValue: 80,
        validationError: 'string',
        pk: 0,
        rowNumber: 0,
        error: 'string'
      }
    ])

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('get point by name', async () => {

    const res = await service.getPointByName(payscaleId, pointName)

    expect([200, 404]).toContain(res.status())

    recordPass(MODULE)
  })

  test('export points', async () => {

    const res = await service.exportPoints(payscaleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // DELETE (Primary)
  // =============================
  test('delete payscale', async () => {

    const res = await service.delete(payscaleId)

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
      console.log(`❌ ${testInfo.title} — failed`)
    }

  })

  // =============================
  // CLEANUP (Fallback)
  // =============================
  test.afterAll(async () => {

    printModuleSummary(MODULE)

    await cleanup.runAll(MODULE)

  })

})