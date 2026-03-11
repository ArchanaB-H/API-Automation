import { ApiClient } from '../../utils/api-client'

export class EmployerQualificationService {

  constructor(private api: ApiClient) {}

  // GET ALL
  async getQualifications(employerId: string) {
    return this.api.get(`/employers/${employerId}/qualifications`)
  }

  // CREATE
  async createQualification(employerId: string, body: any) {
    return this.api.post(`/employers/${employerId}/qualifications`, body)
  }

  // GET BY ID
  async getQualificationById(employerId: string, id: string) {
    return this.api.get(`/employers/${employerId}/qualifications/${id}`)
  }

  // UPDATE
  async updateQualification(employerId: string, body: any) {
    return this.api.put(`/employers/${employerId}/qualifications`, body)
  }

  // DELETE
  async deleteQualification(employerId: string, id: string) {
    return this.api.delete(`/employers/${employerId}/qualifications?id=${id}`)
  }

  // TEMPLATE DOWNLOAD
  async getQualificationTemplate(employerId: string) {
    return this.api.get(`/employers/${employerId}/qualifications/template`)
  }

}