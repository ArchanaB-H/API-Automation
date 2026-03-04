import { test, expect } from '../../fixtures/api-fixture'
import { CommSickLeavePolicyService } from '../../services/community/comm-sick-leave-policy.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Comm Sick Leave Policy'

test.describe('Community Sick Leave Policy API', () => {
  let service: CommSickLeavePolicyService
  let slpId: string

  test.beforeAll(async ({ api }) => {
    service = new CommSickLeavePolicyService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create sick leave policy', async () => {
    const res = await service.create({
      slpName: `SLP_API`,
      slpDesc: 'Created by Playwright',
      slpType: 2,
      isHidden: false,
      slpItems: [
        {
          threshold: 10,
          value: 10,
          pay: 10,
          ssp: true,
          ordering: 0
        }
      ],
      uploadFile: null,
      logo: true,
      logoExtension: '.jpg',
      logoCnt: 0
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    slpId = body.result

    recordPass(MODULE)
  })

  // =============================
  // GET ALL
  // =============================
  test('get sick leave policy list', async () => {
    const res = await service.getAll()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET BY ID
  // =============================
  test('get sick leave policy by id', async () => {
    const res = await service.getById(slpId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UPDATE
  // =============================
  test('update sick leave policy', async () => {
    const res = await service.update(slpId, {
      slpId,
      slpName: `UPDATED_API`,
      slpDesc: 'Updated by Playwright',
      slpType: 0,
      isHidden: false,
      slpItems: [
        {
          threshold: 10,
          value: 10,
          pay: 10,
          ssp: true,
          ordering: 0
        }
      ],
      uploadFile: null,
      logo: true,
      logoExtension: '.jpg',
      logoCnt: 0
    })

    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive sick leave policy', async () => {
    const res = await service.archive(slpId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive sick leave policy', async () => {
    const res = await service.unarchive(slpId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // LOGO UPLOAD
  // =============================
  test('upload sick leave policy logo', async () => {
    const logoPath = path.resolve('test-data/logo.jpg')
    const res = await service.uploadLogo(slpId, logoPath)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET LOGO
  // =============================
  test('get sick leave policy logo', async () => {
    const res = await service.getLogo(slpId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // TEMPLATE
  // =============================
  test('get sick leave policy template', async () => {
    const res = await service.getTemplate()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // EXPORT
  // =============================
  test('export sick leave policy', async () => {
    const res = await service.export(slpId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // DELETE
  // =============================
  test('delete sick leave policy', async () => {
    const res = await service.delete(slpId)
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