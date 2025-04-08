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
