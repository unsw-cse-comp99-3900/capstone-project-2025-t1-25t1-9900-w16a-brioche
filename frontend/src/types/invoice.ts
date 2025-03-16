import { z } from "zod"

/**
 * Invoice schema definition using Zod
 * Defines the structure and validation rules for invoice data
 */
export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  amount: z.number(),
  date: z.string().datetime(),
  dueDate: z.string().datetime(),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]),
})

/**
 * Schema for the API response format
 * The response is wrapped in a 'list' field
 */
export const invoiceResponseSchema = z.object({
  list: z.array(invoiceSchema),
})

/**
 * TypeScript type for a single invoice
 */
export type Invoice = z.infer<typeof invoiceSchema>

/**
 * TypeScript type for the API response
 */
export type InvoiceResponse = z.infer<typeof invoiceResponseSchema>

/**
 * Status type for better type safety
 */
export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE"
