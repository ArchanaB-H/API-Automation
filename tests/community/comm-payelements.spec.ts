import { test, expect } from '../../fixtures/api-fixture'
import { CommPayElementService } from '../../services/community/comm-payelements.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Pay Elements'
const cleanup = new CleanupHelper()

test.describe.serial('Comm Pay Element API', () => {

  let createdId: string
  let peName: string
  let deleted = false

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
      console.log(`❌ ${testInfo.title} — failed`)
    }
  })

  // =====================================
  // CREATE
  // =====================================
  test('create pay element', async ({ api }) => {

    const service = new CommPayElementService(api)

    peName = `API_PE_${Date.now()}`

    const res = await service.createPayElement([
      {
        peName: peName,
        peType: 0,
        peTax: true,
        peNi: true,
        peTps: true,
        peTpsBand: true,
        peThirdParty: true,
        peLgps: true,
        peLgpsBand: true,
        peUsedFor1: 10,
        peUsedFor1String: '10',
        peSystemId: 0
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    createdId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!createdId || deleted) return
      await service.deletePayElement(createdId)
    })

    recordPass(MODULE)
  })

  // =====================================
  // GET ALL
  // =====================================
  test('get pay elements', async ({ api }) => {

    const service = new CommPayElementService(api)

    const res = await service.getAllPayElements()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // GET BY ID
  // =====================================
  test('get pay element by id', async ({ api }) => {

    const service = new CommPayElementService(api)

    const res = await service.getPayElementById(createdId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // UPDATE
  // =====================================
  test('update pay element', async ({ api }) => {

    const service = new CommPayElementService(api)

    const updatedName = `${peName}_UPDATED`

    const res = await service.updatePayElement(createdId, {
      peId: createdId,
      peName: updatedName,
      peType: 0,
      peTax: true,
      peNi: true,
      peTps: true,
      peTpsBand: true,
      peThirdParty: true,
      peLgps: true,
      peLgpsBand: true,
      peUsedFor1: 8,
      peUsedFor1String: '8',
      peSystemId: 0
    })

    expect(res.status()).toBe(200)

    peName = updatedName

    recordPass(MODULE)
  })

  // =====================================
  // TEMPLATE
  // =====================================
  test('get pay element template', async ({ api }) => {

    const service = new CommPayElementService(api)

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // DELETE (Primary)
  // =====================================
  test('delete pay element', async ({ api }) => {

    const service = new CommPayElementService(api)

    const res = await service.deletePayElement(createdId)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)
  })

  // =====================================
  // MODULE SUMMARY + CLEANUP
  // =====================================
  test.afterAll(async () => {
    
    printModuleSummary(MODULE)
    
    await cleanup.runAll(MODULE)
    
  })

})