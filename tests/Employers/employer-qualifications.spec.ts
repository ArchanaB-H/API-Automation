import { test, expect } from '../../fixtures/api-fixture'
import { EmployerQualificationService } from '../../services/Employers/employer-qualifications.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { getOrCreateEmployer } from '../../utils/employer-helper'

const MODULE = 'Employer Qualification'

test.describe.serial('Employer Qualification API', () => {

  let service: EmployerQualificationService
  let employerId: string
  let qualificationId: string
  let qualificationName: string

  const cleanup = new CleanupHelper()

  test.beforeAll(async ({ api }) => {
    service = new EmployerQualificationService(api)
    employerId = await getOrCreateEmployer(api)
  })

  // =============================
  // GET ALL
  // =============================
  test('get qualifications', async () => {

    const res = await service.getQualifications(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // CREATE
  // =============================
  test('create qualification', async () => {

    qualificationName = `API_Qualification_${Date.now()}`

    const res = await service.createQualification(
      employerId,
      [
        {
          quName: qualificationName,
          wfCode: "string"
        }
      ]
    )

    expect(res.status()).toBe(200)

    const body = await res.json()
    qualificationId = body.result[0]

    // cleanup registration
    cleanup.add(async () => {
      await service.deleteQualification(employerId, qualificationId)
    })

    recordPass(MODULE)
  })


  // =============================
  // GET BY ID
  // =============================
  test('get qualification by id', async () => {

    const res = await service.getQualificationById(
      employerId,
      qualificationId
    )

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // UPDATE
  // =============================
  test('update qualification', async () => {

    const res = await service.updateQualification(
      employerId,
      {
        quId: qualificationId,
        quName: `${qualificationName}_updated`,
        wfCode: "string"
      }
    )

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // TEMPLATE
  // =============================
  test('get qualification template', async () => {

    const res = await service.getQualificationTemplate(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // DELETE
  // =============================
  test('delete qualification', async () => {

    const res = await service.deleteQualification(
      employerId,
      qualificationId
    )

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