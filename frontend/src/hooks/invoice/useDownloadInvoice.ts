import { useMutation } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/constants/config"
import axios from "axios"

/**
 * Custom hook to download an invoice PDF from the Reckon API
 *
 * @returns Mutation function and state for downloading invoice PDF
 */
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
        // Dynamically get the bookId
        const bookId = getBookId()
        console.log(
          `Requesting PDF for invoice ${invoiceId} from book ${bookId}`
        )

        const baseURL = authApi.defaults?.baseURL || ""
        const headers = { ...authApi.defaults?.headers?.common }

        const url = `${baseURL}/${bookId}/invoices/${invoiceId}/pdf`
        const response = await axios.get(url, {
          headers,
          responseType: "blob",
        })

        if (!response.data || !(response.data instanceof Blob)) {
          throw new Error("Invalid response data format")
        }

        const filename = `invoice_${invoiceId}.pdf`
        const blob = new Blob([response.data], { type: "application/pdf" })
        const blobUrl = window.URL.createObjectURL(blob)

        if (action === "download") {
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()

          setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl)
            document.body.removeChild(link)
          }, 100)

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
            headers: error.response?.headers,
            data: error.response?.data,
          })
        }
        throw error
      }
    },
  })
}

export default useInvoicePdf
