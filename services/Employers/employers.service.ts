import { ApiClient } from '../../utils/api-client'

export class EmployersService {
  constructor(private api: ApiClient) {}

  // =============================
  // GET ALL
  // =============================
  async getAll(sectorId?: string) {
    let url = '/employers'
    if (sectorId) url += `?sectorId=${sectorId}`
    return this.api.get(url)
  }

  // =============================
  // CREATE
  // =============================
  async create(data: any) {
    return this.api.post('/employers', data)
  }

  // =============================
  // GET BY ID
  // =============================
  async getById(erId: string) {
    return this.api.get(`/employers/${erId}`)
  }

  // =============================
  // UPDATE
  // =============================
  async update(data: any) {
    return this.api.put('/employers', data)
  }

  // =============================
  // DELETE
  // =============================
  async delete(erId: string) {
    return this.api.delete(`/employers?employerId=${erId}`)
  }

  // =============================
  // UPLOAD LOGO
  // =============================
  async uploadLogo(erId: string, filePath: string) {
    return this.api.postFormData(
      `/employers/logo?employerId=${erId}`,
      filePath
    )
  }

  // =============================
  // GET LOGO
  // =============================
  async getLogo(erId: string) {
    return this.api.get(`/employers/${erId}/logo`)
  }
}