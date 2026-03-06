import { test, expect } from '../../fixtures/api-fixture'
import { PayElementsService } from '../../services/sector/sector-pay-elements.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Pay Elements'
const cleanup = new CleanupHelper()

test.describe.serial('Pay Elements API', () => {

  let service: PayElementsService
  let peId: string
  let peName: string
  let deleted = false

  const employerId = '00000000-0000-0000-0000-000000000000'

  test.beforeAll(async ({ api }) => {
    service = new PayElementsService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create pay element', async () => {

    peName = `PE_API_${Date.now()}`

    const res = await service.createPayElement(employerId, [
      {
        peName: peName,
        peType: 0,
        peTax: true,
        peNi: true,
        peTps: true,
        peTpsBand: true,
        peLgps: true,
        peLgpsBand: true,
        peThirdParty: true,
        peUsedFor1: 4,
        peUsedFor2: 0,
        peSystemId: 0,
        erNo: 0,
        errorMessage: "string",
        petRequired: true
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()

    peId = body.result[0].peId

    // fallback cleanup
    cleanup.add(async () => {
      if (!peId || deleted) return
      await service.deletePayElement(employerId, peId)
    })

    recordPass(MODULE)

  })

  // =============================
  // GET ALL
  // =============================
  test('get pay elements', async () => {

    const res = await service.getAllPayElements(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // GET BY ID
  // =============================
  test('get pay element by id', async () => {

    const res = await service.getPayElementById(employerId, peId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // UPDATE
  // =============================
  test('update pay element', async () => {

    const updatedName = `${peName}_UPDATED`

    const res = await service.updatePayElement(employerId, peId, {
      peId: peId,
      peName: updatedName,
      peType: 0,
      peTax: true,
      peNi: true,
      peTps: true,
      peTpsBand: true,
      peLgps: true,
      peLgpsBand: true,
      peThirdParty: true,
      peUsedFor1: 8,
      peUsedFor2: 0,
      peSystemId: 0,
      erNo: 0,
      hide: true,
      errorMessage: "string",
      petRequired: true
    })

    expect(res.status()).toBe(200)

    peName = updatedName

    recordPass(MODULE)

  })

  // =============================
  // ARCHIVE
  // =============================
  test('archive pay element', async () => {

    const res = await service.archivePayElement(employerId, peId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // UNARCHIVE
  // =============================
  test('unarchive pay element', async () => {

    const res = await service.unarchivePayElement(employerId, peId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // DELETE (Primary)
  // =============================
  test('delete pay element', async () => {

    const res = await service.deletePayElement(employerId, peId)

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