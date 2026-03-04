import { test, expect } from '../../fixtures/api-fixture'
import { EmployersService } from '../../services/Employers/employers.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import path from 'path'

const MODULE = 'Employers'

test.describe.serial('Employers API', () => {

  let service: EmployersService
  let employerId: string

  test.beforeAll(async ({ api }) => {
    service = new EmployersService(api)
  })

  // =============================
  // GET ALL
  // =============================
  test('get employers', async () => {

    const res = await service.getAll('EDU')

    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ get employers — passed')
  })


  // =============================
  // CREATE
  // =============================
  test('create employer', async () => {

    const res = await service.create({
      name: `Archana_API`,
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

    recordPass(MODULE)
    console.log('✅ create employer — passed')
  })


  // =============================
  // GET BY ID
  // =============================
  test('get employer by id', async () => {

    const res = await service.getById(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ get employer by id — passed')
  })


  // =============================
  // UPLOAD LOGO
  // =============================
  test('upload employer logo', async () => {

    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(employerId, logoPath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ upload logo — passed')
  })
  


  // =============================
  // GET LOGO
  // =============================
  test('get employer logo', async () => {

    const res = await service.getLogo(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ get logo — passed')
  })


  // =============================
  // UPDATE
  // =============================
  test('update employer', async () => {

    const res = await service.update({
      erId: employerId,
      name: 'Archana_API_updated',
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

    recordPass(MODULE)
    console.log('✅ update employer — passed')
  })


  // =============================
  // DELETE
  // =============================
  test('delete employer', async () => {

    const res = await service.delete(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
    console.log('✅ delete employer — passed')
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