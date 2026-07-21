import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

/** Local storage keys */
export const AUTH_TOKEN_KEY = 'construct_admin_token'
export const AUTH_USER_KEY = 'construct_admin_user'

/** Base URL — override via VITE_API_BASE_URL in .env */
const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://csapi.anmoluphaar.in'

/**
 * Shared axios instance with auth interceptor.
 * Attaches Bearer token from localStorage on every request.
 */
const api = axios.create({
  baseURL,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // For FormData bodies (e.g. SaveBlog's multipart upload), let the browser set
    // Content-Type itself so it includes the multipart boundary. Setting it to
    // 'application/json' here — even as an instance default — breaks multipart
    // parsing on the server, since the header wins over axios' auto-detection.
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_USER_KEY)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

/** Login request payload — matches OpenAPI AccountModelRequest */
export interface LoginRequest {
  userName: string
  password: string
}

/** Logged-in user from AppUserLogin response */
export interface AuthUser {
  id: number
  userType: number
  userName: string
  mobileNo: string
  emailid: string
  name: string
  photo: string
  status: string | null
}

/** Login API response — token lives at res.id_token */
export interface LoginResponse {
  rs?: number
  rm?: string
  res?: {
    id_token?: string
    userLists?: AuthUser[]
  }
  rc?: unknown[]
}

/** Extract JWT from ConstructionApi login response */
export function extractToken(data: LoginResponse): string | null {
  return data.res?.id_token ?? null
}

/** Extract first user profile from login response */
export function extractUser(data: LoginResponse): AuthUser | null {
  return data.res?.userLists?.[0] ?? null
}

export default api