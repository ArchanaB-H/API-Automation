import { ApiClient } from '../../utils/api-client'

export class CommQualificationService {
  constructor(private api: ApiClient) {}

  // ✅ POST
  async createQualification(payload: any[]) {
    return this.api.post('/community/qualifications', payload)
  }

  // ✅ GET ALL
  async getAllQualifications() {
    return this.api.get('/community/qualifications')
  }

  // ✅ GET BY ID
  async getQualificationById(id: string) {
    return this.api.get(`/community/qualifications/${id}`)
  }

  // ✅ PUT
  async updateQualification(payload: any) {
    return this.api.put('/community/qualifications', payload)
  }

  // ✅ DELETE
  async deleteQualification(id: string) {
    return this.api.delete(`/community/qualifications?id=${id}`)
  }

  // ✅ TEMPLATE
  async getTemplate() {
    return this.api.get('/community/qualifications/template')
  }
}