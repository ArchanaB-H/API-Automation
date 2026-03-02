import { ApiClient } from '../../utils/api-client'

export class CommPayBandService {
  constructor(private api: ApiClient) {}

  // =============================
  // ⭐ PAY BAND
  // =============================

  async create(body: any) {
    return this.api.post('/community/paybands', body)
  }

  async getAll() {
    return this.api.get('/community/paybands')
  }

  async getById(id: string) {
    return this.api.get(`/community/paybands/${id}`)
  }

  async update(id: string, body: any) {
    return this.api.put(`/community/paybands/${id}`, body)
  }

  async delete(id: string) {
    return this.api.delete(`/community/paybands/${id}`)
  }

  async archive(id: string) {
    return this.api.patch(`/community/paybands/${id}/archive`)
  }

  async unarchive(id: string) {
    return this.api.patch(`/community/paybands/${id}/unarchive`)
  }

  async export(id: string) {
    return this.api.get(`/community/paybands/${id}/export`)
  }

  async getTemplate() {
    return this.api.get('/community/paybands/template')
  }

  // =============================
  // ⭐ LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/paybands/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/paybands/${id}/logo`)
  }
}