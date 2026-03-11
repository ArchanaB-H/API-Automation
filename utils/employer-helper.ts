import { EmployersService } from '../services/Employers/employers.service'

let employerId: string | null = null

const EMPLOYER_NAME = 'Archana_API'

export async function getOrCreateEmployer(api: any): Promise<string> {

  // If already created in this run
  if (employerId !== null) {
    return employerId
  }

  const service = new EmployersService(api)

  //  Get all employers
  const res = await service.getAll('EDU')
  const body = await res.json()

  const employers = body.result || []

  //  Find employer with same name
  const existing = employers.find(
    (e: any) => e.name === EMPLOYER_NAME
  )

  if (existing) {

    employerId = existing.erId || existing.id

    return employerId as string
  }

  //  Create employer if not found
  const createRes = await service.create({
    name: EMPLOYER_NAME,
    addr1: 'API',
    addr2: 'string',
    addr3: 'string',
    addr4: 'string',
    postcode: '577204',
    creBy: 0,
    creDate: new Date().toISOString(),
    amdBy: 0,
    amdDate: new Date().toISOString(),
    isDeleted: false,
    sectorId: 'EDU',
    reference: 'string',
    regionId: 'ENG',
    goLiveDate: '2026-03-04',
    status: 0,
    logoName: 'logo.jpg',
    logoCnt: 0,
    uploadFile: 'string'
  })

  const createBody = await createRes.json()

  employerId = createBody.result

  return employerId as string
}