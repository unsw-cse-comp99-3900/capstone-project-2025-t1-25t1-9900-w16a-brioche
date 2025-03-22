import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { z } from "zod"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

const paymentTermSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  isDefault: z.boolean(),
  useForInvoice: z.boolean(),
  netDueDay: z.number(),
  netDueDaySelection: z.string(),
  isDueDateWeekend: z.boolean(),
  isIssuedWithinDays: z.boolean(),
  issuedWithinDays: z.number(),
})

const paymentTermsResponseSchema = z.object({
  list: z.array(paymentTermSchema),
})

export type PaymentTerm = z.infer<typeof paymentTermSchema>

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

export const getDueDateFromAPI = async (
  termId: string,
  invoiceDate: string
) => {
  try {
    const url = `/${Demo_RECKON_BOOK_ID}/terms/${termId}/duedate/basedate/${invoiceDate}`
    console.log("🧩 Full API URL:", url)

    const response = await api.get(url)
    console.log("📡 API Full Response:", response.data)

    if (response.data && response.data.dueDate) {
      return response.data.dueDate
    } else {
      console.warn("⚠️ API response missing dueDate:", response.data)
      return null
    }
  } catch (error) {
    console.error("❌ API Error:", error)
    return null
  }
}

export default usePaymentTerms
