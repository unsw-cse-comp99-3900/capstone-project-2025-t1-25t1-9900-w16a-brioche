/**
 * @file landingFeature.ts - Defines landing page feature showcase content for the e-invoicing platform.
 *
 * ** Highlights key functionality of the platform such as invoice creation, validation, and delivery.
 * ** Used to render a structured feature section with grouped benefits and subpoints.
 */

/**
 * landingFeature Object
 *
 * Contains static content to highlight key platform features for SMEs on the landing page.
 * Includes section headings and a list of feature groups with descriptions and subfeatures.
 *
 * @returns {object} - Data structure for rendering key feature highlights and details.
 */

export const landingFeature = {
  content: {
    tagText: "Key Features",
    headingText: "Streamlined E-Invoicing for SMEs",
    subheadingText:
      "Our platform simplifies the e-invoicing process with automated workflows and Australian standards compliance.",
  },
  showcase: [
    {
      title: "Flexible Invoice Creation",
      description: "Create invoices through multiple methods:",
      features: [
        "Manual entry through intuitive forms",
        "PDF file upload with direct processing",
        "Peppol validation after upload",
      ],
    },
    {
      title: "PEPPOL Validation",
      description: "Ensure compliance with Australian e-invoicing standards:",
      features: [
        "One click validation after upload",
        "Checks against PEPPOL and Australian rules",
        "Clear validation results with error details",
      ],
    },
    {
      title: "Streamlined Sending ",
      description:
        "Send validated invoices directly to recipients through multiple channels:",
      features: [
        "One click send with email",
        "Email delivery with PDF attachments",
        "Delivery confirmation and status tracking",
      ],
    },
  ],
}

export default landingFeature
