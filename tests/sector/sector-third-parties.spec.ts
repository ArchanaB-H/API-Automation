import { test, expect } from '../../fixtures/api-fixture'
import { ThirdPartiesService } from '../../services/sector/sector-third-parties.service'
import {recordPass,recordFail,printModuleSummary } from '../../utils/module-tracker'
import { CleanupHelper } from '../../utils/cleanup-helper'

const MODULE = 'Third Parties'
const EMPLOYER_ID = '00000000-0000-0000-0000-000000000000'

const cleanup = new CleanupHelper()

test.describe.serial('Employers - Third Parties', () => {

  let service: ThirdPartiesService
  let tpId: string
  let tpName: string
  let deleted = false

  test.beforeAll(async ({ api }) => {
    service = new ThirdPartiesService(api)
  })

  // =====================================================
  // CREATE
  // =====================================================
  test('create third party', async () => {

    tpName = `API_TP_${Date.now()}`

    const res = await service.createThirdParty(EMPLOYER_ID, [
      {
        tpName: tpName,
        accNo: '64586234',
        sortcode: '712576',
        pdMethod: 1,
        payDate: 1,
        ref: 'api'
      }
    ])

    expect(res.status()).toBe(200)

    const body = await res.json()
    tpId = body.result[0]

    // fallback cleanup
    cleanup.add(async () => {
      if (!tpId || deleted) return
      await service.deleteThirdParty(EMPLOYER_ID, tpId)
    })

    recordPass(MODULE)

  })

  // =====================================================
  // GET LIST
  // =====================================================
  test('get third parties', async () => {

    const res = await service.getThirdParties(EMPLOYER_ID)

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =====================================================
  // GET BY ID
  // =====================================================
  test('get third party by id', async () => {

    const res = await service.getThirdPartyById(
      EMPLOYER_ID,
      tpId
    )

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =====================================================
  // UPDATE
  // =====================================================
  test('update third party', async () => {

    const updatedName = `${tpName}_UPDATED`

    const res = await service.updateThirdParty(
      EMPLOYER_ID,
      tpId,
      {
        tpId: tpId,
        tpName: updatedName,
        accNo: '16203203',
        sortcode: '891220',
        pdMethod: 0,
        payDate: 0,
        ref: 'updated',
        refCust: 'updated'
      }
    )

    expect(res.status()).toBe(200)

    tpName = updatedName

    recordPass(MODULE)

  })

  // =====================================================
  // ARCHIVE
  // =====================================================
  test('archive third party', async () => {

    const res = await service.archiveThirdParty(
      EMPLOYER_ID,
      tpId
    )

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =====================================================
  // UNARCHIVE
  // =====================================================
  test('unarchive third party', async () => {

    const res = await service.unarchiveThirdParty(
      EMPLOYER_ID,
      tpId
    )

    expect(res.status()).toBe(200)

    recordPass(MODULE)

  })

  // =====================================================
  // DELETE (Primary)
  // =====================================================
  test('delete third party', async () => {

    const res = await service.deleteThirdParty(
      EMPLOYER_ID,
      tpId
    )

    expect(res.status()).toBe(200)

    deleted = true

    recordPass(MODULE)

  })

  // =====================================================
  // FAILURE TRACKING
  // =====================================================
  test.afterEach(async ({}, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {

      recordFail(MODULE)

    }

  })

  // =====================================================
  // CLEANUP (Fallback)
  // =====================================================
  test.afterAll(async () => {

    printModuleSummary(MODULE)

    await cleanup.runAll(MODULE)

  })

})