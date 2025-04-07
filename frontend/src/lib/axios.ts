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
  development: `http://localhost:${BACKEND_PORT}/api`,
  test: `http://localhost:${BACKEND_PORT}/api`,
  production: PRODUCT_BACKEND_URL,
}

const api = axios.create({
  baseURL: API_URLS[ENV],
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
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
    timeout: 10000, // 10 seconds
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
          // console.log("Token added to request headers:", config.headers.Authorization)
        }

        // Add sessionId from localStorage if available
        const sessionId = localStorage.getItem("sessionId")
        if (sessionId && config.headers) {
          config.headers["X-Session-ID"] = sessionId
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
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InE1UTVPcFRZVVM0eHA4cXVUbVVac1c0WkVqUSIsImtpZCI6InE1UTVPcFRZVVM0eHA4cXVUbVVac1c0WkVqUSJ9.eyJjbGllbnRfaWQiOiJpbXBsaWNpdGNsaWVudCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJzdWIiOiJwYW55YW4yMDAwOTI4QGdtYWlsLmNvbSIsIm5hbWUiOiJwYW55YW4yMDAwOTI4QGdtYWlsLmNvbSIsImFtciI6InBhc3N3b3JkIiwiYXV0aF90aW1lIjoiMTc0MjA0MTg4NCIsImlkcCI6Imlkc3J2IiwicG9ydGFsVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUl6TURnMk9EQXlPRGd5TkRZNE5USTNNVFFpTENKelkyOXdaU0k2SW5ObGJHWXNJSFZ6WlhKeklpd2lhMmxrSWpvaU5qWXhOakV4WVRraUxDSmhaRzFwYmlJNlptRnNjMlVzSW1kcGRtVnVYMjVoYldVaU9pSjVZVzRpTENKbVlXMXBiSGxmYm1GdFpTSTZJbkJoYmlJc0luVnpaWEp1WVcxbElqb2ljR0Z1ZVdGdU1qQXdNRGt5T0VCbmJXRnBiQzVqYjIwaUxDSmxiV0ZwYkNJNkluQmhibmxoYmpJd01EQTVNamhBWjIxaGFXd3VZMjl0SWl3aVkyOTFiblJ5ZVNJNklrRlZJaXdpWVhWMGFGTnZkWEpqWlNJNklsQnZjblJoYkNJc0luUmxibUZ1WTNscFpDSTZJbEpGUTB0UFRpSXNJbWxoZENJNk1UYzBNakEwTVRnNE5Dd2laWGh3SWpveE56UXlNRGMzT0RnMGZRLjM3TzJndm1DOFlFT1Q3aTlMbnJtUk16NnE0d2tLODI1aUFPQzdVdnNQYVkiLCJpc3MiOiJodHRwczovL2lkZW50aXR5LnJlY2tvbi5jb20uYXUiLCJhdWQiOiJodHRwczovL2lkZW50aXR5LnJlY2tvbi5jb20uYXUvcmVzb3VyY2VzIiwiZXhwIjoxNzQyMDUyNjg0LCJuYmYiOjE3NDIwNDE4ODR9.D7Vbjo6N1NQ8hGkLIApgI-iDh7ZKl2_EgmTV8W-0wOJFD6S1HBz06ud-1gt2YFH-Ai0Jnqqz1C3tIh6dMwZtJMC1S8vlZehdXegA_DVrWGJNXJmWXLoM4hoQuF186-vE6cYaCT77Zwu-pXB34C1cwgJohJpE27V3dg3Xtv_EFIZUt6A9-oykiaIb27lh0OkrS9DPxsbIDn_2M9ltTsXmB379BZHZ2mC_xMOt9aNd7LmqhUZY3g_wGFImmZLMtAjN1-aLj_rDaJ9xJmgkUSMqKzqmUsW2FWcmKbqlKvMCNTj7kWmJb25UTW5EbFDhX2RhPo0lN2gx9KWxvoNSFH4Ntg"
const RECKON_API_BASE_URL = import.meta.env.DEV
  ? "/reckon"
  : "https://api.reckon.com/r1/v2"
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
