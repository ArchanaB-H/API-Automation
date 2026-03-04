import { test, expect } from '../../fixtures/api-fixture'
import { CommPayElementService } from '../../services/community/comm-payelements.service'
import {recordPass,recordFail,printModuleSummary} from '../../utils/module-tracker'

const MODULE = 'Comm Pay Elements'

test.describe.serial('Comm Pay Element API', () => {
  let createdId: string
  let peName: string

  function markPassed(name: string) {
    recordPass(MODULE)
    console.log(`✅ ${name} — passed`)
  }

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
      console.log(`❌ ${testInfo.title} — failed`)
    }
  })

  // =====================================
  //  CREATE
  // =====================================
  test('create pay element', async ({ api }) => {
    const service = new CommPayElementService(api)

    peName = `API_PE`

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

    markPassed('pay element created')
  })

  // =====================================
  //  GET ALL
  // =====================================
  test('get pay elements', async ({ api }) => {
    const service = new CommPayElementService(api)

    const res = await service.getAllPayElements()
    expect(res.status()).toBe(200)

    markPassed('get pay elements')
  })

  // =====================================
  //  GET BY ID
  // =====================================
  test('get pay element by id', async ({ api }) => {
    const service = new CommPayElementService(api)

    const res = await service.getPayElementById(createdId)
    expect(res.status()).toBe(200)

    markPassed('get pay element by id')
  })

  // =====================================
  //  PUT
  // =====================================
  test('update pay element', async ({ api }) => {
    const service = new CommPayElementService(api)

    const res = await service.updatePayElement(createdId, {
      peId: createdId,
      peName: `${peName}_Updated`,
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

    markPassed('put update pay element')
  })

  // =====================================
  //  TEMPLATE
  // =====================================
  test('get pay element template', async ({ api }) => {
    const service = new CommPayElementService(api)

    const res = await service.getTemplate()
    expect(res.status()).toBe(200)

    markPassed('template fetch pay element')
  })

  // =====================================
  //  DELETE
  // =====================================
  test('delete pay element', async ({ api }) => {
    const service = new CommPayElementService(api)

    const res = await service.deletePayElement(createdId)
    expect(res.status()).toBe(200)

    markPassed('delete pay element')
  })

  // =====================================
  // MODULE SUMMARY
  // =====================================
  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})