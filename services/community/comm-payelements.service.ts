import { ApiClient } from '../../utils/api-client'

export class CommPayElementService {
  constructor(private api: ApiClient) {}

  // ✅ POST
  async createPayElement(payload: any[]) {
    return this.api.post('/community/payelement', payload)
  }

  // ✅ GET ALL
  async getAllPayElements() {
    return this.api.get('/community/payelement')
  }

  // ✅ GET BY ID
  async getPayElementById(id: string) {
    return this.api.get(`/community/payelement/${id}`)
  }

  // ✅ PUT
  async updatePayElement(id: string, payload: any) {
    return this.api.put(`/community/payelement/${id}`, payload)
  }

  // ✅ DELETE
  async deletePayElement(id: string) {
    return this.api.delete(`/community/payelement/${id}`)
  }

  // ✅ TEMPLATE
  async getTemplate() {
    return this.api.get('/community/payelement/template')
  }
}