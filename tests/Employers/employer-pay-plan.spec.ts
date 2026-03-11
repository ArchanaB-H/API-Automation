import { test, expect } from '../../fixtures/api-fixture'
import { PayPlanService } from '../../services/Employers/employer-pay-plan.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { getOrCreateEmployer } from '../../utils/employer-helper'

const MODULE = 'Employer Pay Plan'

test.describe.serial('Employer Pay Plan API', () => {

  let service: PayPlanService
  let employerId: string

  let payPlanId: string
  let payPlanName: string

  const cleanup = new CleanupHelper()

  test.beforeAll(async ({ api }) => {
    service = new PayPlanService(api)
    employerId = await getOrCreateEmployer(api)
  })


  // =============================
  // GET ALL
  // =============================
  test('get pay plans', async () => {

    const res = await service.getAll(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })


  // =============================
  // CREATE
  // =============================
  test('create pay plan', async () => {

    payPlanName = `API_PayPlan_${Date.now()}`

    const res = await service.create(employerId, {
      ppName: payPlanName,
      ppMethod: 2,
      ppValue: 0
    })

    expect(res.status()).toBe(200)

    const body = await res.json()

    payPlanId = body.result

    cleanup.add(async () => {
      await service.delete(employerId, payPlanId)
    })

    recordPass(MODULE)

  })


  // =============================
  // GET BY ID
  // =============================
  test('get pay plan by id', async () => {

    const res = await service.getById(employerId, payPlanId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })


  // =============================
  // UPDATE
  // =============================
  test('update pay plan', async () => {

    const res = await service.update(employerId, payPlanId, {
      ppId: payPlanId,
      ppNo: 0,
      erNo: 0,
      ppName: `${payPlanName}_UPDATED`,
      ppMethod: 2,
      ppValue: 0
    })

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })


  // =============================
  // DELETE
  // =============================
  test('delete pay plan', async () => {

    const res = await service.delete(employerId, payPlanId)

    expect(res.status()).toBe(200)

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
  // CLEANUP
  // =============================
  test.afterAll(async () => {

    await cleanup.runAll(MODULE)

    printModuleSummary(MODULE)

  })

})