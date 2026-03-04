import { ApiClient } from '../../utils/api-client'

export class ThirdPartiesService {
  constructor(private api: ApiClient) {}

  // =====================================================
  //  CREATE
  // =====================================================
  async createThirdParty(employerId: string, body: any[]) {
    return this.api.post(
      `/${employerId}/third-parties`,
      body
    )
  }

  // =====================================================
  //  GET
  // =====================================================
  async getThirdParties(employerId: string) {
    return this.api.get(
      `/${employerId}/third-parties`
    )
  }

  async getThirdPartyById(
    employerId: string,
    thirdPartyId: string
  ) {
    return this.api.get(
      `/${employerId}/third-parties/${thirdPartyId}`
    )
  }

  // =====================================================
  //  UPDATE
  // =====================================================
  async updateThirdParty(
    employerId: string,
    thirdPartyId: string,
    body: any
  ) {
    return this.api.put(
      `/${employerId}/third-parties/${thirdPartyId}`,
      body
    )
  }

  async archiveThirdParty(
    employerId: string,
    thirdPartyId: string
  ) {
    return this.api.put(
      `/${employerId}/third-parties/${thirdPartyId}/archive`,
      {}
    )
  }

  async unarchiveThirdParty(
    employerId: string,
    thirdPartyId: string
  ) {
    return this.api.put(
      `/${employerId}/third-parties/${thirdPartyId}/unarchive`,
      {}
    )
  }

  // =====================================================
  //  DELETE
  // =====================================================
  async deleteThirdParty(
    employerId: string,
    thirdPartyId: string
  ) {
    return this.api.delete(
      `/${employerId}/third-parties/${thirdPartyId}`
    )
  }
}