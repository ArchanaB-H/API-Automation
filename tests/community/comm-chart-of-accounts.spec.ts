import { test, expect } from '../../fixtures/api-fixture'
import { CommChartOfAccountsService } from '../../services/community/comm-chart-of-accounts.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import path from 'path'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'

const cleanup = new CleanupHelper()

const MODULE = 'Comm Chart Of Accounts'

test.describe.serial('Community Chart Of Accounts API', () => {

  let service: CommChartOfAccountsService
  let chartId: string
  let itemNo: number
  let chartName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new CommChartOfAccountsService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create chart of accounts', async () => {

    chartName = `API_COA_${Date.now()}`

    const res = await service.create([
      {
        caName: chartName,
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

    // fallback cleanup
    cleanup.add(async () => {
      if (!chartId || deleted) return
      await service.delete(chartId)
    })

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

    const updatedName = `${chartName}_UPDATED`

    const res = await service.update({
      caNo: 0,
      caId: chartId,
      caName: updatedName,
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

    chartName = updatedName

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
  // ITEMS
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


  // =============================
  // EXPORT ITEMS
  // =============================
  test('export items', async () => {

    const res = await service.exportItems(chartId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // DELETE (Primary Deletion)
  // =============================
  test('delete chart of accounts', async () => {

    const res = await service.delete(chartId)

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

    }

  })


  // =============================
  // CLEANUP (Fallback Only)
  // =============================
  test.afterAll(async () => {

    printModuleSummary(MODULE)

    await cleanup.runAll(MODULE)

  })

})