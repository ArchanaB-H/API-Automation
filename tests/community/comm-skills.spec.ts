import { test, expect } from '../../fixtures/api-fixture'
import { CommSkillsService } from '../../services/community/comm-skills.service'
import {recordPass,recordFail,printModuleSummary} from '../../utils/module-tracker'


const MODULE = 'Comm Skills'

test.describe.serial('Comm Skills API', () => {
  let createdSkillId: string
  let skillName: string


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
  test('create skill', async ({ api }) => {
    const service = new CommSkillsService(api)

    skillName = `API_Skill`

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

    markPassed('skill created')
  })

  // =====================================
  //  GET ALL
  // =====================================
  test('get skills', async ({ api }) => {
    const service = new CommSkillsService(api)

    const res = await service.getAllSkills()
    expect(res.status()).toBe(200)

    markPassed('get skills')
  })

  // =====================================
  //  GET BY ID
  // =====================================
  test('get by id', async ({ api }) => {
    const service = new CommSkillsService(api)

    const res = await service.getSkillById(createdSkillId)
    expect(res.status()).toBe(200)

    markPassed('get by id')
  })

  // =====================================
  //  PUT
  // =====================================
  test('update skill', async ({ api }) => {
    const service = new CommSkillsService(api)

    const res = await service.updateSkill({
      skId: createdSkillId,
      skName: `${skillName}_UPDATED`,
      skDesc: 'updated API skill desc',
      isHide: false
    })

    expect(res.status()).toBe(200)

    markPassed('put update')
  })

  // =====================================
  //  TEMPLATE
  // =====================================
  test('get template', async ({ api }) => {
    const service = new CommSkillsService(api)

    const res = await service.getTemplate()
    expect(res.status()).toBe(200)

    markPassed('template fetch')
  })

  // =====================================
  //  DELETE
  // =====================================
  test('delete skill', async ({ api }) => {
    const service = new CommSkillsService(api)

    const res = await service.deleteSkill(createdSkillId)
    expect(res.status()).toBe(200)

    markPassed('delete skill')
  })

  // =====================================
  // MODULE SUMMARY
  // =====================================
  test.afterAll(async () => {
    printModuleSummary(MODULE)
  })
})