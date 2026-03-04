import { ApiClient } from '../../utils/api-client'

export class ScreensService {
  constructor(private api: ApiClient) {}

  // =====================================================
  //  GET ALL SCREENS
  // =====================================================
  async getScreens(sectorId?: string) {
    const query = sectorId ? `?sectorId=${sectorId}` : ''
    return this.api.get(`/Screens${query}`)
  }

  // =====================================================
  //  GET SCREEN BY ID
  // =====================================================
  async getScreenById(screenId: string) {
    return this.api.get(`/Screens/${screenId}`)
  }

  // =====================================================
  //  GET HELP TEXT
  // =====================================================
  async getScreenHelp(screenNo: number) {
    return this.api.get(`/Screens/HelpText?screenNo=${screenNo}`)
  }
}