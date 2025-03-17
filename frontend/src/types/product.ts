import { z } from "zod"

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
  purchase: z.object({
    price: z.number(),
    priceNet: z.number(),
    priceGross: z.number(),
    priceAccuracy: z.number(),
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
  }).nullable(),
  sale: z.object({
    price: z.number(),
    priceNet: z.number(),
    priceGross: z.number(),
    priceAccuracy: z.number(),
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
  }).nullable(),
  createdDateTime: z.string(),
  lastModifiedDateTime: z.string(),
})

// Define the type from the schema
export type Product = z.infer<typeof productSchema>

// Define the response schema for the API based on actual response
export const productResponseSchema = z.object({
    list: z.array(productSchema),
  })