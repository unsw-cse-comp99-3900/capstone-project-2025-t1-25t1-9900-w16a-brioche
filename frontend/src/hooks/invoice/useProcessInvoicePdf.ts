import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { InvoiceFormValues } from "@/types/invoice"

// Define schema for invoice extraction, put schema inside because it's not used in other files
const extractedDataSchema = z.object({
  customer: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string().optional(),
  referenceCode: z.string().optional(),
  invoiceDiscount: z.string().optional(),
  lineItems: z.array(
    z.object({
      item: z.string(),
      description: z.string(),
      price: z.string(),
      quantity: z.string(),
      discount: z.string().optional(),
      tax: z.string().optional(),
      taxCode: z.string().optional(),
    })
  ),
  notes: z.string().optional(),
  paymentDetails: z.string().optional(),
})

// Create Google provider with API key
const googleAI = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
})

export interface ProcessPdfResult {
  success: boolean
  data?: Partial<InvoiceFormValues>
  error?: string
  safetyBlocked?: boolean
}

const processPdf = async (pdfFile: File): Promise<ProcessPdfResult> => {
  try {
    const { object: extractedData } = await generateObject({
      model: googleAI("gemini-2.0-flash-exp"),
      schema: extractedDataSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Please analyze this invoice PDF and extract the following information:\n" +
                "- Customer: match the customer name in the invoice\n" +
                "- invoiceDate: match the invoice date in the invoice\n" +
                "- dueDate: match the due date in the invoice if you not found just set same as invoice date\n" +
                "- referenceCode: match the reference code you find in the invoice\n" +
                "- invoiceDiscount: match the invoice discount setting not the discount number after the calculation and discount is for entire invoice not per item\n" +
                "- lineItems: item(the item name), description(text to describe the item), price(the price of the item), quantity(the quantity of the item), discount(the discount of this item), tax(the tax of the item), taxCode(the tax code of the item if you are not sure just leave blank)\n" +
                "- notes: match the notes leave to customer\n" +
                "- paymentDetails: match the payment method information in the invoice",
            },
            {
              type: "file",
              data: await pdfFile.arrayBuffer(),
              mimeType: "application/pdf",
              filename: pdfFile.name,
            },
          ],
        },
      ],
    })

    console.log("Extracted data:", extractedData)

    // Map the extracted data to our form structure
    const mappedData: Partial<InvoiceFormValues> = {
      customer: extractedData.customer || "",
      invoiceDate: extractedData.invoiceDate
        ? new Date(extractedData.invoiceDate)
        : new Date(),
      dueDate: extractedData.dueDate
        ? new Date(extractedData.dueDate)
        : new Date(),
      referenceCode: extractedData.referenceCode || "",
      invoiceDiscount: extractedData.invoiceDiscount || "",
      items: extractedData.lineItems.map((item) => ({
        item: item.item || "",
        itemPrice: item.price || "",
        description: item.description || "",
        qty: item.quantity || "1",
        discount: item.discount || "",
        taxCode: item.taxCode || "GST",
        tax: item.tax || "",
        amount: "", // This will be calculated on the form
      })),
      note: extractedData.notes || "",
      paymentDetails: extractedData.paymentDetails || "",
    }

    return {
      success: true,
      data: mappedData,
    }
  } catch (error) {
    console.error("Error processing PDF:", error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process PDF. Please try again or enter details manually.",
    }
  }
}

export const useProcessInvoicePdf = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: processPdf,
    onSuccess: (data) => {
      if (data.success && data.data) {
        // Store the extracted data in the query cache
        queryClient.setQueryData(["invoice", "pdf-data"], data.data)
      }
    },
  })
}

// Hook to access the extracted PDF data
export const useExtractedPdfData = (options?: { enabled?: boolean }) => {
  return useQuery<Partial<InvoiceFormValues> | null>({
    queryKey: ["invoice", "pdf-data"],
    queryFn: () => null, // Return null as default
    enabled: options?.enabled ?? false, // Disable by default
    staleTime: Infinity, // Keep the data fresh until explicitly invalidated
    gcTime: 1000 * 60 * 5, // Cache for 5 minutes (formerly cacheTime)
  })
}
