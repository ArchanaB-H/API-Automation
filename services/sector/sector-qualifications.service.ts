import { ApiClient } from '../../utils/api-client'

export class QualificationService {
  constructor(private api: ApiClient) {}

  // =============================
  //  MAIN CRUD
  // =============================

  async getAll(employerId: string) {
    return this.api.get(
      `/employers/${employerId}/qualifications`
    )
  }

  async getById(employerId: string, id: string) {
    return this.api.get(
      `/employers/${employerId}/qualifications/${id}`
    )
  }

  async create(employerId: string, body: any[]) {
    return this.api.post(
      `/employers/${employerId}/qualifications`,
      body
    )
  }

  async update(employerId: string, body: any) {
    return this.api.put(
      `/employers/${employerId}/qualifications`,
      body
    )
  }

  async delete(employerId: string, id: string) {
    return this.api.delete(
      `/employers/${employerId}/qualifications?id=${id}`
    )
  }

  // =============================
  //  TEMPLATE
  // =============================

  async getTemplate(employerId: string) {
    return this.api.get(
      `/employers/${employerId}/qualifications/template`
    )
  }

  // (optional future)
  async getAuditLogs(employerId: string) {
    return this.api.get(
      `/employers/${employerId}/qualifications/audit-logs`
    )
  }

  async getAuditLogById(employerId: string, id: string) {
    return this.api.get(
      `/employers/${employerId}/qualifications/audit-logs/${id}`
    )
  }
}