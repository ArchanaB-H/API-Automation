import { request } from '@playwright/test'
import { ENV } from '../config/env'

let tokenCache: string | null = null
let tokenExpiry = 0 // epoch ms

export async function getToken(): Promise<string> {
  //  reuse token if still valid (1 min buffer)
  if (tokenCache && Date.now() < tokenExpiry - 60_000) {
    return tokenCache
  }

  const ctx = await request.newContext()

  const response = await ctx.post(
    `${ENV.BASE_URL}/v${ENV.API_VERSION}/account/login`,
    {
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      data: {
        email: ENV.EMAIL,
        password: ENV.PASSWORD
      }
    }
  )

  const body = await response.json()

  const token: string | undefined = body?.result?.accessToken
  if (!token) {
    throw new Error('Access token not found in login response')
  }

  // ✅ decode JWT expiry (no library needed)
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  )

  tokenCache = token
  tokenExpiry = payload.exp * 1000
  console.log(`New token obtained, expires at ${new Date(tokenExpiry).toISOString()}`)

  return token
}