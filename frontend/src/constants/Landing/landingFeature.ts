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
        "CSV/Excel CSV/Excel file upload with direct processing",
        "Real-time validation during data entry",
      ],
    },
    {
      title: "Automated Validation",
      description: "Ensure compliance with Australian e-invoicing standards:",
      features: [
        "UBL XML conversion and validation",
        "Checks against PEPPOL and Australian rules",
        "Clear validation reports with error details",
      ],
    },
    {
      title: "Streamlined Sending ",
      description:
        "Send validated invoices directly to recipients through multiple channels:",
      features: [
        "Email delivery with PDF and UBL XML attachments",
        "PEPPOL network transmission for e-invoicing enabled recipients",
        "Delivery confirmation and status tracking",
      ],
    },
  ],
}

export default landingFeature
