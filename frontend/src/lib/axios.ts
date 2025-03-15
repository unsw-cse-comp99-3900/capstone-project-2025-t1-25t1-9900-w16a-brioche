/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Axios API client configuration file
 *
 * This file configures a custom Axios instance for making HTTP requests to the backend server.
 * It sets a base URL, default headers, and includes interceptors for request and response handling.
 *
 * Features:
 * - Automatically attaches Clerk authentication tokens
 * - Handles response data extraction and error management.
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { BACKEND_PORT, PRODUCT_BACKEND_URL } from "@/constants"
import { useAuth } from "@clerk/clerk-react"

// Environment configuration
const ENV =
  (import.meta.env.MODE as "development" | "test" | "production") ||
  "development"

// API URLs for different environments
const API_URLS = {
  development: `http://localhost:${BACKEND_PORT}`,
  test: `http://localhost:${BACKEND_PORT}`,
  production: PRODUCT_BACKEND_URL,
}

const api = axios.create({
  baseURL: API_URLS[ENV],
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
})

// Define API error type
export interface ApiError {
  message: string
  status?: number
  data?: any
}

// Response interceptor: extract data and handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const errorResponse = error.response

    const apiError: ApiError = {
      message:
        (errorResponse?.data as any)?.message ||
        (errorResponse?.data as any)?.error ||
        error.message ||
        "API request failed",
      status: errorResponse?.status,
      data: errorResponse?.data,
    }

    console.error(`API Error (${apiError.status}):`, apiError.message)

    return Promise.reject(apiError)
  }
)

/**
 * Custom hook that returns an axios instance with Clerk authentication
 * @returns axios instance with auth interceptor
 */
export const useAuthApi = () => {
  const { getToken } = useAuth()

  // Create a new instance for authenticated requests
  const authApi = axios.create({
    baseURL: API_URLS[ENV],
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000,
  })

  // Clone the response interceptor from the main api instance
  authApi.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
      const errorResponse = error.response

      const apiError: ApiError = {
        message:
          (errorResponse?.data as any)?.message ||
          (errorResponse?.data as any)?.error ||
          error.message ||
          "API request failed",
        status: errorResponse?.status,
        data: errorResponse?.data,
      }

      console.error(`API Error (${apiError.status}):`, apiError.message)

      return Promise.reject(apiError)
    }
  )

  // Add auth token to requests
  authApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const token = await getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      } catch (error) {
        return Promise.reject(error)
      }
    }
  )

  return authApi
}

// Default export for non-authenticated requests
export default api
