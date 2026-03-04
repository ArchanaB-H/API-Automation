import { ApiClient } from '../../utils/api-client'

export class ReleaseNotesService {
  constructor(private api: ApiClient) {}

  // =============================
  // GET RELEASE NOTES
  // =============================
  async getAll() {
    return this.api.get('/ReleaseNotes')
  }
}