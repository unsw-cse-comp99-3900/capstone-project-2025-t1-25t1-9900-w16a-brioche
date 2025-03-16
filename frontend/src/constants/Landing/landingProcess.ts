export const landingProcess = {
    content: {
      tagText: "Simple Process",
      headingText: "How E-Invoicing Works",
      subheadingText:
        "Our platform simplifies the e-invoicing process with three easy steps, saving you time and ensuring compliance.",
    },
    steps: [
      {
        stepNumber: 1,
        title: "Create",
        description: "Create e-invoices by uploading CSV/Excel files, or filling out a form. Our system converts your data into standardized UBL XML format.",
        features: [
          "Multiple input formats",
          "UBL XML conversion"
        ],
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Create invoices",
        stepLabel: "Step 1: Create"
      },
      {
        stepNumber: 2,
        title: "Validate",
        description: "Ensure your invoices comply with Australian e-invoicing standards. Our validation system checks for wellformedness, syntax rules, and PEPPOL compliance.",
        features: [
          "Australian standards compliance",
          "Detailed error reporting"
        ],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Validate invoices",
        stepLabel: "Step 2: Validate"
      },
      {
        stepNumber: 3,
        title: "Send",
        description: "Transmit your e-invoices securely via email. Track delivery status and maintain a complete history of all sent invoices for easy reference.",
        features: [
          "Email delivery",
          "Delivery tracking"
        ],
        imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Send invoices",
        stepLabel: "Step 3: Send"
      }
    ]
  };
  
  export default landingProcess;