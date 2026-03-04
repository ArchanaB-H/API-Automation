import { ApiClient } from '../../utils/api-client'

export class HomeDashboardService {
  constructor(private api: ApiClient) {}

  // =============================
  // GET DASHBOARD DETAILS
  // =============================
  async getDashboardDetails(
    employerId: string,
    startDate?: string,
    endDate?: string
  ) {
    let url = `/employers/${employerId}/dashboard-details`

    const params = []

    if (startDate) params.push(`startDate=${startDate}`)
    if (endDate) params.push(`endDate=${endDate}`)

    if (params.length) {
      url += `?${params.join('&')}`
    }

    return this.api.get(url)
  }

  // =============================
  // GET DASHBOARD LOGOS
  // =============================
  async getDashboardLogos(employerId: string) {
    return this.api.get(
      `/employers/${employerId}/dashboard-details/logos`
    )
  }
}