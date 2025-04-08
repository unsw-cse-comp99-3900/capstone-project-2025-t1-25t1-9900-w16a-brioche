import { useMutation } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/lib/utils"
import axios from "axios"

const useInvoicePdf = () => {
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async ({
      invoiceId,
      action = "download",
    }: {
      invoiceId: string
      action?: "download" | "preview"
    }) => {
      if (!invoiceId) {
        throw new Error("Invoice ID is required")
      }

      try {
        const bookId = getBookId()

        const response = await authApi.get(
          `/${bookId}/invoices/${invoiceId}/pdf`,
          {
            responseType: "blob",
          }
        )

        if (!response || !(response instanceof Blob)) {
          throw new Error("Invalid response data format")
        }

        const filename = `invoice_${invoiceId}.pdf`
        const blobUrl = window.URL.createObjectURL(response)

        if (action === "download") {
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = filename
          link.click()

          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100)

          return { success: true, action: "download" }
        } else {
          return {
            success: true,
            action: "preview",
            url: blobUrl,
            cleanup: () => window.URL.revokeObjectURL(blobUrl),
          }
        }
      } catch (error) {
        console.error("PDF operation error:", error)
        if (axios.isAxiosError(error)) {
          console.error("Response details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
          })
        }
        throw error
      }
    },
  })
}

export default useInvoicePdf
