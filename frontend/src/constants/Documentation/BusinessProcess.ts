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
    id: "ubl-conversion",
    title: "2. UBL XML Conversion",
    subtitle: "Australian Standard Format",
    color: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    description: [
      "After creating the invoice in Reckon One, our platform automatically converts it to UBL XML format, which is the standard required for Australian e-invoicing. This conversion maps all relevant fields to their corresponding UBL XML elements.",
    ],
  },
  {
    id: "invoice-validation",
    title: "3. Invoice Validation",
    subtitle: "ESS Validator",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    description: [
      "The UBL XML invoice is validated against Australian e-invoicing standards using the ESS Validator. This validation includes:",
    ],
    subpoints: [
      "PEPPOL BIS Billing 3.0 rule validation",
      "Checks for mandatory fields and common errors",
      "Australian compliance rules (simulated via AI)",
    ],
  },
  {
    id: "invoice-sending",
    title: "4. Invoice Sending",
    subtitle: "Email or PEPPOL Network",
    color: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    description: [
      "Once validated, the invoice can be sent using one of two methods:",
    ],
    subpoints: [
      "Email: Send via email with PDF and UBL XML attachments",
      "PEPPOL Network: Send directly to recipients on the PEPPOL network",
    ],
  },
]
