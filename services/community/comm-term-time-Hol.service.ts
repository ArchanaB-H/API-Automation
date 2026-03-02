import { ApiClient } from '../../utils/api-client'

export class CommTermTimeService {
  constructor(private api: ApiClient) {}

  // =============================
  // ⭐ MAIN
  // =============================

  async create(body: any) {
    return this.api.post('/community/term-time-only', body)
  }

  async getAll() {
    return this.api.get('/community/term-time-only')
  }

  async getById(id: string) {
    return this.api.get(`/community/term-time-only/${id}`)
  }

  async update(id: string, body: any) {
    return this.api.put(`/community/term-time-only/${id}`, body)
  }

  async delete(id: string) {
    return this.api.delete(`/community/term-time-only/${id}`)
  }

  async archive(id: string) {
    return this.api.patch(`/community/term-time-only/${id}/archive`)
  }

  async unarchive(id: string) {
    return this.api.patch(`/community/term-time-only/${id}/unarchive`)
  }

  async export(id: string) {
    return this.api.get(`/community/term-time-only/${id}/export`)
  }

  // =============================
  // ⭐ DETAILS
  // =============================

  async getDetails(id: string) {
    return this.api.get(`/community/term-time-only/${id}/details`)
  }

  async getCards() {
    return this.api.get('/community/term-time-only/cards')
  }

  // =============================
  // ⭐ LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/term-time-only/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/term-time-only/${id}/logo`)
  }

  // =============================
  // ⭐ TEMPLATE
  // =============================

  async getTemplate() {
    return this.api.get('/community/term-time-only/template')
  }
}