import { ApiClient } from '../../utils/api-client'

export class NewsAlertService {
  constructor(private api: ApiClient) {}

  async create(data: any) {
    return this.api.post('/news-alert', data)
  }

    async getAll() {
    return this.api.get('/news-alert')
  }

  async getById(newsNo: number) {
    return this.api.get(`/news-alert/${newsNo}`)
  }

  async update(data: any) {
    return this.api.put('/news-alert', data)
  }

  async archive(newsNo: number) {
    return this.api.patch(`/news-alert/${newsNo}/archive?archive=true`)
  }

  async unarchive(newsNo: number) {
    return this.api.patch(`/news-alert/${newsNo}/unarchive?archive=false`)
  }

  async delete(newsNo: number) {
    return this.api.delete(`/news-alert?newsNo=${newsNo}`)
  }
}