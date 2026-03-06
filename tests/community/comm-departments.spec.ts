import { test, expect } from '../../fixtures/api-fixture'
import { CommDepartmentsService } from '../../services/community/comm-departments.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Departments'
const cleanup = new CleanupHelper()

test.describe.serial('Comm Departments API', () => {

  let createdDeptId: string
  let deptName: string
  let deleted = false

  // =============================
  // FAILURE TRACKER
  // =============================
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
      console.log(`❌ ${testInfo.title} — failed`)
    }
  })


  // =============================
  // CREATE
  // =============================
  test('create department', async ({ api }) => {

    const service = new CommDepartmentsService(api)

    deptName = `API_DEPT_${Date.now()}`

    const res = await service.createDepartment([
      { deptName }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    createdDeptId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!createdDeptId || deleted) return
      await service.deleteDepartment(createdDeptId)
    })

    recordPass(MODULE)
  })


  // =============================
  // GET ALL
  // =============================
  test('get departments', async ({ api }) => {

    const service = new CommDepartmentsService(api)

    const res = await service.getAllDepartments()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // GET BY ID
  // =============================
  test('get department by id', async ({ api }) => {

    const service = new CommDepartmentsService(api)

    const res = await service.getDepartmentById(createdDeptId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // UPDATE
  // =============================
  test('update department', async ({ api }) => {

    const service = new CommDepartmentsService(api)

    const updatedName = `${deptName}_UPDATED`

    const res = await service.updateDepartment({
      deptId: createdDeptId,
      deptName: updatedName
    })

    expect(res.status()).toBe(200)

    deptName = updatedName

    recordPass(MODULE)
  })


  // =============================
  // TEMPLATE
  // =============================
  test('get department template', async ({ api }) => {

    const service = new CommDepartmentsService(api)

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // DELETE (Primary)
  // =============================
  test('delete department', async ({ api }) => {

    const service = new CommDepartmentsService(api)

    const res = await service.deleteDepartment(createdDeptId)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)
  })


  // =============================
  // CLEANUP (Fallback)
  // =============================
  test.afterAll(async () => {

    printModuleSummary(MODULE)

    await cleanup.runAll(MODULE)

  })

})