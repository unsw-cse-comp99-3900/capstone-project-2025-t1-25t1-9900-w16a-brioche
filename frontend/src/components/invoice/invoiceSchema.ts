import * as z from "zod"

/**
 * 定义 invoiceSchema
 */
export const invoiceSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  amountTaxStatus: z.enum(["NonTaxed", "Inclusive", "Exclusive"]),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  lineItems: z
    .array(
      z.object({
        lineNumber: z.number(),
        description: z.string().min(1, "Description is required"),
        quantity: z
          .string()
          .transform((val) => Number(val))
          .refine((val) => !isNaN(val) && val > 0, {
            message: "Quantity must be a valid number greater than 0",
          }),
        unitPrice: z
          .string()
          .transform((val) => Number(val))
          .refine((val) => !isNaN(val) && val >= 0, {
            message:
              "Unit price must be a valid number greater than or equal to 0",
          }),
        taxRate: z.string().optional().or(z.literal("")),
        taxAmount: z.number().optional(),
        discountPercent: z.number().min(0).max(100).optional(),
        isFullWidthDescription: z.boolean().optional(),
      })
    )
    .min(1, "At least one line item is required"),
})

/**
 * 通过 invoiceSchema 推导 InvoiceFormData 类型
 */
export type InvoiceFormData = z.infer<typeof invoiceSchema>
