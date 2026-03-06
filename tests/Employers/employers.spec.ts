import { test, expect } from '../../fixtures/api-fixture'
import { EmployersService } from '../../services/Employers/employers.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'
import path from 'path'

const MODULE = 'Employers'
const cleanup = new CleanupHelper()

test.describe.serial('Employers API', () => {

  let service: EmployersService
  let employerId: string
  let employerName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new EmployersService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create employer', async () => {

    employerName = `Archana_API_${Date.now()}`

    const res = await service.create({
      name: employerName,
      addr1: 'API',
      addr2: 'string',
      addr3: 'string',
      addr4: 'string',
      postcode: '577204',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString(),
      isDeleted: false,
      sectorId: 'EDU',
      reference: 'string',
      regionId: 'ENG',
      goLiveDate: '2026-03-04',
      status: 0,
      logoName: 'logo.jpg',
      logoCnt: 0,
      uploadFile: 'string'
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    employerId = body.result

    // fallback cleanup
    cleanup.add(async () => {
      if (!employerId || deleted) return
      await service.delete(employerId)
    })

    recordPass(MODULE)

  })

  // =============================
  // GET ALL
  // =============================
  test('get employers', async () => {

    const res = await service.getAll('EDU')

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // GET BY ID
  // =============================
  test('get employer by id', async () => {

    const res = await service.getById(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // UPLOAD LOGO
  // =============================
  test('upload employer logo', async () => {

    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(employerId, logoPath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // GET LOGO
  // =============================
  test('get employer logo', async () => {

    const res = await service.getLogo(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // UPDATE
  // =============================
  test('update employer', async () => {

    const updatedName = `${employerName}_UPDATED`

    const res = await service.update({
      erId: employerId,
      name: updatedName,
      addr1: 'Address1',
      addr2: 'string',
      addr3: 'string',
      addr4: 'string',
      postcode: '577204',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString(),
      isDeleted: false,
      sectorId: 'EDU',
      reference: 'string',
      regionId: 'ENG',
      goLiveDate: '2026-03-04',
      status: 0,
      logoName: 'payscale-logo.jpg',
      logoCnt: 0,
      uploadFile: 'string'
    })

    expect(res.status()).toBe(200)

    employerName = updatedName

    recordPass(MODULE)

  })

  // =============================
  // DELETE 
  // =============================
  test('delete employer', async () => {

    const res = await service.delete(employerId)

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