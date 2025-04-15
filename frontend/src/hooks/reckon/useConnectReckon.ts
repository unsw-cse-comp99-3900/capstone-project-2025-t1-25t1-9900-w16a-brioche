/**
 * @file useConnectReckon.ts - Defines the `useConnectReckon` hook for initiating Reckon API authentication.
 * * Sends a session/user ID to the backend to retrieve a Reckon login redirect URL.
 * * Returns the URL so that the frontend can redirect the user.
 */

/**
 * useConnectReckon Hook
 *
 * * Accepts a `userId` (used as sessionId) and sends it to `/Reckonauth/login`.
 * * Backend responds with a `redirectUrl` string to initiate Reckon OAuth flow.
 * * Can be used in onboarding or integration flows where third-party auth is required.
 *
 * @returns {UseMutationResult<string, Error, string>} Mutation that returns the Reckon redirect URL.
 */

import { useMutation } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"

/**
 * Custom hook to connect to Reckon.
 * Sends a userId to the backend and retrieves a redirect URL for Reckon authentication.
 *
 * @returns A mutation object with the function to connect to Reckon.
 */
export const useConnectReckon = () => {
  const authApi = useAuthApi()
  return useMutation<string, Error, string>({
    mutationFn: async (userId: string) => {
      console.log("Connecting to Reckon with userId:", userId)

      // Call the backend API to get the redirect URL
      const response = (await authApi.get("/Reckonauth/login", {
        params: {
          sessionId: userId,
        },
      })) as { redirectUrl: string }

      // Extract and return the redirect URL from the response
      const { redirectUrl } = response
      console.log("Reckon redirect URL:", redirectUrl)
      return redirectUrl
    },
  })
}

export default useConnectReckon
