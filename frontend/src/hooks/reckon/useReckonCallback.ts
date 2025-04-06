import { useMutation } from "@tanstack/react-query";
import { useAuthApi } from "@/lib/axios";

export interface CallbackDto {
  code: string;
  state: string;
}

export interface CallbackResponse {
  message: string;
  accessToken: string;
  expiresAt: string;
}

/**
 * Hook to send Reckon OAuth code + state to backend and log the response.
 */
const useReckonCallback = () => {
  const authApi = useAuthApi();

  return useMutation<CallbackResponse, Error, CallbackDto>({
    mutationFn: async (dto: CallbackDto) => {
      const response = await authApi.post("/Reckonauth/callback", dto);
      console.log("Reckon callback response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Message:", data.message);
      console.log("Access Token:", data.accessToken);
      console.log("Expires At:", data.expiresAt);
    },
    onError: (error) => {
      console.error("Failed to exchange code for token:", error);
    },
  });
};

export default useReckonCallback;
