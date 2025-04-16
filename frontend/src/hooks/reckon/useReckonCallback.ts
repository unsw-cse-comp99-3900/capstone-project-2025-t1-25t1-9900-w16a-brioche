/**
 * @file useReckonCallback.ts - Defines the `useReckonCallback` hook for handling OAuth callback after Reckon authentication.
 * * Sends `code` and `state` to `/Reckonauth/callback` backend endpoint.
 * * Handles and logs the response, allowing the app to continue authorization flow.
 */

/**
 * useReckonCallback Hook
 *
 * * Accepts a `CallbackDto` containing `code` and `state` (typically from query params).
 * * Sends these to the backend for Reckon session/token handling.
 * * Logs and returns the backend response.
 * * Errors are caught and rethrown to allow UI handling via React Query.
 *
 * @returns {UseMutationResult<string, Error, CallbackDto>} A mutation for completing the Reckon OAuth handshake.
 */

import { useMutation } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"

export interface CallbackDto {
  code: string
  state: string
}

/**
 * Hook to send Reckon OAuth code + state to backend and log the response.
 */
const useReckonCallback = () => {
  const authApi = useAuthApi()

  return useMutation<string, Error, CallbackDto>({
    mutationFn: async (dto: CallbackDto) => {
      try {
        console.log("dto:", dto)
        const response = (await authApi.post(
          "/Reckonauth/callback",
          dto
        )) as string
        console.log("CallbackResponse:", response)
        return response
      } catch (error) {
        console.error("callback api error:", error)
        throw error
      }
    },
  })
}

export default useReckonCallback
