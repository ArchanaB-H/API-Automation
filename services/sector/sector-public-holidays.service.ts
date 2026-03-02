import { ApiClient } from '../../utils/api-client'

export class PublicHolidaysService {
  constructor(private api: ApiClient) {}

  // =====================================================
  // ⭐ CREATE
  // =====================================================
  async createHoliday(body: any) {
    return this.api.post('/system/publicholidays', body)
  }

  async createHolidayBatch(body: any[]) {
    return this.api.post('/system/publicholidays/batch', body)
  }

  // =====================================================
  // ⭐ GET
  // =====================================================
  async getHolidays(region: string) {
    return this.api.get(
      `/system/publicholidays?region=${region}`
    )
  }

  async getHolidayById(id: string) {
    return this.api.get(`/system/publicholidays/${id}`)
  }

  async getEmployerHolidays(employerId: string) {
    return this.api.get(
      `/system/employers/${employerId}/publicholidays`
    )
  }

  // =====================================================
  // ⭐ UPDATE
  // =====================================================
  async updateHoliday(id: string, body: any) {
    return this.api.put(
      `/system/publicholidays/${id}`,
      body
    )
  }

  // =====================================================
  // ⭐ DELETE
  // =====================================================
  async deleteHoliday(id: string) {
    return this.api.delete(
      `/system/publicholidays/${id}`
    )
  }
}