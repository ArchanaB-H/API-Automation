import { test, expect } from '../../fixtures/api-fixture'
import { CommPayscalesService } from '../../services/community/comm-payscales.service'
import path from 'path'
import {recordPass,recordFail,printModuleSummary} from '../../utils/module-tracker'
const MODULE = 'Comm PayScales'

test.describe('Community PayScales API', () => {
  let service: CommPayscalesService
  let payscaleId: string
  let pointName: string

  test.beforeAll(async ({ api }) => {
    service = new CommPayscalesService(api)
  })

  // =============================
  // CREATE PAYSCALE
  // =============================
  test('create payscale', async () => {
    const res = await service.create([
      {
        psName: `PW_PS_API`,
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

    recordPass(MODULE)
    console.log('✅ create payscale — passed')
  })

  // =============================
  // GET ALL
  // =============================
  test('get payscales', async () => {
    const res = await service.getAll()
    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ get payscales — passed')
  })

  // =============================
  // GET BY ID
  // =============================
  test('get payscale by id', async () => {
    const res = await service.getById(payscaleId)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ get payscale by id — passed')
  })
 // =============================
 // UPDATE PAYSCALE
 // =============================
test('update payscale', async () => {
  const res = await service.update({
    psId: payscaleId,
    psName: `PW_PS_UPDATED`,
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

  recordPass(MODULE)
  console.log('✅ update payscale — passed')
})
// =============================
// ARCHIVE PAYSCALE
// =============================
test('archive payscale', async () => {
  const res = await service.archive(payscaleId)
  expect(res.status()).toBe(200)

  recordPass(MODULE)
  console.log('✅ archive payscale — passed')
})
// =============================
// UNARCHIVE PAYSCALE
// =============================
test('unarchive payscale', async () => {
  const res = await service.unarchive(payscaleId)
  expect(res.status()).toBe(200)

  recordPass(MODULE)
  console.log('✅ unarchive payscale — passed')
})
// =============================
// GET ARCHIVED PAY SCALES
// =============================
test('get archived payscales', async () => {
  const res = await service.getArchived()
  expect(res.status()).toBe(200)

  recordPass(MODULE)
  console.log('✅ get archived payscales — passed')
})
  // =============================
  // UPLOAD LOGO
  // =============================
  test('upload payscale logo', async () => {
    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(payscaleId, logoPath)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ upload logo — passed')
  })
// =============================
// GET LOGO
// =============================
test('get payscale logo', async () => {
  const res = await service.getLogo(payscaleId)
  expect(res.status()).toBe(200)

  recordPass(MODULE)
  console.log('✅ get logo — passed')
})
// =============================
// GET TEMPLATE
// =============================
test('get payscale template', async () => {
  const res = await service.getTemplate()
  expect(res.status()).toBe(200)

  recordPass(MODULE)
  console.log('✅ get template — passed')
})
// =============================
// EXPORT PAYSCALE
// =============================
test('export payscale', async () => {
  const res = await service.exportPayscale(payscaleId)
  expect(res.status()).toBe(200)

  recordPass(MODULE)
  console.log('✅ export payscale — passed')
})
  // =============================
  // ⭐ PAY SCALE POINTS ⭐
  // =============================

  test('get points', async () => {
    const res = await service.getPoints(payscaleId)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ get points — passed')
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
    console.log('✅ create points — passed')
  })

  test('get point by name', async () => {
    const res = await service.getPointByName(
      payscaleId,
      pointName
    )

    expect([200, 404]).toContain(res.status())

    recordPass(MODULE)
    console.log('✅ get point by name — passed')
  })

  test('export points', async () => {
    const res = await service.exportPoints(payscaleId)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ export points — passed')
  })

  // =============================
  // DELETE PAYSCALE (LAST)
  // =============================
   test('delete payscale', async () => {
    const res = await service.delete(payscaleId)
    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ delete payscale — passed')
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