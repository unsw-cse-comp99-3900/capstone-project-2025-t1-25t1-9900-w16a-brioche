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

/**
 * Reckon API client
 *
 * Pre-configured axios instance for making requests to the Reckon API
 * with hardcoded authentication and parameters.
 */
// Hardcoded values for Reckon API
const RECKON_SUBSCRIPTION_KEY = "057ceb9d33c6421297cca19d0bef825d"
const RECKON_BEARER_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InE1UTVPcFRZVVM0eHA4cXVUbVVac1c0WkVqUSIsImtpZCI6InE1UTVPcFRZVVM0eHA4cXVUbVVac1c0WkVqUSJ9.eyJjbGllbnRfaWQiOiJpbXBsaWNpdGNsaWVudCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJzdWIiOiJ6YW5lLm1hQGN5YmVyYXkuY29tLmF1IiwibmFtZSI6InphbmUubWFAY3liZXJheS5jb20uYXUiLCJhbXIiOiJwYXNzd29yZCIsImF1dGhfdGltZSI6IjE3NDIwMDc2OTIiLCJpZHAiOiJpZHNydiIsInBvcnRhbFRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lJek1ESTVOakEzTURZMU5ESTBPVE15TWpVaUxDSnpZMjl3WlNJNkluTmxiR1lzSUhWelpYSnpJaXdpYTJsa0lqb2lZVEptTkdRNU16Z2lMQ0poWkcxcGJpSTZabUZzYzJVc0ltZHBkbVZ1WDI1aGJXVWlPaUphWVc1bElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTllTSXNJblZ6WlhKdVlXMWxJam9pZW1GdVpTNXRZVUJqZVdKbGNtRjVMbU52YlM1aGRTSXNJbVZ0WVdsc0lqb2llbUZ1WlM1dFlVQmplV0psY21GNUxtTnZiUzVoZFNJc0ltTnZkVzUwY25raU9pSkJWU0lzSW1GMWRHaFRiM1Z5WTJVaU9pSlFiM0owWVd3aUxDSjBaVzVoYm1ONWFXUWlPaUpTUlVOTFQwNGlMQ0pwWVhRaU9qRTNOREl3TWpNM01ERXNJbVY0Y0NJNk1UYzBNakExT1Rjd01YMC5iSGNLcF9nQXZMUE9wTEczenNfRC1MZEdfb1ZFalBQS1k0bTdJQjRmaFNnIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5yZWNrb24uY29tLmF1IiwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eS5yZWNrb24uY29tLmF1L3Jlc291cmNlcyIsImV4cCI6MTc0MjAzNDUwMSwibmJmIjoxNzQyMDIzNzAxfQ.cE6TKtJcWq1qo2XhZvj54VsLqdjwWEAlVvr9AuD93ZFzI-8ewHzf8q3IMhCFFY7W9khfmeS4wCtjfc-3bj6kejYd69a06cJTqbkAUul7pIhyubXjqwQCGFeMZYVmI37UEIeX4AiYDtu39X0TjNOIhkaIVhcIT-vmmNH5kiPovoz4bAl1NqscrEq5ejki6fgGUZ6V1HOT4MhVzdNoXPZVi3-JjjF14Bypzt-wxAYBndk0Gmq86ZvwwSwWdg2lvHAG5Vkj9pQsxTY1eLZ-CTD3GovYG_vXst_aP1MVjFzClPXNVY01si3_E24BW6VTmfTuJUb9ZXI-adOrLu-7Z6UJ-g"
const RECKON_API_BASE_URL = import.meta.env.DEV ? '/reckon' : 'https://api.reckon.com/r1/v2'
// Create Reckon API instance
export const reckonApi = axios.create({
  baseURL: RECKON_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Ocp-Apim-Subscription-Key": RECKON_SUBSCRIPTION_KEY,
    Authorization: `Bearer ${RECKON_BEARER_TOKEN}`,
  },
  timeout: 10000, // 10 seconds
})

// Apply the same response interceptor pattern
reckonApi.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const errorResponse = error.response

    const apiError: ApiError = {
      message:
        (errorResponse?.data as any)?.message ||
        (errorResponse?.data as any)?.error ||
        error.message ||
        "Reckon API request failed",
      status: errorResponse?.status,
      data: errorResponse?.data,
    }

    console.error(`Reckon API Error (${apiError.status}):`, apiError.message)

    return Promise.reject(apiError)
  }
)

// Default export for non-authenticated requests
export default api
