import { ApiClient } from '../../utils/api-client'

export class CommSickLeavePolicyService {
  constructor(private api: ApiClient) {}

  // =============================
  //  MAIN CRUD
  // =============================

  async create(body: any) {
    return this.api.post('/community/sick-leave-policy', body)
  }

  async getAll() {
    return this.api.get('/community/sick-leave-policy')
  }

  async getById(id: string) {
    return this.api.get(`/community/sick-leave-policy/${id}`)
  }

  async update(id: string, body: any) {
    return this.api.put(`/community/sick-leave-policy/${id}`, body)
  }

  async delete(id: string) {
    return this.api.delete(`/community/sick-leave-policy/${id}`)
  }

  async archive(id: string) {
    return this.api.patch(`/community/sick-leave-policy/${id}/archive`)
  }

  async unarchive(id: string) {
    return this.api.patch(`/community/sick-leave-policy/${id}/unarchive`)
  }

  async export(id: string) {
    return this.api.get(`/community/sick-leave-policy/${id}/export`)
  }

  // =============================
  //  LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/sick-leave-policy/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/sick-leave-policy/${id}/logo`)
  }

  // =============================
  //  TEMPLATE
  // =============================

  async getTemplate() {
    return this.api.get('/community/sick-leave-policy/template')
  }
}