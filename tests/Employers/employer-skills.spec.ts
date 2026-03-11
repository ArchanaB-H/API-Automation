import { test, expect } from '../../fixtures/api-fixture'
import { EmployerSkillsService } from '../../services/Employers/employer-skills.service'
import { CleanupHelper } from '../../utils/cleanup-helper'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { getOrCreateEmployer } from '../../utils/employer-helper'

const MODULE = 'Employer Skills'

test.describe.serial('Employer Skills API', () => {

  let service: EmployerSkillsService
  let employerId: string
  let skillId: string
  let skillName: string

  const cleanup = new CleanupHelper()

  test.beforeAll(async ({ api }) => {
    service = new EmployerSkillsService(api)
    employerId = await getOrCreateEmployer(api)
  })


  // =============================
  // GET ALL
  // =============================
  test('get skills', async () => {

    const res = await service.getSkills(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // CREATE
  // =============================
  test('create skill', async () => {

    skillName = `API_Skill_${Date.now()}`

    const body = [
      {
        skName: skillName,
        creBy: 0,
        creDate: new Date().toISOString(),
        amdBy: 0,
        amdDate: new Date().toISOString(),
        isDeleted: false
      }
    ]

    const res = await service.createSkill(employerId, body)

    expect(res.status()).toBe(200)

    const json = await res.json()
    skillId = json.result[0]

    cleanup.add(async () => {
      await service.deleteSkill(employerId, skillId)
    })

    recordPass(MODULE)
  })


  // =============================
  // GET BY ID
  // =============================
  test('get skill by id', async () => {

    const res = await service.getSkillById(employerId, skillId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // UPDATE
  // =============================
  test('update skill', async () => {

    const body = {
      skNo: 0,
      erNo: 0,
      skId: skillId,
      skName: `${skillName}_updated`,
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString(),
      isDeleted: false
    }

    const res = await service.updateSkill(employerId, body)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // TEMPLATE
  // =============================
  test('get skills template', async () => {

    const res = await service.getSkillTemplate(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // LOOKUP
  // =============================
  test('get skill lookup', async () => {

    const res = await service.getSkillLookup(employerId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // DELETE
  // =============================
  test('delete skill', async () => {

    const res = await service.deleteSkill(employerId, skillId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })


  // =============================
  // FAILURE TRACKING
  // =============================
  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
      recordFail(MODULE)
    }

  })


  // =============================
  // CLEANUP
  // =============================
  test.afterAll(async () => {

    await cleanup.runAll(MODULE)

    printModuleSummary(MODULE)

  })

})