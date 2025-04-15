/**
 * @file account.ts - Defines schemas for account data used in Reckon API interactions.
 *
 * ** Includes validation schema for individual account data and response structure.
 * ** Uses Zod schema validation to enforce data integrity and type safety.
 */

/**
 * Account data schema based on Reckon API response
 *
 * This schema defines the structure of an account object as returned by the Reckon API.
 * Validates fields such as id, name, and optional fields (like description, status).
 *
 * @returns {object} - Zod validation schema for account data.
 */

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
