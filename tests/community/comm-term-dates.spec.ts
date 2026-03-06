import { test, expect } from '../../fixtures/api-fixture'
import { CommTermDatesService } from '../../services/community/comm-term-dates.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Term Dates'
const cleanup = new CleanupHelper()

test.describe.serial('Community Term Dates API', () => {

  let service: CommTermDatesService
  let setId: string
  let tgName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new CommTermDatesService(api)
  })

  // =====================================================
  // CREATE SET
  // =====================================================
  test('create term date set', async () => {

    tgName = `TD_API_${Date.now()}`

    const res = await service.createSet([
      {
        tgName: tgName,
        tgDesc: 'desc',
        region: 'ENG',
        uploadFile: null,
        logoCnt: 0,
        logoUrl: 'string',
        isHidden: false,
        logoExtension: '.jpg',
        creBy: 0,
        creDate: new Date().toISOString(),
        amdBy: 0,
        amdDate: new Date().toISOString()
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    setId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!setId || deleted) return
      await service.deleteSet(setId)
    })

    recordPass(MODULE)
  })

  // =====================================================
  // GET SETS
  // =====================================================
  test('get term date sets', async () => {

    const res = await service.getSets()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================================
  // GET SET BY ID
  // =====================================================
  test('get term date set by id', async () => {

    const res = await service.getSetById(setId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================================
  // UPDATE SET
  // =====================================================
  test('update term date set', async () => {

    const updatedName = `${tgName}_UPDATED`

    const res = await service.updateSet(setId, {
      tgId: setId,
      tgName: updatedName,
      tgDesc: 'desc',
      region: 'ENG',
      uploadFile: null,
      logoCnt: 0,
      logoUrl: 'string',
      isHidden: false,
      logoExtension: '.jpg',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString()
    })

    expect(res.status()).toBe(200)

    tgName = updatedName

    recordPass(MODULE)
  })

  // =====================================================
  // ARCHIVE / UNARCHIVE
  // =====================================================
  test('archive set', async () => {

    const res = await service.archiveSet(setId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('unarchive set', async () => {

    const res = await service.unarchiveSet(setId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('get archived sets', async () => {

    const res = await service.getArchivedSets()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================================
  // LOGO
  // =====================================================
  test('upload set logo', async () => {

    const filePath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadSetLogo(setId, filePath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('get set logo', async () => {

    const res = await service.getSetLogo(setId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================================
  // TEMPLATE
  // =====================================================
  test('get template', async () => {

    const res = await service.getSetTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================================
  // TERM DATES 
  // =====================================================
  test('get term dates', async () => {

    const res = await service.getTermDates(setId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('create term dates', async () => {

    const res = await service.createTermDates(setId, [
      {
        dateFrom: '2026-02-25',
        dateTo: '2026-02-25',
        description: 'desc',
        termName: 'Spring',
        kind: 'Open',
        kindName: null,
        termDisplayName: null
      }
    ])

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('export term dates', async () => {

    const res = await service.exportTermDates(setId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================================
  // DELETE (Primary)
  // =====================================================
  test('delete term date set', async () => {

    const res = await service.deleteSet(setId)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)
  })

  // =====================================================
  // FAILURE TRACKING
  // =====================================================
  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }

  })

  // =====================================================
  // CLEANUP (Fallback)
  // =====================================================
  test.afterAll(async () => {

    printModuleSummary(MODULE)

    await cleanup.runAll(MODULE)

  })

})