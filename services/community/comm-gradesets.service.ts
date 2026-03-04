import { ApiClient } from '../../utils/api-client'

export class CommGradesService {
  constructor(private api: ApiClient) {}

  // =============================
  //  GRADE SETS
  // =============================

  async createGradeSet(body: any) {
    return this.api.post('/community/grades', body)
  }

  async getGradeSets() {
    return this.api.get('/community/grades')
  }

  async getGradeSetById(id: string) {
    return this.api.get(`/community/grades/${id}`)
  }

  async updateGradeSet(id: string, body: any) {
    return this.api.put(`/community/grades/${id}`, body)
  }

  async deleteGradeSet(id: string) {
    return this.api.delete(`/community/grades/${id}`)
  }

  async archiveGradeSet(id: string) {
    return this.api.patch(`/community/grades/${id}/archive`)
  }

  async unarchiveGradeSet(id: string) {
    return this.api.patch(`/community/grades/${id}/unarchive`)
  }

  async getArchivedGradeSets() {
    return this.api.get('/community/grades/archived')
  }

  // =============================
  //  LOGO
  // =============================

  async uploadLogo(id: string, filePath: string) {
    return this.api.postFormData(
      `/community/grades/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.api.get(`/community/grades/${id}/logo`)
  }

  // =============================
  //  TEMPLATE & EXPORT
  // =============================

  async getTemplate() {
    return this.api.get('/community/grades/template')
  }

  async exportGradeSet(id: string) {
    return this.api.get(`/community/grades/${id}/export`)
  }

  // =============================
  //  GRADES (DETAILS)
  // =============================

  async getGrades(gradeSetId: string) {
    return this.api.get(`/community/${gradeSetId}/details`)
  }

  async createGrade(gradeSetId: string, body: any) {
    return this.api.post(`/community/${gradeSetId}/details`, body)
  }

  async updateGrade(gradeSetId: string, body: any) {
    return this.api.put(`/community/${gradeSetId}/details`, body)
  }

  async getGradeByNo(gradeSetId: string, gNo: number) {
    return this.api.get(
      `/community/${gradeSetId}/details/${gNo}`
    )
  }

  async deleteGrade(gradeSetId: string, gNo: number) {
    return this.api.delete(
      `/community/${gradeSetId}/details/${gNo}`
    )
  }

  async exportGrades(gradeSetId: string) {
    return this.api.get(
      `/community/${gradeSetId}/details/export`
    )
  }
}