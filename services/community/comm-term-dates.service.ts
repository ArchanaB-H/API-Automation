import { ApiClient } from '../../utils/api-client'

export class CommTermDatesService {
  constructor(private api: ApiClient) {}

  // =====================================================
  //  TERM DATE SETS
  // =====================================================

  async createSet(body: any) {
    return this.api.post('/community/termdatesets', body)
  }

  async getSets() {
    return this.api.get('/community/termdatesets')
  }

  async getSetById(id: string) {
    return this.api.get(`/community/termdatesets/${id}`)
  }

  async updateSet(id: string, body: any) {
    return this.api.put(`/community/termdatesets/${id}`, body)
  }

  async deleteSet(id: string) {
    return this.api.delete(`/community/termdatesets/${id}`)
  }

  async archiveSet(id: string) {
    return this.api.patch(`/community/termdatesets/${id}/archive`)
  }

  async unarchiveSet(id: string) {
    return this.api.patch(`/community/termdatesets/${id}/unarchive`)
  }

  async getArchivedSets() {
    return this.api.get('/community/termdatesets/archived')
  }

  async uploadSetLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/termdatesets/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getSetLogo(id: string) {
    return this.api.get(`/community/termdatesets/${id}/logo`)
  }

  async getSetTemplate() {
    return this.api.get('/community/termdatesets/template')
  }

  // =====================================================
  //  TERM DATES (child)
  // =====================================================

  async getTermDates(setId: string) {
    return this.api.get(`/CommTermDate?Id=${setId}`)
  }

  async createTermDates(setId: string, body: any) {
    return this.api.post(`/CommTermDate?Id=${setId}`, body)
  }

  async exportTermDates(setId: string) {
    return this.api.get(`/CommTermDate/${setId}/export`)
  }

  async deleteTermDates(setId: string) {
    return this.api.delete(`/CommTermDate/${setId}`)
  }
}