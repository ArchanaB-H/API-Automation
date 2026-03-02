import { test, expect } from '../../fixtures/api-fixture'
import { CommQualificationService } from '../../services/community/comm-qualifications.service'
import {recordPass,recordFail,printModuleSummary} from '../../utils/module-tracker'

const MODULE = 'Comm Qualifications'

test.describe.serial('Comm Qualification API', () => {
  let createdId: string
  let qualName: string

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
  // 1️⃣ CREATE
  // =====================================
  test('create qualification', async ({ api }) => {
    const service = new CommQualificationService(api)

    qualName = `API_QUAL`

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

    markPassed('qualification created')
  })

  // =====================================
  // 2️⃣ GET ALL
  // =====================================
  test('get qualifications', async ({ api }) => {
    const service = new CommQualificationService(api)

    const res = await service.getAllQualifications()
    expect(res.status()).toBe(200)

    markPassed('get qualifications')
  })

  // =====================================
  // 3️⃣ GET BY ID
  // =====================================
  test('get qualification by id', async ({ api }) => {
    const service = new CommQualificationService(api)

    const res = await service.getQualificationById(createdId)
    expect(res.status()).toBe(200)

    markPassed('get qualification by id')
  })

  // =====================================
  // 4️⃣ PUT
  // =====================================
  test('update qualification', async ({ api }) => {
    const service = new CommQualificationService(api)

    const res = await service.updateQualification({
      quId: createdId,
      quName: `${qualName}_Updated`,
      wfCode: 'NQF5',
      errorMessage: 'string'
    })

    expect(res.status()).toBe(200)

    markPassed('put update qualification')
  })

  // =====================================
  // 5️⃣ TEMPLATE
  // =====================================
  test('get qualification template', async ({ api }) => {
    const service = new CommQualificationService(api)

    const res = await service.getTemplate()
    expect(res.status()).toBe(200)

    markPassed('template fetch qualification')
  })

  // =====================================
  // 6️⃣ DELETE
  // =====================================
  test('delete qualification', async ({ api }) => {
    const service = new CommQualificationService(api)

    const res = await service.deleteQualification(createdId)
    expect(res.status()).toBe(200)

    markPassed('delete qualification')
  })

  // =====================================
  // MODULE SUMMARY
  // =====================================
  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})