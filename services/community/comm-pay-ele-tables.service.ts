import { ApiClient } from '../../utils/api-client'

export class CommPayElementTableService {
  constructor(private api: ApiClient) {}

  // =============================
  //  TABLE
  // =============================

  async create(body: any) {
    return this.api.post('/community/pay-element-tables', body)
  }

  async getAll() {
    return this.api.get('/community/pay-element-tables')
  }

  async update(id: string, body: any) {
    return this.api.put(`/community/pay-element-tables/${id}`, body)
  }

  async delete(id: string) {
    return this.api.delete(`/community/pay-element-tables/${id}`)
  }

  async archive(id: string) {
    return this.api.patch(`/community/pay-element-tables/${id}/archive`)
  }

  async unarchive(id: string) {
    return this.api.patch(`/community/pay-element-tables/${id}/unarchive`)
  }

  async export(id: string) {
    return this.api.get(`/community/pay-element-tables/${id}/export`)
  }

  // =============================
  //  ITEMS
  // =============================

  async getItems(id: string) {
    return this.api.get(`/community/pay-element-tables/${id}/items`)
  }

  

  // =============================
  //  LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/pay-element-tables/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/pay-element-tables/${id}/logo`)
  }

  // =============================
  //  TEMPLATE
  // =============================

  async getTemplate(typeId: number) {
    return this.api.get(
      `/community/pay-element-tables/template/${typeId}`
    )
  }
}