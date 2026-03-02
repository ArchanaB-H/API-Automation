import { test, expect } from '../../fixtures/api-fixture'
import { CommGradesService } from '../../services/community/comm-gradesets.service'
import path from 'path'
import {
  recordPass,
  recordFail,
  printModuleSummary
} from '../../utils/module-tracker'

const MODULE = 'Comm Grades'

test.describe('Community Grades API', () => {
  let service: CommGradesService
  let gradeSetId: string
  let gradeNo: number
  let gradeName: string

  test.beforeAll(async ({ api }) => {
    service = new CommGradesService(api)
  })

  // =============================
  // ⭐ GRADE SETS
  // =============================

  test('create grade set', async () => {
    const res = await service.createGradeSet([
      {
        gsName: `GS_API`,
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

    recordPass(MODULE)
  })

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

  test('update grade set', async () => {
    const res = await service.updateGradeSet(gradeSetId, {
      gsId: gradeSetId,
      gsName: `GS_UPDATED_API`,
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
    recordPass(MODULE)
  })

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

  test('upload grade set logo', async () => {
    const logoPath = path.resolve('test-data/payscale-logo.jpg')
    const res = await service.uploadLogo(gradeSetId, logoPath)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  test('get grade set logo', async () => {
    const res = await service.getLogo(gradeSetId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

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
  // ⭐ GRADES CRUD
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
    const res = await service.getGradeByNo(
      gradeSetId,
      gradeNo
    )
    expect([200, 404]).toContain(res.status())
    recordPass(MODULE)
  })

  test('export grades', async () => {
    const res = await service.exportGrades(gradeSetId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  // =============================
  // ⭐ DELETE LAST
  // =============================

  test('delete grade set', async () => {
    const res = await service.deleteGradeSet(gradeSetId)
    expect(res.status()).toBe(200)
    recordPass(MODULE)
  })

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }
  })

  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})