import { ApiClient } from '../../utils/api-client'

export class EmployerSkillsService {
  constructor(private api: ApiClient) {}

  // =============================
  // GET ALL
  // =============================
  async getSkills(employerId: string) {
    return this.api.get(`/employers/${employerId}/skills`)
  }

  // =============================
  // CREATE
  // =============================
  async createSkill(employerId: string, body: any) {
    return this.api.post(`/employers/${employerId}/skills`, body)
  }

  // =============================
  // GET BY ID
  // =============================
  async getSkillById(employerId: string, skillId: string) {
    return this.api.get(`/employers/${employerId}/skills/${skillId}`)
  }

  // =============================
  // UPDATE
  // =============================
  async updateSkill(employerId: string, body: any) {
    return this.api.put(`/employers/${employerId}/skills`, body)
  }

  // =============================
  // DELETE
  // =============================
  async deleteSkill(employerId: string, skillId: string) {
    return this.api.delete(`/employers/${employerId}/skills/${skillId}`)
  }

  // =============================
  // TEMPLATE
  // =============================
  async getSkillTemplate(employerId: string) {
    return this.api.get(`/employers/${employerId}/skills/template`)
  }

  // =============================
  // SKILL LOOKUP
  // =============================
  async getSkillLookup(employerId: string) {
    return this.api.get(`/employers/${employerId}/skills/skilllookup`)
  }
}