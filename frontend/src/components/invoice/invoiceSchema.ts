import * as z from "zod"

/**
 * invoiceSchema
 */
export const invoiceSchema = z.object({
  invoiceNumber: z.string().optional(),
  customer: z.string().min(1, "Customer name is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  invoiceDiscountAmount: z.number().optional(),
  invoiceDiscountPercent: z.number().optional(),
  amountTaxStatus: z.enum(["NonTaxed", "Inclusive", "Exclusive"]),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  reference: z.string().optional(),
  purchaseOrderNumber: z.string().optional(),
  template: z.string().optional(),
  includeInInvoiceReminders: z.boolean().optional(),
  notes: z.string().optional(),
  paymentDetails: z.string().optional(),
  transactionLinks: z.any().optional(),
  lineItems: z
    .array(
      z.object({
        lineNumber: z.number(),
        serviceDate: z.string().min(1, "Service date is required"),
        itemDetails: z.object({
          item: z.string().min(1, "Item name is required"),
        }),
        project: z.string().optional(),
        description: z.string().min(1, "Description is required"),
        quantity: z
          .number()
          .min(1, "Quantity must be a valid number greater than 0"),
        unitPrice: z.number().default(0),
        taxAmount: z.number().optional(),
        taxRate: z.string().optional(),
        discountPercent: z.number().min(0).max(100).default(0),
        discountAmount: z.number().min(0).default(0),
        isFullWidthDescription: z.boolean().optional(),

        accountDetails: z
          .object({
            ledgerAccount: z.object({
              id: z.string().min(1, "Ledger account ID is required"),
              name: z.string().optional(),
            }),
          })
          .optional(),
      })
    )
    .min(1, "At least one line item is required"),
})

export const apiRequestSchema = invoiceSchema

export const createInvoiceResponseSchema = z.object({
  id: z.string().uuid(),
  status: z.string(),
  createdDate: z.string(),
  dueDate: z.string(),
  totalAmount: z.number(),
})

export type InvoiceFormData = z.infer<typeof invoiceSchema>
