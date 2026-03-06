import { test, expect } from '../../fixtures/api-fixture'
import { QualificationService } from '../../services/sector/sector-qualifications.service'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Qualification'
const employerId = '00000000-0000-0000-0000-000000000000'

const cleanup = new CleanupHelper()

test.describe.serial('Employer Qualification API', () => {

  let service: QualificationService
  let qualificationId: string
  let qualName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new QualificationService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create qualification', async () => {

    qualName = `API_QUAL_${Date.now()}`

    const res = await service.create(employerId, [
      {
        quName: qualName,
        wfCode: 'NA'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    qualificationId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!qualificationId || deleted) return
      await service.delete(employerId, qualificationId)
    })

    recordPass(MODULE)

  })

  // =============================
  // GET ALL
  // =============================
  test('get qualifications', async () => {

    const res = await service.getAll(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // GET BY ID
  // =============================
  test('get qualification by id', async () => {

    const res = await service.getById(
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

    const updatedName = `${qualName}_UPDATED`

    const res = await service.update(employerId, {
      quId: qualificationId,
      quName: updatedName,
      wfCode: 'NA'
    })

    expect(res.status()).toBe(200)

    qualName = updatedName

    recordPass(MODULE)

  })

  // =============================
  // TEMPLATE
  // =============================
  test('get qualification template', async () => {

    const res = await service.getTemplate(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =============================
  // DELETE (Primary)
  // =============================
  test('delete qualification', async () => {

    const res = await service.delete(
      employerId,
      qualificationId
    )

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