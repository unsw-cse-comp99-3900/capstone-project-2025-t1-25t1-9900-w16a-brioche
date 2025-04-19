/**
 * @file useValidateInvoicePeppol.ts - React hook for validating invoices against PEPPOL BIS Billing 3.0 using Gemini AI.
 * * Uses `generateObject` to interact with Google Gemini 2.0 API.
 * * Converts invoice data to a validation-focused prompt.
 * * Defines a strict Zod schema to validate AI output.
 * * Returns structured `ValidationResult` with `violations` and severity.
 */

/**
 * useValidateInvoicePeppol Hook
 *
 * * Validates a given invoice object using Google's Gemini AI against PEPPOL BIS Billing 3.0.
 * * Accepts `invoice` object and generates a prompt with PEPPOL-specific rule definitions.
 * * Parses and validates AI response using `validationResultSchema`.
 * * Categorizes issues as "Error" (mandatory violation) or "Warning" (optional/missing).
 * * Exposes structured violations for use in UI or export.
 *
 * @returns {UseMutationResult<ValidationOutcome, Error, ValidateInvoiceParams>}
 * A mutation that triggers the validation process and returns detailed results.
 */

import { useMutation } from "@tanstack/react-query"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { type Invoice } from "@/types/invoice"

/**
 * Validation Violation Detail Schema
 *
 * Defines the structure for individual validation violations, including field path,
 * user-friendly field name, message, rule ID, line number, and severity.
 */
const violationDetailSchema = z.object({
  field: z
    .string()
    .describe(
      "The specific field path where the violation occurred (e.g., 'customer.name', 'lineItems[1].description', 'dueDate'). Use array index starting from 0 for line items."
    ),
  userFriendlyField: z
    .string()
    .optional()
    .describe(
      "User-friendly name of the field or item in error (e.g., 'Customer Name', 'Line Item: iPhone 16 Quantity', 'Due Date'). Derived from context."
    ),
  message: z
    .string()
    .describe("A clear description of the validation rule violated."),
  ruleId: z
    .string()
    .optional()
    .describe(
      "The specific PEPPOL rule ID violated (e.g., 'ibt-001', 'br-co-09')."
    ),
  lineNumber: z
    .number()
    .optional()
    .describe(
      "The line number for violations within 'lineItems' (1-based index for display)."
    ),
  severity: z
    .enum(["Error", "Warning"])

    .describe("Severity of the violation (default is Error)."),
})

/**
 * Validation Result Schema
 *
 * Defines the overall structure of the validation result, including a boolean
 * indicating overall validity and an array of validation violations.
 */
const validationResultSchema = z.object({
  isValid: z
    .boolean()
    .describe(
      "Overall validation status. True if no 'Error' severity violations exist."
    ),
  violations: z
    .array(violationDetailSchema)
    .describe(
      "A list of specific validation violations found. Empty if the invoice is fully valid."
    ),
})

/**
 * ValidationResult Type
 *
 * TypeScript type derived from the validationResultSchema.
 */
type ValidationResult = z.infer<typeof validationResultSchema>

/**
 * ValidateInvoiceParams Interface
 *
 * Defines the input parameters for the validateInvoiceWithAI function.
 */
interface ValidateInvoiceParams {
  invoice: Invoice
}

/**
 * ValidationOutcome Interface
 *
 * Defines the structure of the validation outcome, including success status,
 * optional validation data, and optional error message.
 */
export interface ValidationOutcome {
  success: boolean
  data?: ValidationResult
  error?: string
}

// Initialize the Google AI client
// Ensure VITE_GOOGLE_GENERATIVE_AI_API_KEY is set in your .env file
const googleAI = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
})

/**
 * Validates an invoice against PEPPOL BIS Billing 3.0 requirements using Google's Gemini AI.
 *
 * @param {ValidateInvoiceParams} params - The invoice to validate.
 * @returns {Promise<ValidationOutcome>} - The validation result, indicating success or failure with details.
 */
const validateInvoiceWithAI = async ({
  invoice,
}: ValidateInvoiceParams): Promise<ValidationOutcome> => {
  if (import.meta.env.MODE !== "production") {
    console.log("invoice raw data for validation", invoice)
  }

  const invoiceDataForPrompt = JSON.stringify({
    customerName: invoice.customer?.name,
    invoiceDate: invoice.invoiceDate,
    dueDate: invoice.dueDate,
    invoiceNumber: invoice.invoiceNumber,
    lineItems: invoice.lineItems?.map((item) => ({
      itemName: item?.itemDetails?.item?.name,
      description: item?.description,
      quantity: item?.itemDetails?.quantity,
      unitPrice: item?.itemDetails?.price,
      taxRateId: item?.taxRate?.name,
    })),
  })

  if (import.meta.env.MODE !== "production") {
    console.log("invoice for validation", invoiceDataForPrompt)
  }

  const prompt = `
You are an expert in PEPPOL BIS Billing 3.0 specification. Validate the following invoice JSON object against the specification. Follow these basic rules:
- customerName: required, non-empty string, maximum 100 characters.
- invoiceDate: required, must be in YYYY-MM-DD format.
- dueDate: required, must be in YYYY-MM-DD format and on or after invoiceDate.
- invoiceNumber: required, non-empty alphanumeric string.
- lineItems: required array with at least one item. For each line item:
  - itemName: required, non-empty string.
  - description: required, severity 'Warning' if missing.
  - quantity: required, number greater than 0.
  - unitPrice: required, number greater than or equal to 0.
  - taxRateId: required, string representing a valid tax rate code.
For any violation, create an entry with:
  - field: JSON path to the invalid field
  - userFriendlyField: human-readable field name
  - message: description of the violation
  - ruleId: PEPPOL rule identifier if known
  - lineNumber: 1-based index for line items if applicable
  - severity: 'Error' for mandatory violations or 'Warning' for optional issues
Output must be a single JSON object exactly matching validationResultSchema and nothing else.


Invoice Data:
${invoiceDataForPrompt}
`

  try {
    console.log("Sending invoice data to AI for validation...")
    const { object: validationResult, finishReason } = await generateObject({
      model: googleAI("gemini-2.0-flash-exp"),
      schema: validationResultSchema,
      prompt: prompt,
    })

    console.log(
      "AI Validation Result:",
      validationResult,
      "Finish Reason:",
      finishReason
    )

    if (finishReason === "stop") {
      return {
        success: true,
        data: validationResult,
      }
    } else {
      // Handle other finish reasons like 'error', 'tool-calls', 'content-filter', etc.
      console.error("AI validation finished unexpectedly:", finishReason)
      return {
        success: false,
        error: `AI validation failed. Reason: ${finishReason}`,
      }
    }
  } catch (error) {
    console.error("Error during AI validation:", error)
    let errorMessage = "Failed to validate invoice with AI."
    if (error instanceof Error) {
      // Check for specific AI SDK errors
      errorMessage = error.message
    }
    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * useValidateInvoicePeppol Hook
 *
 * React hook to validate an invoice against PEPPOL using AI.
 *
 * @returns {UseMutationResult<ValidationOutcome, Error, ValidateInvoiceParams>} - The mutation hook for validating invoices.
 */
export const useValidateInvoicePeppol = () => {
  return useMutation<ValidationOutcome, Error, ValidateInvoiceParams>({
    mutationFn: validateInvoiceWithAI,
  })
}

export type { ValidationResult }
