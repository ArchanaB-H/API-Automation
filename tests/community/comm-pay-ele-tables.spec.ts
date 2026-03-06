import { test, expect } from '../../fixtures/api-fixture'
import { CommPayElementTableService } from '../../services/community/comm-pay-ele-tables.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Pay Element Table'
const cleanup = new CleanupHelper()

test.describe.serial('Community Pay Element Table API', () => {

  let service: CommPayElementTableService
  let tableId: string
  let tableName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new CommPayElementTableService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create pay element table', async () => {

    tableName = `API_TABLE_${Date.now()}`

    const res = await service.create([
      {
        name: tableName,
        description: 'Created by Playwright',
        type: 2,
        logoExtension: '.jpg',
        items: [
          {
            levelName: 'L1',
            money1: 10,
            money2: 20,
            money3: 40,
            ordering: 0
          }
        ]
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    tableId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!tableId || deleted) return
      await service.delete(tableId)
    })

    recordPass(MODULE)
  })

  // =============================
  // GET ALL
  // =============================
  test('get pay element tables', async () => {

    const res = await service.getAll()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // GET ITEMS
  // =============================
  test('get table items', async () => {

    const res = await service.getItems(tableId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // UPDATE
  // =============================
  test('update pay element table', async () => {

    const updatedName = `${tableName}_UPDATED`

    const res = await service.update(tableId, {
      name: updatedName,
      description: 'Updated by Playwright',
      type: 2,
      logoExtension: '.jpg',
      items: [
        {
          levelName: 'L1',
          money1: 10,
          money2: 20,
          money3: 30,
          ordering: 0
        }
      ]
    })

    expect(res.status()).toBe(200)

    tableName = updatedName

    recordPass(MODULE)
  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive table', async () => {

    const res = await service.archive(tableId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('unarchive table', async () => {

    const res = await service.unarchive(tableId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // LOGO
  // =============================
  test('upload table logo', async () => {

    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(tableId, logoPath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('get table logo', async () => {

    const res = await service.getLogo(tableId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // TEMPLATE
  // =============================
  test('get table template', async () => {

    const res = await service.getTemplate(2)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // EXPORT
  // =============================
  test('export table', async () => {

    const res = await service.export(tableId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =============================
  // DELETE (Primary)
  // =============================
  test('delete table', async () => {

    const res = await service.delete(tableId)

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