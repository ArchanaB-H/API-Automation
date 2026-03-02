import { ApiClient } from '../../utils/api-client'

export class CommSkillsService {
  constructor(private api: ApiClient) {}

  // POST
  async createSkill(payload: any[]) {
    return this.api.post('/community/skills', payload)
  }

  // GET ALL
  async getAllSkills() {
    return this.api.get('/community/skills')
  }

  // GET BY ID
  async getSkillById(skillId: string) {
    return this.api.get(`/community/skills/${skillId}`)
  }

  // PUT
  async updateSkill(payload: any) {
    return this.api.put('/community/skills', payload)
  }

  // DELETE (query param)
  async deleteSkill(skillId: string) {
    return this.api.delete(`/community/skills?skillId=${skillId}`)
  }

  // TEMPLATE
  async getTemplate() {
    return this.api.get('/community/skills/template')
  }
}