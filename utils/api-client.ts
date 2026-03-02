import { APIRequestContext } from '@playwright/test'
import { ENV } from '../config/env'

export class ApiClient {
  constructor(
    private request: APIRequestContext,
    private token: string

    
  )
   {}

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      accept: 'text/plain',
      'Content-Type': 'application/json'
    }
  }

  private url(path: string) {
    return `${ENV.BASE_URL}/v${ENV.API_VERSION}${path}`
  }

  async get(path: string) {
    return this.request.get(this.url(path), {
      headers: this.headers()
    })
  }

  async post(path: string, body: any) {
    return this.request.post(this.url(path), {
      headers: this.headers(),
      data: body
    })
  }

  async put(path: string, body: any) {
    return this.request.put(this.url(path), {
      headers: this.headers(),
      data: body
    })
  }

 async patch(path: string, body?: any) {
  return this.request.patch(this.url(path), {
    headers: this.headers(),
    data: body
  })
}
  //
  

  async delete(path: string) {
  return this.request.delete(this.url(path), {
    headers: this.headers()
  })
}
    // =============================
  // ⭐ MULTIPART (for logo upload)
  // =============================

async postFormData(
  path: string,
  filePath: string,
  fieldName = 'file'
) {
  const fs = require('fs')
  const pathLib = require('path')

  return this.request.post(this.url(path), {
    headers: {
      Authorization: `Bearer ${this.token}`
    },
    multipart: {
      [fieldName]: {
        name: pathLib.basename(filePath),
        mimeType: 'image/jpeg', // safe default for logos
        buffer: fs.readFileSync(filePath)
      }
    }
  })
}
}