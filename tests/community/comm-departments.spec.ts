import { test, expect } from '../../fixtures/api-fixture'
import { CommDepartmentsService } from '../../services/community/comm-departments.service'
import {recordPass,recordFail,printModuleSummary} from '../../utils/module-tracker'

const MODULE = 'Comm Departments'

test.describe.serial('Comm Departments API', () => {
  let createdDeptId: string
  let deptName: string

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

  // CREATE
  test('create department', async ({ api }) => {
    const service = new CommDepartmentsService(api)

    deptName = `API_DEPT`

    const res = await service.createDepartment([
      { deptName }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    createdDeptId = body.result[0]

    markPassed('department created')
  })

  // GET ALL
  test('get departments', async ({ api }) => {
    const service = new CommDepartmentsService(api)

    const res = await service.getAllDepartments()
    expect(res.status()).toBe(200)

    markPassed('get departments')
  })

  // GET BY ID
  test('get department by id', async ({ api }) => {
    const service = new CommDepartmentsService(api)

    const res = await service.getDepartmentById(createdDeptId)
    expect(res.status()).toBe(200)

    markPassed('get department by id')
  })

  // PUT
  test('update department', async ({ api }) => {
    const service = new CommDepartmentsService(api)

    const res = await service.updateDepartment({
      deptId: createdDeptId,
      deptName: `${deptName}_UPDATED`
    })

    expect(res.status()).toBe(200)

    markPassed('put update department')
  })

  // TEMPLATE
  test('get department template', async ({ api }) => {
    const service = new CommDepartmentsService(api)

    const res = await service.getTemplate()
    expect(res.status()).toBe(200)

    markPassed('template fetch department')
  })

  // DELETE
  test('delete department', async ({ api }) => {
    const service = new CommDepartmentsService(api)

    const res = await service.deleteDepartment(createdDeptId)
    expect(res.status()).toBe(200)

    markPassed('delete department')
  })

  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})