import { ApiClient } from '../../utils/api-client'

export class EventsCategoriesService {
  constructor(private api: ApiClient) {}

  // =====================================================
  //  GET ALL EVENT CATEGORIES
  // =====================================================
  async getCategories() {
    return this.api.get(`/events-categories`)
  }

  // =====================================================
  //  GET EVENTS BY CATEGORY
  // =====================================================
  async getEventsByCategory(categoryId: string) {
    return this.api.get(`/events-categories/${categoryId}/events`)
  }

  // =====================================================
  //  GET EVENT BY ID (your screenshot)
  // =====================================================
  async getEventById(categoryId: string, eventId: string) {
    return this.api.get(
      `/events-categories/${categoryId}/events/${eventId}`
    )
  }
}