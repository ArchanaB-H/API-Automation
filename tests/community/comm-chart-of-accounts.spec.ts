import { test, expect } from '../../fixtures/api-fixture'
import { CommChartOfAccountsService } from '../../services/community/comm-chart-of-accounts.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Comm Chart Of Accounts'

test.describe('Community Chart Of Accounts API', () => {
  let service: CommChartOfAccountsService
  let chartId: string
  let itemNo: number

  test.beforeAll(async ({ api }) => {
    service = new CommChartOfAccountsService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create chart of accounts', async () => {
    const res = await service.create([
      {
        caName: `API_COA`,
        caDesc: 'desc',
        caType: 0,
        uploadFile: null,
        creDate: new Date().toISOString(),
        isHidden: false,
        logoCnt: 0,
        logoUrl: 'string',
        logoExtension: '.jpg'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    chartId = body.result[0]

    recordPass(MODULE)
  })

  // =============================
  // GET ALL
  // =============================
  test('get chart of accounts', async () => {
    const res = await service.getAll()
    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // UPDATE
  // =============================
  test('update chart of accounts', async () => {
    const res = await service.update({
      caNo: 0,
      caId: chartId,
      caName: `UPDATED_API`,
      caDesc: 'desc',
      caType: 0,
      uploadFile: null,
      creDate: new Date().toISOString(),
      isHidden: false,
      logoCnt: 0,
      logoUrl: 'string',
      logoExtension: '.jpg'
    })

    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive chart', async () => {
    const res = await service.archive(chartId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive chart', async () => {
    const res = await service.unarchive(chartId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET ARCHIVED
  // =============================
  test('get archived charts', async () => {
    const res = await service.getArchived()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // LOGO UPLOAD
  // =============================
  test('upload logo', async () => {
    const filePath = path.resolve('test-data/logo.jpg')
    const res = await service.uploadLogo(chartId, filePath)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // GET LOGO
  // =============================
  test('get logo', async () => {
    const res = await service.getLogo(chartId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // TEMPLATE
  // =============================
  test('get template', async () => {
    const res = await service.getTemplate()
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  //  ITEMS
  // =============================

  test('get items', async () => {
    const res = await service.getItems(chartId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  test('create items', async () => {
    const res = await service.createItems(chartId, [
      {
        caNo: 0,
        seqNo: 0,
        itemCode: `CODE_${Date.now()}`,
        itemDesc: 'desc'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    itemNo = body.result[0]

    recordPass(MODULE)
  })

  test('get item by no', async () => {
    const res = await service.getItemByNo(chartId, itemNo)
    expect([200, 404]).toContain(res.status())
    recordPass(MODULE)
  })

  test('export items', async () => {
    const res = await service.exportItems(chartId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  }) 

  // =============================
  // DELETE (LAST)
  // =============================
  test('delete chart of accounts', async () => {
    const res = await service.delete(chartId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // FAILURE TRACKER
  // =============================
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }
  })

  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})