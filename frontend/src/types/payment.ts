/**
 * @file payment.ts - Defines schemas for payment terms and due date validation.
 *
 * ** Contains the validation schema for payment terms used in invoicing systems.
 * ** Includes validation for payment terms response and due date formatting.
 */

import { z } from "zod"

/**
 * Payment Term Schema
 *
 * Represents a payment term with associated settings for invoice generation.
 * Includes fields such as `id`, `name`, `description`, `status`, and other options
 * like whether the payment term is the default, used for invoices, and its due date settings.
 *
 * @returns {object} - Zod schema for validating payment term data.
 */
export const paymentTermSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  isDefault: z.boolean(),
  useForInvoice: z.boolean(),
  netDueDay: z.number(),
  netDueDaySelection: z.string(),
  isDueDateWeekend: z.boolean(),
  isIssuedWithinDays: z.boolean(),
  issuedWithinDays: z.number(),
})

/**
 * Payment Terms Response Schema
 *
 * Defines the response structure when retrieving a list of payment terms.
 * This schema expects an array of payment terms under the `list` key.
 *
 * @returns {object} - Zod schema for validating payment terms response, containing a list of payment terms.
 */
export const paymentTermsResponseSchema = z.object({
  list: z.array(paymentTermSchema),
})

/**
 * PaymentTerm Type Inference
 *
 * This type is inferred from the `paymentTermSchema` using Zod's `infer` method.
 * It provides a TypeScript type representing a validated payment term object.
 *
 * @returns {PaymentTerm} - Type for a valid payment term object based on the schema.
 */
export type PaymentTerm = z.infer<typeof paymentTermSchema>

/**
 * Due Date Schema
 *
 * Validates the format of a due date. The expected format is `YYYY-MM-DD`.
 * This schema ensures that due dates follow the proper ISO format for consistency.
 *
 * @returns {object} - Zod schema for validating due date format.
 */
export const dueDateSchema = z.object({
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Due date must be in format YYYY-MM-DD",
  }),
})

/**
 * Due Date Type Inference
 *
 * This type is inferred from the `dueDateSchema` using Zod's `infer` method.
 * It represents a validated due date in the required string format (`YYYY-MM-DD`).
 *
 * @returns {DueDate} - Type for a valid due date object based on the schema.
 */
export type DueDate = z.infer<typeof dueDateSchema>
