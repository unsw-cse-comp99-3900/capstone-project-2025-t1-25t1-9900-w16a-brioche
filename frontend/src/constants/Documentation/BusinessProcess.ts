export interface ProcessStep {
  id: string
  title: string
  subtitle: string
  color: string
  borderColor: string
  textColor: string
  description: string[]
  subpoints?: string[]
}

export const processSteps: ProcessStep[] = [
  {
    id: "invoice-creation",
    title: "1. Invoice Creation",
    subtitle: "PDF Upload / Manual Entry",
    color: "bg-primary-50",
    borderColor: "border-primary-200",
    textColor: "text-primary-700",

    subpoints: [
      "Upload a PDF file containing invoice data",
      "Manually enter invoice details through our form",
    ],
    description: [
      "Create invoices using one of two methods:",
      "The invoice data is sent to the Reckon One API to create a standard invoice in their format.",
    ],
  },
  {
    id: "invoice-validation",
    title: "2. Invoice Validation",
    subtitle: "AI-based Rule Simulation",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    description: [
      "Our platform validates invoice structure against key PEPPOL BIS Billing 3.0 rules using Google Gemini AI. This ensures invoices meet essential field requirements before sending.",
    ],
    subpoints: [
      "Checks for required fields such as invoiceNumber, customerName, and lineItems",
      "Follows PEPPOL rule IDs (e.g., ibt-001, ibt-131) via AI prompt-based simulation",
      "Returns user-friendly error messages and suggestions",
    ],
  },
  {
    id: "invoice-sending",
    title: "3. Invoice Sending",
    subtitle: "Email Delivery",
    color: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    description: [
      "Once validated, the invoice is sent to the customer via email.",
    ],
    subpoints: [
      "Attach a PDF version of the invoice to the email",
      "Include key invoice details such as due date, total amount, and reference",
    ],
  },
]
