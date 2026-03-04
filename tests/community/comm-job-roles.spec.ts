import { test, expect } from '../../fixtures/api-fixture'
import { CommJobRolesService } from '../../services/community/comm-job-roles.service'
import {recordPass,recordFail,printModuleSummary} from '../../utils/module-tracker'


const MODULE = 'Comm Job Roles'

test.describe.serial('Comm Job Roles API', () => {
  let createdJobRoleId: string
  let jrName: string

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
  test('create job role', async ({ api }) => {
    const service = new CommJobRolesService(api)

    jrName = `API_JR`

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

    markPassed('job role created')
  })

  // =====================================
  //  GET ALL
  // =====================================
  test('get job roles', async ({ api }) => {
    const service = new CommJobRolesService(api)

    const res = await service.getAllJobRoles()
    expect(res.status()).toBe(200)

    markPassed('get job roles')
  })

  // =====================================
  //  GET BY ID
  // =====================================
  test('get job role by id', async ({ api }) => {
    const service = new CommJobRolesService(api)

    const res = await service.getJobRoleById(createdJobRoleId)
    expect(res.status()).toBe(200)

    markPassed('get job role by id')
  })

  // =====================================
  //  PUT
  // =====================================
  test('update job role', async ({ api }) => {
    const service = new CommJobRolesService(api)

    const res = await service.updateJobRole(createdJobRoleId, {
      jrId: createdJobRoleId,
      jrName: `${jrName}_Updated`,
      wfcPost: 'OSP',
      wfcRole: 'ADMC'
    })

    expect(res.status()).toBe(200)

    markPassed('put update job role')
  })

  // =====================================
  //  TEMPLATE
  // =====================================
  test('get job role template', async ({ api }) => {
    const service = new CommJobRolesService(api)

    const res = await service.getTemplate()
    expect(res.status()).toBe(200)

    markPassed('template fetch job role')
  })

  // =====================================
  //  DELETE
  // =====================================
  test('delete job role', async ({ api }) => {
    const service = new CommJobRolesService(api)

    const res = await service.deleteJobRole(createdJobRoleId)
    expect(res.status()).toBe(200)

    markPassed('delete job role')
  })

  // =====================================
  // MODULE SUMMARY
  // =====================================
  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})