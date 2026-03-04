import { ApiClient } from '../../utils/api-client'

export class CommFamilyLeavePolicyService {
  constructor(private api: ApiClient) {}

  // =============================
  //  MAIN CRUD
  // =============================

  async create(body: any) {
    return this.api.post('/community/family-leave-policy', body)
  }

  async getAll() {
    return this.api.get('/community/family-leave-policy')
  }

  async getById(id: string) {
    return this.api.get(`/community/family-leave-policy/${id}`)
  }

  async update(id: string, body: any) {
    return this.api.put(`/community/family-leave-policy/${id}`, body)
  }

  async delete(id: string) {
    return this.api.delete(`/community/family-leave-policy/${id}`)
  }

  // =============================
  //  EXTRA ENDPOINTS
  // =============================

  async getByType(typeId: number) {
    return this.api.get(`/community/family-leave-policy/type/${typeId}`)
  }

  async archive(id: string) {
    return this.api.patch(`/community/family-leave-policy/${id}/archive`)
  }

  async unarchive(id: string) {
    return this.api.patch(`/community/family-leave-policy/${id}/unarchive`)
  }

  async export(id: string) {
    return this.api.get(`/community/family-leave-policy/${id}/export`)
  }

  // =============================
  //  LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/family-leave-policy/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/family-leave-policy/${id}/logo`)
  }

  // =============================
  //  TEMPLATE
  // =============================

  async getTemplate() {
    return this.api.get('/community/family-leave-policy/template')
  }
}