/**
 * @file useValidateInvoicePeppol.ts - React hook for validating invoices against PEPPOL BIS Billing 3.0 using AI.
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
    .default("Error")
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
  console.log("invoice for validation", invoice)

  // Select relevant fields
  const invoiceDataForPrompt = JSON.stringify({
    customerName: invoice.customer?.name,
    invoiceDate: invoice.invoiceDate,
    dueDate: invoice.dueDate,
    invoiceNumber: invoice.invoiceNumber,
    totalAmount: invoice.totalAmount,
    lineItems: invoice.lineItems?.map((item) => ({
      itemName: item?.itemDetails?.item?.name,
      description: item?.description,
      quantity: item?.itemDetails?.quantity,
      unitPrice: item?.itemDetails?.price,
      taxRateId: item?.taxRate?.name,
    })),
  })

  const prompt = `Please validate the following invoice data strictly against key Australian PEPPOL BIS Billing 3.0 requirements. Focus on mandatory fields and common rules for a non-technical user. Ensure your response strictly adheres to the provided JSON schema.

**Output Requirements:**
Respond ONLY with a JSON object matching the schema provided below. Consistency is critical. Apply the rules exactly as described.
For each violation found, provide:
- 'field': The technical JSON path (e.g., 'customerName', 'lineItems[0].quantity').
- 'userFriendlyField': A user-friendly name for the field (e.g., 'Customer Name', 'Line Item "MacBook Pro": Quantity'). Use the 'itemName' from the line item data. If 'itemName' is missing, use 'Line Item [Number]: '.
- 'message': Concise explanation of the rule violation (e.g., "is missing", "must be a positive number").
- 'ruleId': The specific PEPPOL rule ID associated with the violation (e.g., 'ibt-001', 'ibt-131'). Use the IDs provided below.
- 'lineNumber': 1-based index for 'lineItems' violations.
- 'severity': Set to "Error" ONLY for MANDATORY violations as specified below. Set to "Warning" for RECOMMENDED/OPTIONAL violations.

**Key Validation Rules & IDs (Apply Severity Strictly):**
- **ibt-001 (Invoice Number):** 'invoiceNumber' MUST be present. (Severity: Error)
- **ibt-002 (Invoice Issue Date):** 'invoiceDate' MUST be present and a valid date. (Severity: Error)
- **ibt-009 (Payment Due Date):** 'dueDate' SHOULD be present. If present, it MUST be a valid date. (Severity: Warning if missing, Error if present but invalid format)
- **ibt-044 (Buyer Name):** 'customerName' MUST be present. (Severity: Error)
- **For each Line Item:**
    - **ibt-131 (Invoiced Quantity):** 'quantity' MUST be present and be a positive number. (Severity: Error)
    - **ibt-146 (Item Net Price):** 'unitPrice' MUST be present and be a non-negative number. (Severity: Error)
    - **ibt-154 (Item Name):** 'itemName' MUST be present. (Severity: Error)
    - **ibt-154 (Item Description):** 'lineItems.description' SHOULD be present for clarity. (Severity: Warning if missing)

If all MANDATORY checks pass (no "Error" severity violations), set 'isValid' to true (even if warnings exist) and list all violations (Errors and Warnings). If any "Error" violations exist, set 'isValid' to false and list all violations.

**Invoice Data:**
${invoiceDataForPrompt}`

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
