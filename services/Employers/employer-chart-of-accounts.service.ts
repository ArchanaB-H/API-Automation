import { ApiClient } from '../../utils/api-client'

export class EmployerChartOfAccountsService {

  constructor(private api: ApiClient) {}

  // =============================
  // LEDGER CODES
  // =============================

  async getLedgerCodes(employerId: string) {
    return this.api.get(`/employers/${employerId}/ledgercodes`)
  }

  async getLedgerCodeById(employerId: string, legId: string) {
    return this.api.get(`/employers/${employerId}/ledgercodes/${legId}`)
  }

  async createLedgerCodes(employerId: string, body: any) {
    return this.api.post(`/employers/${employerId}/ledgercodes`, body)
  }

  async updateLedgerCodes(employerId: string, body: any) {
    return this.api.put(`/employers/${employerId}/ledgercodes`, body)
  }

 /* async deleteLedgerCodes(employerId: string, ids: string[]) {
  return this.api.deleteWithBody(
    `/v1/employers/${employerId}/ledgercodes`,
    ids
  )
} */

 /*  async deleteLedgerCodes(employerId: string, ids: string[]) {
  return this.api.deleteWithBody(
    `/employers/${employerId}/ledgercodes`,
    ids
  )
} */
async deleteLedgerCodes(employerId: string, ids: string[]) {
  return this.api.deleteWithBody(
    `/employers/${employerId}/ledgercodes`,
    ids
  )
}

  async getLedgerTemplate(employerId: string) {
    return this.api.get(`/employers/${employerId}/ledgercodes/template`)
  }


  // =============================
  // COST CENTRE
  // =============================

  async getCostCentres(employerId: string) {
    return this.api.get(`/employers/${employerId}/costcentre`)
  }

  async getCostCentreById(employerId: string, id: string) {
    return this.api.get(`/employers/${employerId}/costcentre/${id}`)
  }

  async createCostCentres(employerId: string, body: any) {
    return this.api.post(`/employers/${employerId}/costcentre`, body)
  }

  async updateCostCentre(employerId: string, body: any) {
    return this.api.put(`/employers/${employerId}/costcentre`, body)
  }

  async deleteCostCentre(employerId: string, id: string) {
    return this.api.delete(`/employers/${employerId}/costcentre?costCentreId=${id}`)
  }


  // =============================
  // FUND CODES
  // =============================

  async getFundCodes(employerId: string) {
    return this.api.get(`/employers/${employerId}/fundcodes`)
  }

  async getFundCodeById(employerId: string, id: string) {
    return this.api.get(`/employers/${employerId}/fundcodes/${id}`)
  }

  async createFundCodes(employerId: string, body: any) {
    return this.api.post(`/employers/${employerId}/fundcodes`, body)
  }

  async updateFundCodes(employerId: string, body: any) {
    return this.api.put(`/employers/${employerId}/fundcodes`, body)
  }

  async deleteFundCodes(employerId: string, ids: string[]) {
  return this.api.deleteWithBody(
    `/employers/${employerId}/fundcodes`,
    ids
  )
}

}