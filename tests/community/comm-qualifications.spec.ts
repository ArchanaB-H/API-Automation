import { test, expect } from '../../fixtures/api-fixture'
import { CommQualificationService } from '../../services/community/comm-qualifications.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Qualifications'
const cleanup = new CleanupHelper()

test.describe.serial('Comm Qualification API', () => {

  let createdId: string
  let qualName: string
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
  test('create qualification', async ({ api }) => {

    const service = new CommQualificationService(api)

    qualName = `API_QUAL_${Date.now()}`

    const res = await service.createQualification([
      {
        quName: qualName,
        wfCode: 'NA',
        errorMessage: 'string'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    createdId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!createdId || deleted) return
      await service.deleteQualification(createdId)
    })

    recordPass(MODULE)
  })

  // =====================================
  // GET ALL
  // =====================================
  test('get qualifications', async ({ api }) => {

    const service = new CommQualificationService(api)

    const res = await service.getAllQualifications()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // GET BY ID
  // =====================================
  test('get qualification by id', async ({ api }) => {

    const service = new CommQualificationService(api)

    const res = await service.getQualificationById(createdId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // UPDATE
  // =====================================
  test('update qualification', async ({ api }) => {

    const service = new CommQualificationService(api)

    const updatedName = `${qualName}_UPDATED`

    const res = await service.updateQualification({
      quId: createdId,
      quName: updatedName,
      wfCode: 'NQF5',
      errorMessage: 'string'
    })

    expect(res.status()).toBe(200)

    qualName = updatedName

    recordPass(MODULE)
  })

  // =====================================
  // TEMPLATE
  // =====================================
  test('get qualification template', async ({ api }) => {

    const service = new CommQualificationService(api)

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // DELETE (Primary)
  // =====================================
  test('delete qualification', async ({ api }) => {

    const service = new CommQualificationService(api)

    const res = await service.deleteQualification(createdId)

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