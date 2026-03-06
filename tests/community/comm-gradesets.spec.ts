import { test, expect } from '../../fixtures/api-fixture'
import { CommGradesService } from '../../services/community/comm-gradesets.service'
import path from 'path'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Grades'
const cleanup = new CleanupHelper()

test.describe.serial('Community Grades API', () => {

  let service: CommGradesService
  let gradeSetId: string
  let gradeNo: number
  let gradeSetName: string
  let gradeName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new CommGradesService(api)
  })

  // =============================
  // CREATE GRADE SET
  // =============================
  test('create grade set', async () => {

    gradeSetName = `GS_API_${Date.now()}`

    const res = await service.createGradeSet([
      {
        gsName: gradeSetName,
        gsDesc: 'Created by Playwright',
        creBy: 0,
        creDate: new Date().toISOString(),
        uploadFile: null,
        amdBy: 0,
        amdDate: new Date().toISOString(),
        isHidden: false,
        logo: true,
        logoCnt: 0,
        logoUrl: 'string',
        logoExtension: '.jpg'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    gradeSetId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!gradeSetId || deleted) return
      await service.deleteGradeSet(gradeSetId)
    })

    recordPass(MODULE)
  })


  // =============================
  // GET GRADE SETS
  // =============================
  test('get grade sets', async () => {

    const res = await service.getGradeSets()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get grade set by id', async () => {

    const res = await service.getGradeSetById(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // UPDATE GRADE SET
  // =============================
  test('update grade set', async () => {

    const updatedName = `${gradeSetName}_UPDATED`

    const res = await service.updateGradeSet(gradeSetId, {
      gsId: gradeSetId,
      gsName: updatedName,
      gsDesc: 'Updated',
      creBy: 0,
      creDate: new Date().toISOString(),
      uploadFile: null,
      amdBy: 0,
      amdDate: new Date().toISOString(),
      isHidden: false,
      logo: true,
      logoCnt: 0,
      logoUrl: 'string',
      logoExtension: '.jpg'
    })

    expect(res.status()).toBe(200)

    gradeSetName = updatedName

    recordPass(MODULE)
  })


  // =============================
  // ARCHIVE
  // =============================
  test('archive grade set', async () => {

    const res = await service.archiveGradeSet(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('unarchive grade set', async () => {

    const res = await service.unarchiveGradeSet(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get archived grade sets', async () => {

    const res = await service.getArchivedGradeSets()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // LOGO
  // =============================
  test('upload grade set logo', async () => {

    const logoPath = path.resolve('test-data/logo.jpg')

    const res = await service.uploadLogo(gradeSetId, logoPath)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('get grade set logo', async () => {

    const res = await service.getLogo(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // TEMPLATE / EXPORT
  // =============================
  test('get grade template', async () => {

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('export grade set', async () => {

    const res = await service.exportGradeSet(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // GRADES CRUD
  // =============================
  test('get grades', async () => {

    const res = await service.getGrades(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('create grade', async () => {

    gradeName = `G_${Date.now()}`

    const res = await service.createGrade(gradeSetId, [
      {
        gname: gradeName,
        gpoints: '1,2',
        wfcCode: 'LP',
        wfcCodeDisplay: 'string',
        ordering: 0,
        creBy: 0,
        creDate: new Date().toISOString(),
        amdBy: 0,
        amdDate: new Date().toISOString(),
        validationError: 'string'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    gradeNo = body.result[0]

    recordPass(MODULE)
  })


  test('get grade by number', async () => {

    const res = await service.getGradeByNo(gradeSetId, gradeNo)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  test('export grades', async () => {

    const res = await service.exportGrades(gradeSetId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // DELETE (Primary)
  // =============================
  test('delete grade set', async () => {

    const res = await service.deleteGradeSet(gradeSetId)

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)
  })


  // =============================
  // FAILURE TRACKER
  // =============================
  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
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