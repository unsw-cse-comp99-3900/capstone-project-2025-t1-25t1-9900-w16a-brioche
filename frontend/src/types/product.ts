import { z } from "zod"

/**
 * Enums based on API documentation
 */
export const ItemType = {
  Product: "Product",
  Service: "Service",
} as const

export const ItemStatus = {
  Active: "Active",
  Inactive: "Inactive",
} as const

export const ItemAmountTaxStatus = {
  Inclusive: "Inclusive",
  Exclusive: "Exclusive",
} as const

/**
 * Item use details (purchase/sale)
 */
export const itemUseInputSchema = z.object({
  price: z.number().optional(),
  priceAccuracy: z.number().optional(),
  ledgerAccount: z.string(),
  description: z.string().optional(),
  taxRate: z.string().optional(),
})

/**
 * Product data schema based on actual Reckon API response
 */
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  fullName: z.string(),
  itemType: z.string(),
  itemCode: z.string().nullable(),
  amountTaxStatus: z.string(),
  status: z.string(),
  purchase: z
    .object({
      price: z.number().nullable(),
      priceNet: z.number().nullable(),
      priceGross: z.number().nullable(),
      priceAccuracy: z.number().nullable(),
      ledgerAccount: z.object({
        id: z.string(),
        name: z.string(),
      }),
      description: z.string().nullable(),
      taxRate: z.object({
        id: z.string(),
        name: z.string(),
        percent: z.number(),
      }),
    })
    .nullable(),
  sale: z
    .object({
      price: z.number().nullable(),
      priceNet: z.number().nullable(),
      priceGross: z.number().nullable(),
      priceAccuracy: z.number().nullable(),
      ledgerAccount: z.object({
        id: z.string(),
        name: z.string(),
      }),
      description: z.string().nullable(),
      taxRate: z.object({
        id: z.string(),
        name: z.string(),
        percent: z.number(),
      }),
    })
    .nullable(),
  createdDateTime: z.string(),
  lastModifiedDateTime: z.string(),
})

// Define the type from the schema
export type Product = z.infer<typeof productSchema>

// Define the response schema for the API based on actual response
export const productResponseSchema = z.object({
  list: z.array(productSchema),
})

export type ProductResponse = z.infer<typeof productResponseSchema>

// Query parameters type
export interface ProductQueryParams {
  page?: number
  perPage?: number
  filter?: string
  orderby?: string
  select?: string
}

export const productFormSchema = z.object({
  // Basic information
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),

  parentItem: z.string().optional(),
  itemType: z
    .enum([ItemType.Product, ItemType.Service])
    .default(ItemType.Product),
  itemCode: z.string().optional(),
  status: z
    .enum([ItemStatus.Active, ItemStatus.Inactive])
    .default(ItemStatus.Active),

  amountTaxStatus: z
    .enum([ItemAmountTaxStatus.Inclusive, ItemAmountTaxStatus.Exclusive])
    .default(ItemAmountTaxStatus.Inclusive),

  // purchase: itemUseInputSchema.optional(),
  // sale: itemUseInputSchema.optional(),

  price: z.number().min(0).optional(),
  description: z.string().optional(),
  ledgerAccount: z
    .string()
    .min(1, { message: "Ledger account is required" })
    .optional(),
  taxRate: z.string().default("GST"), // Default to GST
})

export type ProductFormValues = z.infer<typeof productFormSchema>

// API Request Schema (transform form values to API format)
export const apiRequestSchema = productFormSchema.transform((data) => {
  return {
    name: data.name,
    itemType: data.itemType,
    itemCode: data.itemCode || null,
    status: data.status,
    amountTaxStatus: data.amountTaxStatus,
    parentItem: data.parentItem || undefined,
    sale: {
      price: data.price || 0,
      description: data.description || null,
      ledgerAccount: data.ledgerAccount || "Income", // Default to Income
      taxRate: data.taxRate || "GST", // Use selected tax rate or default to GST
    },
  }
})
