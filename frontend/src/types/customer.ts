import { z } from "zod"

/**
 * Customer data schema based on actual Reckon API response
 */
export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  organisationName: z.string().optional(),
  branch: z.string().nullable(),
  notes: z.string().nullable(),
  businessNumber1: z.string().nullable(),
  businessNumber2: z.string().nullable(),
  businessNumber: z.string().nullable(),
  entityTypes: z.object({
    isCustomer: z.boolean(),
    isSupplier: z.boolean(),
    isEmployee: z.boolean(),
    isSuperfund: z.boolean(),
  }),
  status: z.string(),
  electronicAddresses: z.array(z.any()).default([]),
  phoneNumbers: z.array(z.any()).default([]),
  addresses: z.array(z.any()).default([]),
  contacts: z.array(z.any()).default([]),
  balance: z.number().nullable(),
  lastModifiedDateTime: z.string(),
  creditLimit: z.number().nullable(),
  paymentTerms: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
  }),
  invoiceCount: z.number().nullable(),
  transactionPassword: z.string().nullable(),
  excludeFromInvoiceReminders: z.boolean().nullable(),
})

// Define the type from the schema
export type Customer = z.infer<typeof customerSchema>

// Define the response schema for the API based on actual response
export const customerResponseSchema = z.object({
  list: z.array(customerSchema),
})

export type CustomerResponse = z.infer<typeof customerResponseSchema>

// Query parameters type
export interface CustomerQueryParams {
  page?: number
  perPage?: number
  filter?: string
  orderby?: string
  select?: string
}
