/**
 * @file useDueDate.ts - Provides the `useDueDate` hook to calculate the due date for an invoice based on selected payment terms.
 * * Calls Reckon API endpoint to compute due date using term ID and invoice issue date.
 * * Validates response using Zod schema (`dueDateSchema`) to ensure type safety.
 */

/**
 * useDueDate Hook
 *
 * * Dynamically fetches the computed due date using the term ID and invoice date.
 * * Automatically forms the URL as `/terms/{termId}/duedate/basedate/{invoiceDate}`.
 * * Validates the API response using `dueDateSchema` before returning.
 * * Returns `null` if `termId` or `invoiceDate` is missing.
 *
 * @param {string} termId - The payment term ID to use for calculating due date.
 * @param {string} invoiceDate - The base invoice issue date (ISO string).
 * @returns {UseQueryResult<DueDateType | null>} React Query result with parsed due date or null.
 */

import { getBookId } from "@/lib/utils"
import { useAuthApi } from "@/lib/axios"
import { dueDateSchema } from "@/types/payment"
import { useQuery } from "@tanstack/react-query"

export const useDueDate = (termId: string, invoiceDate: string) => {
  const authApi = useAuthApi()

  return useQuery({
    queryKey: ["due-date", termId, invoiceDate],
    queryFn: async () => {
      if (!termId || !invoiceDate) return null

      // Dynamically get the bookId
      const bookId = getBookId()

      const url = `/${bookId}/terms/${termId}/duedate/basedate/${invoiceDate}`
      console.log(" Full API URL:", url)

      const response = await authApi.get(url)
      console.log("Raw API response:", response)

      const parsedData = dueDateSchema.parse(response)

      console.log(" Parsed and validated due date:", parsedData)
      return parsedData
    },
  })
}
