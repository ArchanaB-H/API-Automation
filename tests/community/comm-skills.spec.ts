import { test, expect } from '../../fixtures/api-fixture'
import { CommSkillsService } from '../../services/community/comm-skills.service'
import { recordPass, recordFail, printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Comm Skills'
const cleanup = new CleanupHelper()

test.describe.serial('Comm Skills API', () => {

  let createdSkillId: string
  let skillName: string
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
  test('create skill', async ({ api }) => {

    const service = new CommSkillsService(api)

    skillName = `API_Skill_${Date.now()}`

    const res = await service.createSkill([
      {
        skName: skillName,
        skDesc: 'API random desc',
        isHide: false
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    createdSkillId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!createdSkillId || deleted) return
      await service.deleteSkill(createdSkillId)
    })

    recordPass(MODULE)
  })

  // =====================================
  // GET ALL
  // =====================================
  test('get skills', async ({ api }) => {

    const service = new CommSkillsService(api)

    const res = await service.getAllSkills()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // GET BY ID
  // =====================================
  test('get by id', async ({ api }) => {

    const service = new CommSkillsService(api)

    const res = await service.getSkillById(createdSkillId)

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // UPDATE
  // =====================================
  test('update skill', async ({ api }) => {

    const service = new CommSkillsService(api)

    const updatedName = `${skillName}_UPDATED`

    const res = await service.updateSkill({
      skId: createdSkillId,
      skName: updatedName,
      skDesc: 'updated API skill desc',
      isHide: false
    })

    expect(res.status()).toBe(200)

    skillName = updatedName

    recordPass(MODULE)
  })

  // =====================================
  // TEMPLATE
  // =====================================
  test('get template', async ({ api }) => {

    const service = new CommSkillsService(api)

    const res = await service.getTemplate()

    expect(res.status()).toBe(200)

    recordPass(MODULE)
  })

  // =====================================
  // DELETE (Primary)
  // =====================================
  test('delete skill', async ({ api }) => {

    const service = new CommSkillsService(api)

    const res = await service.deleteSkill(createdSkillId)

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