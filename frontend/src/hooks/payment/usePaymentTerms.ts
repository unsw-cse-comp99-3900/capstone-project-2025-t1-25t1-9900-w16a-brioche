import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/constants/config"
import { PaymentTerm } from "@/types/payment"
import { paymentTermsResponseSchema } from "@/types/payment"

export const usePaymentTerms = () => {
  const authApi = useAuthApi()

  return useQuery<PaymentTerm[]>({
    queryKey: ["payment-terms"],
    queryFn: async () => {
      console.log("Fetching payment terms from API...")

      // Dynamically get the bookId
      const bookId = getBookId();

      const response = await authApi.get(`/${bookId}/terms`)

      console.log(" API Full Response:", response)
      console.log(" API response.data:", response.data)

      const parsedData = paymentTermsResponseSchema.safeParse(response)

      if (!parsedData.success) {
        console.error(" Zod validation failed:", parsedData.error)
        return []
      }

      console.log(" Parsed and validated payment terms:", parsedData.data.list)

      if (!parsedData.data.list.length) {
        console.warn("⚠️ No payment terms returned from API")
      }

      return parsedData.data.list.filter(
        (term) => term.status === "Active" && term.useForInvoice
      )
    },
  })
}

export default usePaymentTerms
