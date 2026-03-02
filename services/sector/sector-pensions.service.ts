import { ApiClient } from '../../utils/api-client'

export class PensionService {
  constructor(private api: ApiClient) {}

  // =====================================================
  // ⭐ RATE TABLES
  // =====================================================

  async getRateTables() {
    return this.api.get('/pension/rate-tables')
  }

  async getRateTableById(rtId: string) {
    return this.api.get(`/pension/rate-tables/${rtId}`)
  }

  async createRateTable(body: any) {
    return this.api.post('/pension/rate-tables', body)
  }

  async updateRateTable(rtId: string, body: any) {
    return this.api.put(
      `/pension/rate-tables?rtId=${rtId}`,
      body
    )
  }

  async renameRateTable(rtId: string, name: string) {
    return this.api.put(
      `/pension/rate-tables/${rtId}?rateTableName=${name}`,
      {}
    )
  }

  async deleteRateTable(rtId: string) {
    return this.api.delete(`/pension/rate-tables/${rtId}`)
  }

  async getRateBands(rtId: string, date: string) {
    return this.api.get(
      `/pension/rate-tables/${rtId}/bands?date=${date}`
    )
  }

  async deleteRateTableDate(rtId: string, date: string) {
    return this.api.delete(
      `/pension/rate-tables/${rtId}/dates?date=${date}`
    )
  }

  async getRateTableLookup() {
    return this.api.get('/pension/rate-tables/lookup')
  }

  // =====================================================
  // ⭐ PENSION FUNDS
  // =====================================================

  async getFunds() {
    return this.api.get('/pension')
  }

  async getFundById(id: string) {
    return this.api.get(`/pension/${id}`)
  }

  async createFund(body: any) {
    return this.api.post('/pension', body)
  }

  async updateFund(id: string, body: any) {
    return this.api.put(`/pension?pfId=${id}`, body)
  }

  async renameFund(id: string, name: string) {
    return this.api.put(`/pension/${id}?fundName=${name}`, {})
  }

  async deleteFund(id: string) {
    return this.api.delete(`/pension/${id}`)
  }

  // =====================================================
  // ⭐ ADDITIONAL CONTRIBUTIONS
  // =====================================================

  async getAdditionalContributions() {
    return this.api.get('/pension/additional-contributions')
  }

  async getAdditionalContributionById(id: string) {
    return this.api.get(
      `/pension/additional-contributions/${id}`
    )
  }

  async createAdditionalContribution(body: any) {
    return this.api.post(
      '/pension/additional-contributions',
      body
    )
  }

  async updateAdditionalContribution(
    id: string,
    body: any
  ) {
    return this.api.put(
      `/pension/additional-contributions/${id}`,
      body
    )
  }

  async deleteAdditionalContribution(id: string) {
    return this.api.delete(
      `/pension/additional-contributions/${id}`
    )
  }
}