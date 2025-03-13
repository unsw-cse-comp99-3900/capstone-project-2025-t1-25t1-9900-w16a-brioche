/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Axios API client configuration file
 *
 * This file configures a custom Axios instance for making HTTP requests to the backend server.
 * It sets a base URL, default headers, and includes interceptors for request and response handling.
 *
 * Features:
 * - Automatically attaches authorization tokens from local storage.
 * - Handles response data extraction and error management.
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { BACKEND_PORT, PRODUCT_BACKEND_URL } from "@/constants"

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
 * Modifies request configuration to include an Authorization header if a token exists.
 *
 * @param {object} config - Axios request configuration.
 * @returns {object} - Updated Axios request configuration.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

export default api
