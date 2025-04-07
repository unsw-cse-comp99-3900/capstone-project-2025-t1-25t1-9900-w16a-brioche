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
