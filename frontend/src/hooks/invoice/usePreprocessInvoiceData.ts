/**
 * @file usePreprocessInvoiceData.ts - Defines the `usePreprocessInvoiceData` hook for preprocessing invoice data from uploaded PDFs.
 * * This hook ensures customers and products mentioned in the invoice exist in the system.
 * * If not found, it auto-creates missing customers and products using default values.
 * * It leverages other hooks like `useCreateCustomer`, `useCreateProduct`, `useCustomers`, and `useProducts`.
 */

/**
 * usePreprocessInvoiceData Hook
 *
 * * Accepts partially parsed invoice data (typically from PDF).
 * * Validates if the customer exists — creates one if not found.
 * * Iterates through items — creates missing products with default values.
 * * Returns a structured response with success flag and optional error or transformed data.
 * * Automatically invalidates `customers` and `products` queries after successful mutation.
 *
 * @returns {UseMutationResult<PreprocessResult, Error, Partial<InvoiceFormValues>>}
 *  A React Query mutation object to trigger invoice data preprocessing.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomers } from "@/hooks/customer/useCustomers"
import { useCreateCustomer } from "@/hooks/customer/useCreateCustomer"
import { useProducts } from "@/hooks/product/useProducts"
import { useCreateProduct } from "@/hooks/product/useCreateProduct"
import { InvoiceFormValues } from "@/types/invoice"
import { ItemAmountTaxStatus, ItemStatus, ItemType } from "@/types/product"

interface PreprocessResult {
  success: boolean
  data?: Partial<InvoiceFormValues>
  error?: string
}

/**
 * Hook to preprocess invoice data from PDF
 * Checks if customers and products exist, creates them if they don't
 */
export const usePreprocessInvoiceData = () => {
  const queryClient = useQueryClient()
  const { data: customers } = useCustomers()
  const { data: products } = useProducts()
  const createCustomer = useCreateCustomer()
  const createProduct = useCreateProduct()

  return useMutation<PreprocessResult, Error, Partial<InvoiceFormValues>>({
    mutationFn: async (invoiceData: Partial<InvoiceFormValues>) => {
      try {
        if (!invoiceData) {
          return { success: false, error: "No invoice data provided" }
        }

        console.log("Preprocessing invoice data:", invoiceData)

        // Step 1: Check if customer exists, create if not
        if (invoiceData.customer && customers) {
          const customerExists = customers.some(
            (c) => c.name.toLowerCase() === invoiceData.customer?.toLowerCase()
          )

          if (!customerExists) {
            console.log(
              `Customer '${invoiceData.customer}' not found, creating...`
            )

            // Create a customer with required fields and default values
            await createCustomer.mutateAsync({
              name: invoiceData.customer,
              // Because in view page, PDF only show org name, so we need to pass the some value to org
              organisationName: invoiceData.customer,
              status: "Active",
              website: {
                type: "Web",
                address: "",
              },
              emailAddress: {
                type: "Email",
                address: "",
              },
              mobileNumber: {
                type: "Mobile",
                countryCode: "",
                number: "",
              },
              phoneNumber: {
                type: "Phone",
                countryCode: "",
                areaCode: "",
                number: "",
                extension: "",
              },
            })

            console.log(
              `Customer '${invoiceData.customer}' created successfully`
            )
          } else {
            console.log(`Customer '${invoiceData.customer}' already exists`)
          }
        }

        // Step 2: Check if products exist, create if not
        if (invoiceData.items && products) {
          for (const item of invoiceData.items) {
            if (!item.item) continue // Skip items without a name

            const productExists = products.some(
              (p) => p.name.toLowerCase() === item.item?.toLowerCase()
            )

            if (!productExists) {
              console.log(`Product '${item.item}' not found, creating...`)

              // Create product with default values as specified
              await createProduct.mutateAsync({
                name: item.item,
                amountTaxStatus: ItemAmountTaxStatus.Inclusive,
                description: "",
                itemCode: "",
                itemType: ItemType.Product,
                ledgerAccount: "Sales",
                parentItem: "",
                price: 0,
                status: ItemStatus.Active,
                taxRate: "GST",
              })

              console.log(`Product '${item.item}' created successfully`)
            } else {
              console.log(`Product '${item.item}' already exists`)
            }
          }
        }

        // Return the original invoice data unchanged
        return {
          success: true,
          data: invoiceData,
        }
      } catch (error) {
        console.error("Error preprocessing invoice data:", error)
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to preprocess invoice data",
        }
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate relevant queries to ensure fresh data
        queryClient.invalidateQueries({ queryKey: ["customers"] })
        queryClient.invalidateQueries({ queryKey: ["products"] })
      }
    },
  })
}

export default usePreprocessInvoiceData
