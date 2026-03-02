import { test, expect } from '../../fixtures/api-fixture'
import { QualificationService } from '../../services/sector/sector-qualifications.service'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Qualification'
const employerId = '00000000-0000-0000-0000-000000000000'

test.describe('Employer Qualification API', () => {
  let service: QualificationService
  let qualificationId: string

  test.beforeAll(async ({ api }) => {
    service = new QualificationService(api)
  })

  // =============================
  // CREATE
  // =============================
  test('create qualification', async () => {
    const res = await service.create(employerId, [
      {
        quName: `API_QUAL_${Date.now()}`,
        wfCode: 'NA'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    qualificationId = body.result[0]

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
    const res = await service.update(employerId, {
      quId: qualificationId,
      quName: `UPDATED_${Date.now()}`,
      wfCode: 'NA'
    })

    expect(res.status()).toBe(200)
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
  // DELETE
  // =============================
  test('delete qualification', async () => {
    const res = await service.delete(
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
      console.log(`❌ ${testInfo.title} — failed`)
    }
  })

  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})