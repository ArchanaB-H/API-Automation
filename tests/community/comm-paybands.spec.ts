import { test, expect } from '../../fixtures/api-fixture'
import { CommPayBandService } from '../../services/community/comm-paybands.services'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Comm PayBand'

test.describe('Community PayBand API', () => {
  let service: CommPayBandService
  let payBandId: string

  test.beforeAll(async ({ api }) => {
    service = new CommPayBandService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create pay band', async () => {
    const res = await service.create([
      {
        pbNo: 0,
        pbname: `PB_API`,
        pbdesc: 'Created by Playwright',
        pblogo: true,
        logo: true,
        logoCnt: 0,
        logoUrl: 'string',
        isHidden: true,
        creDate: new Date().toISOString(),
        uploadFile: 'string',
        logoExtension: '.jpg',
        points: [
          {
            ppname: 'pb pt 1',
            ppmin: 10,
            ppmax: 20,
            pbOrder: 0
          },
          {
            ppname: 'pb pt 2',
            ppmin: 20,
            ppmax: 40,
            pbOrder: 0
          }
        ]
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    payBandId = body.result[0]

    recordPass(MODULE)
  })

  // =============================
  // GET ALL
  // =============================
  test('get pay bands', async () => {
    const res = await service.getAll()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET BY ID
  // =============================
  test('get pay band by id', async () => {
    const res = await service.getById(payBandId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UPDATE
  // =============================
  test('update pay band', async () => {
    const res = await service.update(payBandId, {
      pbNo: 0,
      pbid: payBandId,
      pbname: `PB_UPDATED_API`,
      pbdesc: 'Updated by Playwright',
      pblogo: true,
      logo: true,
      logoCnt: 0,
      logoUrl: 'string',
      isHidden: true,
      creDate: new Date().toISOString(),
      uploadFile: 'string',
      logoExtension: '.jpg',
      points: []
    })

    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive pay band', async () => {
    const res = await service.archive(payBandId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive pay band', async () => {
    const res = await service.unarchive(payBandId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // LOGO UPLOAD (API BUG SAFE)
  // =============================
  test('upload pay band logo', async () => {
    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(payBandId, logoPath)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET LOGO
  // =============================
  test('get pay band logo', async () => {
    const res = await service.getLogo(payBandId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // TEMPLATE
  // =============================
  test('get pay band template', async () => {
    const res = await service.getTemplate()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // EXPORT
  // =============================
  test('export pay band', async () => {
    const res = await service.export(payBandId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // DELETE 
  // =============================
  test('delete pay band', async () => {
    const res = await service.delete(payBandId)
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