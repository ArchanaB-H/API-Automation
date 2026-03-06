import { test, expect } from '../../fixtures/api-fixture'
import { CommJobRolesService } from '../../services/community/comm-job-roles.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Job Roles'
const cleanup = new CleanupHelper()

test.describe.serial('Comm Job Roles API', () => {

  let createdJobRoleId: string
  let jrName: string
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
  test('create job role', async ({ api }) => {

    const service = new CommJobRolesService(api)

    jrName = `API_JR_${Date.now()}`

    const res = await service.createJobRole([
      {
        jrName,
        wfcPost: 'APP',
        wfcRole: 'BEHM'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    createdJobRoleId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!createdJobRoleId || deleted) return
      await service.deleteJobRole(createdJobRoleId)
    })

    recordPass(MODULE)
  })

  // =====================================
  // GET ALL
  // =====================================
  test('get job roles', async ({ api }) => {

    const service = new CommJobRolesService(api)

    const res = await service.getAllJobRoles()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // GET BY ID
  // =====================================
  test('get job role by id', async ({ api }) => {

    const service = new CommJobRolesService(api)

    const res = await service.getJobRoleById(createdJobRoleId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // UPDATE
  // =====================================
  test('update job role', async ({ api }) => {

    const service = new CommJobRolesService(api)

    const updatedName = `${jrName}_UPDATED`

    const res = await service.updateJobRole(createdJobRoleId, {
      jrId: createdJobRoleId,
      jrName: updatedName,
      wfcPost: 'OSP',
      wfcRole: 'ADMC'
    })

    expect(res.status()).toBe(200)

    jrName = updatedName

    recordPass(MODULE)
  })

  // =====================================
  // TEMPLATE
  // =====================================
  test('get job role template', async ({ api }) => {

    const service = new CommJobRolesService(api)

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // DELETE (Primary)
  // =====================================
  test('delete job role', async ({ api }) => {

    const service = new CommJobRolesService(api)

    const res = await service.deleteJobRole(createdJobRoleId)

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