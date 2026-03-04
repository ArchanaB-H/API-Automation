import { test, expect } from '../../fixtures/api-fixture'
import { CommFamilyLeavePolicyService } from '../../services/community/comm-family-leave-policy.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Comm Family Leave Policy'

test.describe('Community Family Leave Policy API', () => {
  let service: CommFamilyLeavePolicyService
  let flpId: string

  test.beforeAll(async ({ api }) => {
    service = new CommFamilyLeavePolicyService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create family leave policy', async () => {
    const res = await service.create({
      flpname: `FLP_API`,
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
    const res = await service.update(flpId, {
      flpid: flpId,
      flpname: `UPDATED_API`,
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
  // DELETE
  // =============================
  test('delete family leave policy', async () => {
    const res = await service.delete(flpId)
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