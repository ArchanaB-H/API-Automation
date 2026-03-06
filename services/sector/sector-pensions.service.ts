import { ApiClient } from '../../utils/api-client'

export class PensionService {
  constructor(private api: ApiClient) {}

  // =====================================================
  //  RATE TABLES
  // =====================================================



  async createRateTable(body: any) {
    return this.api.post('/pension/rate-tables', body)
  }

  async getRateTables() {
    return this.api.get('/pension/rate-tables')
  }

  async getRateTableById(rtId: string) {
    return this.api.get(`/pension/rate-tables/${rtId}`)
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

  async getRateBands(rtId: string, date: string) {
    return this.api.get(
      `/pension/rate-tables/${rtId}/bands?date=${date}`
    )
  }

    async getRateTableLookup() {
    return this.api.get('/pension/rate-tables/lookup')
  }

  async deleteRateTableDate(rtId: string, date: string) {
    return this.api.delete(
      `/pension/rate-tables/${rtId}/dates?date=${date}`
    )
  }

  async deleteRateTable(rtId: string) {
    return this.api.delete(`/pension/rate-tables/${rtId}`)
  }

  // =====================================================
  //  PENSION FUNDS
  // =====================================================

  async createFund(body: any) {
    return this.api.post('/pension', body)
  }

  async getFunds() {
    return this.api.get('/pension')
  }

  async getFundById(id: string) {
    return this.api.get(`/pension/${id}`)
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
  //  ADDITIONAL CONTRIBUTIONS
  // =====================================================


  async createAdditionalContribution(body: any) {
    return this.api.post(
      '/pension/additional-contributions',
      body
    )
  }
  async getAdditionalContributions() {
    return this.api.get('/pension/additional-contributions')
  }

  async getAdditionalContributionById(id: string) {
    return this.api.get(
      `/pension/additional-contributions/${id}`
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