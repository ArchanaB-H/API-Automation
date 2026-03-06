import { ApiClient } from '../../utils/api-client'

export class PayElementsService {

  constructor(private api: ApiClient) {}

  // =============================
  // CREATE PAY ELEMENT
  // =============================
  async createPayElement(employerId: string, body: unknown) {
    return this.api.post(`/employers/${employerId}/pay-elements`, body)
  }

  // =============================
  // GET ALL PAY ELEMENTS
  // =============================
  async getAllPayElements(employerId: string) {
    return this.api.get(`/employers/${employerId}/pay-elements`)
  }

  // =============================
  // GET PAY ELEMENT BY ID
  // =============================
  async getPayElementById(employerId: string, peId: string) {
    return this.api.get(`/employers/${employerId}/pay-elements/${peId}`)
  }

  // =============================
  // UPDATE PAY ELEMENT
  // =============================
  async updatePayElement(employerId: string, peId: string, body: unknown) {
    return this.api.put(`/employers/${employerId}/pay-elements/sector/${peId}`, body)
  }

  // =============================
  // ARCHIVE PAY ELEMENT
  // =============================
  async archivePayElement(employerId: string, peId: string) {
    return this.api.patch(`/employers/${employerId}/pay-elements/${peId}/archive`)
  }

  // =============================
  // UNARCHIVE PAY ELEMENT
  // =============================
  async unarchivePayElement(employerId: string, peId: string) {
    return this.api.patch(`/employers/${employerId}/pay-elements/${peId}/unarchive`)
  }

  // =============================
  // DELETE PAY ELEMENT
  // =============================
  async deletePayElement(employerId: string, peId: string) {
    return this.api.delete(`/employers/${employerId}/pay-elements/${peId}`)
  }

}