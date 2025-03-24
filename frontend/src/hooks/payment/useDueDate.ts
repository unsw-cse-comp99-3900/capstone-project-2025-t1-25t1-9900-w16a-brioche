import { Demo_RECKON_BOOK_ID } from "@/constants/config"
import api from "@/lib/axios"
import { dueDateSchema } from "@/types/payment"
import { useQuery } from "@tanstack/react-query"

export const useDueDate = (termId: string, invoiceDate: string) => {
  return useQuery({
    queryKey: ["due-date", termId, invoiceDate],
    queryFn: async () => {
      if (!termId || !invoiceDate) return null

      const url = `/${Demo_RECKON_BOOK_ID}/terms/${termId}/duedate/basedate/${invoiceDate}`
      console.log("🧩 Full API URL:", url)

      const response = await api.get(url)
      console.log("Raw API response:", response)

      const parsedData = dueDateSchema.parse(response)

      console.log("✅ Parsed and validated due date:", parsedData)
      return parsedData
    },
  })
}
