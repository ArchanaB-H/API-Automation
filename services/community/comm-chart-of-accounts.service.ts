import { ApiClient } from '../../utils/api-client'

export class CommChartOfAccountsService {
  constructor(private api: ApiClient) {}

  // =============================
  //  CHART OF ACCOUNTS
  // =============================

  async create(body: any) {
    return this.api.post('/community/chart-of-accounts', body)
  }

  async getAll() {
    return this.api.get('/community/chart-of-accounts')
  }

  async update(body: any) {
    return this.api.put('/community/chart-of-accounts', body)
  }

  async archive(id: string) {
    return this.api.patch(`/community/chart-of-accounts?id=${id}`)
  }

  async unarchive(id: string) {
    return this.api.patch(
      `/community/chart-of-accounts/unarchieve?id=${id}`
    )
  }

  async getArchived() {
    return this.api.get('/community/chart-of-accounts/archieved')
  }

  async delete(id: string) {
    return this.api.delete(`/community/chart-of-accounts/${id}`)
  }

  // =============================
  //  LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/chart-of-accounts/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/chart-of-accounts/${id}/logo`)
  }

  // =============================
  //  TEMPLATE
  // =============================

  async getTemplate() {
    return this.api.get('/community/chart-of-accounts/template')
  }

  // =============================
  //  ITEMS
  // =============================

  async getItems(caId: string) {
    return this.api.get(
      `/community/chart-of-accounts/${caId}/details`
    )
  }

  async createItems(caId: string, body: any) {
    return this.api.post(
      `/community/chart-of-accounts/${caId}/details`,
      body
    )
  }

  async getItemByNo(caId: string, ciNo: number) {
    return this.api.get(
      `/community/chart-of-accounts/${caId}/details/CommChartOfAccountsItemByNo/${ciNo}`
    )
  }

  async exportItems(caId: string) {
    return this.api.get(
      `/community/chart-of-accounts/${caId}/details/export`
    )
  }
}