import { ApiClient } from '../../utils/api-client'

export class CommDepartmentsService {
  constructor(private api: ApiClient) {}

  // POST
  async createDepartment(payload: any[]) {
    return this.api.post('/community/departments', payload)
  }

  // GET ALL
  async getAllDepartments() {
    return this.api.get('/community/departments')
  }

  // GET BY ID
  async getDepartmentById(deptId: string) {
    // Swagger shows both path + query — we keep both for safety
    return this.api.get(
      `/community/departments/${deptId}?id=${deptId}`
    )
  }

  // PUT
  async updateDepartment(payload: any) {
    return this.api.put('/community/departments', payload)
  }

  // DELETE (query param = id)
  async deleteDepartment(deptId: string) {
    return this.api.delete(
      `/community/departments?id=${deptId}`
    )
  }

  // TEMPLATE
  async getTemplate() {
    return this.api.get('/community/departments/template')
  }
}