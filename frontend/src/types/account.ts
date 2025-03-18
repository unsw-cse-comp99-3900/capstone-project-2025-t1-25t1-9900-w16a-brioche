import { z } from "zod"

/**
 * Account data schema based on Reckon API response
 */
export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
//   number: z.string().nullable(),
//   description: z.string().nullable(),
//   type: z.string(),
//   status: z.string(),
//   isTaxable: z.boolean(),
//   isSystem: z.boolean(),
//   createdDateTime: z.string().optional(),
//   lastModifiedDateTime: z.string().optional()
})

// Define the type from the schema
export type Account = z.infer<typeof accountSchema>

// Define the response schema for the API
export const accountResponseSchema = z.object({
    list: z.array(accountSchema),
  })