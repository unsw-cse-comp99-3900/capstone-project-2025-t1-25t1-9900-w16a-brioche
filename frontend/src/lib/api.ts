import axios from "axios"
import { useAuth } from "@clerk/clerk-react"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Create a custom hook for using the authenticated API
export const useApi = () => {
  const { getToken } = useAuth()

  // Add auth token to requests
  api.interceptors.request.use(async (config) => {
    try {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log("📢 正在请求 API:", config.method?.toUpperCase(), config.url)
      return config
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return api
}

// Export the base API instance for non-authenticated requests
export default api
