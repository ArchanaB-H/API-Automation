import { ApiClient } from '../../utils/api-client'

export class PayPlanService {

  constructor(private api: ApiClient) {}

  async getAll(employerId: string) {
    return this.api.get(`/employers/${employerId}/pay-plan`)
  }

  async create(employerId: string, body: any) {
    return this.api.post(`/employers/${employerId}/pay-plan`, body)
  }

  async getById(employerId: string, id: string) {
    return this.api.get(`/employers/${employerId}/pay-plan/${id}`)
  }

  async update(employerId: string, id: string, body: any) {
    return this.api.put(`/employers/${employerId}/pay-plan/${id}`, body)
  }

  async delete(employerId: string, id: string) {
    return this.api.delete(`/employers/${employerId}/pay-plan/${id}`)
  }

}