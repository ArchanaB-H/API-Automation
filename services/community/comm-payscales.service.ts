import { ApiClient } from '../../utils/api-client'

export class CommPayscalesService {
  constructor(private api: ApiClient) {}

  // =============================
  // ⭐ PAY SCALES
  // =============================

  async create(body: any) {
    return this.api.post('/community/payscales', body)
  }

  async getAll() {
    return this.api.get('/community/payscales')
  }

  async getById(id: string) {
    return this.api.get(`/community/payscales/${id}`)
  }

  async update(body: any) {
    return this.api.put('/community/payscales', body)
  }

   async delete(id: string) {
    return this.api.delete(`/community/payscales/${id}`)
  } 

  // ✅ NEW — archive (hide)
  async archive(id: string) {
    return this.api.patch(`/community/payscales/${id}/archive`)
  }

  // ✅ NEW — unarchive (unhide)
  async unarchive(id: string) {
    return this.api.patch(`/community/payscales/${id}/unarchive`)
  }

  // ✅ NEW — get archived list
  async getArchived() {
    return this.api.get('/community/payscales/archived')
  }

  // =============================
  // ⭐ LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/payscales/${id}/logo`,
      filePath,
      'file'
    )
  }

  // ✅ NEW — get logo URL
  async getLogo(id: string) {
    return this.api.get(`/community/payscales/${id}/logo`)
  }

  // =============================
  // ⭐ TEMPLATE & EXPORT
  // =============================

  async getTemplate() {
    return this.api.get('/community/payscales/template')
  }

  async exportPayscale(id: string) {
    return this.api.get(`/community/payscales/${id}/export`)
  }

  // =============================
  // ⭐ PAY SCALE POINTS
  // =============================

  async getPoints(payscaleId: string) {
    return this.api.get(
      `/community/payscale/${payscaleId}/details`
    )
  }

  async createPoints(payscaleId: string, body: any) {
    return this.api.post(
      `/community/payscale/${payscaleId}/details`,
      body
    )
  }

 
  async getPointByName(payscaleId: string, ptName: string) {
    return this.api.get(
      `/community/payscale/${payscaleId}/details/${ptName}`
    )
  }

  
  async exportPoints(payscaleId: string) {
    return this.api.get(
      `/community/payscale/${payscaleId}/details/export`
    )
  }
}