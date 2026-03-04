import { ApiClient } from '../../utils/api-client'

export class DataService {
  constructor(private api: ApiClient) {}

  // =============================
  // GET REGIONS
  // =============================
  async getRegions(sectorId?: string) {
    let url = '/Data/regions'

    if (sectorId) {
      url += `?sectorId=${sectorId}`
    }

    return this.api.get(url)
  }
}