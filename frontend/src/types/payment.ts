import { z } from "zod"

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

export const paymentTermsResponseSchema = z.object({
  list: z.array(paymentTermSchema),
})

export type PaymentTerm = z.infer<typeof paymentTermSchema>

export const dueDateSchema = z.object({
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Due date must be in format YYYY-MM-DD",
  }),
})

export type DueDate = z.infer<typeof dueDateSchema>
