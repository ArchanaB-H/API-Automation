import { ApiClient } from '../../utils/api-client'

export class UsersService {
  constructor(private api: ApiClient) {}

  // =============================
  // GET ALL USERS
  // =============================
  async getAllUsers() {
    return this.api.get('/Users/GetAllUsers')
  }
}