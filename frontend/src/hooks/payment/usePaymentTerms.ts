import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"
import { PaymentTerm } from "@/types/payment"
import { paymentTermsResponseSchema } from "@/types/payment"

export const usePaymentTerms = () => {
  return useQuery<PaymentTerm[]>({
    queryKey: ["payment-terms"],
    queryFn: async () => {
      console.log("Fetching payment terms from API...")

      const response = await api.get(`/${Demo_RECKON_BOOK_ID}/terms`)

      console.log("🚀 API Full Response:", response)
      console.log("📌 API response.data:", response.data)

      const parsedData = paymentTermsResponseSchema.safeParse(response)

      if (!parsedData.success) {
        console.error("❌ Zod validation failed:", parsedData.error)
        return []
      }

      console.log(
        "✅ Parsed and validated payment terms:",
        parsedData.data.list
      )

      if (!parsedData.data.list.length) {
        console.warn("⚠️ No payment terms returned from API")
      }

      return parsedData.data.list.filter(
        (term) => term.status === "Active" && term.useForInvoice
      )
    },
  })
}

export const getPaymentTermById = async (termId: string) => {
  try {
    const response = await api.get(`/${Demo_RECKON_BOOK_ID}/terms/${termId}`)
    console.log("📌 API Response for Payment Term:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Error fetching Payment Term:", error)
    return null
  }
}

export default usePaymentTerms
