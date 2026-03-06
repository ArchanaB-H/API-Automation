import { test, expect } from '../../fixtures/api-fixture'
import { CommFamilyLeavePolicyService } from '../../services/community/comm-family-leave-policy.service'
import path from 'path'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Family Leave Policy'
const cleanup = new CleanupHelper()

test.describe.serial('Community Family Leave Policy API', () => {

  let service: CommFamilyLeavePolicyService
  let flpId: string
  let flpName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new CommFamilyLeavePolicyService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create family leave policy', async () => {

    flpName = `FLP_API_${Date.now()}`

    const res = await service.create({
      flpname: flpName,
      flpdesc: 'Created by Playwright',
      flptype: 0,
      isHidden: false,
      flpItems: [
        {
          threshold: 10,
          value: 10,
          pay: 20,
          plus: true,
          ordering: 0
        }
      ],
      uploadFile: null,
      logo: true,
      logoExtension: '.jpg'
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    flpId = body.result

    // fallback cleanup
    cleanup.add(async () => {
      if (!flpId || deleted) return
      await service.delete(flpId)
    })

    recordPass(MODULE)
  })


  // =============================
  // GET ALL
  // =============================
  test('get family leave policy list', async () => {

    const res = await service.getAll()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // GET BY ID
  // =============================
  test('get family leave policy by id', async () => {

    const res = await service.getById(flpId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // GET BY TYPE
  // =============================
  test('get family leave policy by type', async () => {

    const res = await service.getByType(0)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // UPDATE
  // =============================
  test('update family leave policy', async () => {

    const updatedName = `${flpName}_UPDATED`

    const res = await service.update(flpId, {
      flpid: flpId,
      flpname: updatedName,
      flpdesc: 'Updated by Playwright',
      flptype: 0,
      isHidden: false,
      flpItems: [
        {
          threshold: 10,
          value: 10,
          pay: 10,
          plus: true,
          ordering: 0
        }
      ],
      uploadFile: null,
      logo: true,
      logoExtension: '.jpg'
    })

    expect(res.status()).toBe(200)

    flpName = updatedName

    recordPass(MODULE)
  })


  // =============================
  // ARCHIVE
  // =============================
  test('archive family leave policy', async () => {

    const res = await service.archive(flpId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive family leave policy', async () => {

    const res = await service.unarchive(flpId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // LOGO UPLOAD
  // =============================
  test('upload family leave policy logo', async () => {

    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(flpId, logoPath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // GET LOGO
  // =============================
  test('get family leave policy logo', async () => {

    const res = await service.getLogo(flpId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // TEMPLATE
  // =============================
  test('get family leave policy template', async () => {

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // EXPORT
  // =============================
  test('export family leave policy', async () => {

    const res = await service.export(flpId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // DELETE (Primary)
  // =============================
  test('delete family leave policy', async () => {

    const res = await service.delete(flpId)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)
  })


  // =============================
  // FAILURE TRACKER
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