import { ApiClient } from '../../utils/api-client'

export class CommJobRolesService {
  constructor(private api: ApiClient) {}

  // ✅ POST
  async createJobRole(payload: any[]) {
    return this.api.post('/community/job-roles', payload)
  }

  // ✅ GET ALL
  async getAllJobRoles() {
    return this.api.get('/community/job-roles')
  }

  // ✅ GET BY ID
  async getJobRoleById(jobRoleId: string) {
    return this.api.get(`/community/job-roles/${jobRoleId}`)
  }

  // ✅ PUT
  async updateJobRole(jobRoleId: string, payload: any) {
    return this.api.put(`/community/job-roles/${jobRoleId}`, payload)
  }

  // ✅ DELETE
  async deleteJobRole(jobRoleId: string) {
    return this.api.delete(`/community/job-roles/${jobRoleId}`)
  }

  // ✅ TEMPLATE
  async getTemplate() {
    return this.api.get('/community/job-roles/template')
  }
}