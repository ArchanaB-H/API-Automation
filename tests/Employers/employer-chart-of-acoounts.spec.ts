import { test, expect } from '../../fixtures/api-fixture'
import { EmployerChartOfAccountsService } from '../../services/Employers/employer-chart-of-accounts.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { getOrCreateEmployer } from '../../utils/employer-helper'

const MODULE = 'Comm Chart Of Accounts'

test.describe.serial('Employer Chart Of Accounts API', () => {

  let service: EmployerChartOfAccountsService
  let employerId: string

  let ledgerId: string
  let ledgerName: string

  let costId: string
  let costName: string

  let fundId: string
  let fundName: string

  const cleanup = new CleanupHelper()

  test.beforeAll(async ({ api }) => {
    service = new EmployerChartOfAccountsService(api)
    employerId = await getOrCreateEmployer(api)
  })

  // ==================================================
  // LEDGER CODES (6 tests)
  // ==================================================

  test('create ledger code', async () => {

    ledgerName = `LG_API_${Date.now()}`

    const res = await service.createLedgerCodes(employerId, [
      { legCode: ledgerName, legDesc: 'Automation' }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    ledgerId = body.result[0]

    cleanup.add(async () => {
      await service.deleteLedgerCodes(employerId, [ledgerId])
    })

    recordPass(MODULE)
  })


  test('get ledger codes', async () => {

    const res = await service.getLedgerCodes(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get ledger code by id', async () => {

    const res = await service.getLedgerCodeById(employerId, ledgerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('update ledger code', async () => {

    const res = await service.updateLedgerCodes(employerId, {
      legNo: 0,
      legId: ledgerId,
      legCode: `${ledgerName}`,
      legDesc: 'Updated'
    })

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get ledger template', async () => {

    const res = await service.getLedgerTemplate(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  test('delete ledger code', async () => {

  const res = await service.deleteLedgerCodes(employerId,[ledgerId])

  expect(res.status()).toBe(200)

  recordPass(MODULE)

}) 


  // ==================================================
  // COST CENTRE (5 tests)
  // ==================================================

  test('create cost centre', async () => {

    costName = `CC_API_${Date.now()}`

    const res = await service.createCostCentres(employerId, [
      {
        cosCode: costName,
        cosDesc: 'Automation',
        employerId: employerId,
        erNo: 0
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    costId = body.result[0]

    cleanup.add(async () => {
      await service.deleteCostCentre(employerId, costId)
    })

    recordPass(MODULE)
  })


  test('get cost centres', async () => {

    const res = await service.getCostCentres(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get cost centre by id', async () => {

    const res = await service.getCostCentreById(employerId, costId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('update cost centre', async () => {

    const res = await service.updateCostCentre(employerId, {
      cosNo: 0,
      cosId: costId,
      cosCode: `${costName}`,
      cosDesc: 'Updated',
      employerId: employerId,
      erNo: 0
    })

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('delete cost centre', async () => {

    const res = await service.deleteCostCentre(employerId, costId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // ==================================================
  // FUND CODES (5 tests)
  // ==================================================

  test('create fund code', async () => {

    fundName = `FC_API_${Date.now()}`

    const res = await service.createFundCodes(employerId, [
      { funCode: fundName, funDesc: 'Automation' }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    fundId = body.result[0]

    cleanup.add(async () => {
      await service.deleteFundCodes(employerId, [fundId])
    })

    recordPass(MODULE)
  })


  test('get fund codes', async () => {

    const res = await service.getFundCodes(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get fund code by id', async () => {

    const res = await service.getFundCodeById(employerId, fundId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('update fund code', async () => {

    const res = await service.updateFundCodes(employerId, {
      funNo: 0,
      funId: fundId,
      funCode: `${fundName}`,
      funDesc: 'Updated'
    })

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('delete fund code', async () => {

    const res = await service.deleteFundCodes(employerId, [fundId])

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // ==================================================
  // FAILURE TRACKING
  // ==================================================

  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }

  })


  // ==================================================
  // CLEANUP
  // ==================================================

  test.afterAll(async () => {

    await cleanup.runAll(MODULE)

    printModuleSummary(MODULE)

  }) 

})