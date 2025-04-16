/**
 * @file landingHero.ts - Defines the hero section content for the landing page.
 *
 * ** Includes main heading text, introductory description, CTA buttons, and process visuals.
 * ** Used to render the top section of the homepage highlighting platform value for SMEs.
 */

/**
 * landingHero Object
 *
 * Contains structured content for the hero banner on the homepage,
 * including marketing copy, feature highlights, and image showcase.
 *
 * @returns {object} - Hero section data used for rendering the first fold of the landing page.
 */

export const landingHero = {
  heading: {
    mainText: "Streamlined",
    highlightedText: "E-Invoicing",
    suffixText: "for SMEs",
  },

  content: {
    badgeText: "Australian E-Invoicing Solution",
    description:
      "The platform that helps small businesses create, validate, and send e-invoices compliant with Australian standards.",
  },

  buttons: {
    primaryButton: "Get Started",
    secondaryButton: "Learn More",
  },

  featureList: {
    heading: "Key Features:",
    features: [
      "Reckon One Integration",
      "UBL XML Conversion",
      "Automated Validation",
      "PEPPOL Network Support",
    ],
  },

  processFlow: {
    step1: "1",
    step2: "2",
    step3: "3",
    flowText: "Create → Validate → Send",
  },

  showcase: {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "E-Invoicing Dashboard",
    badgeText: "Automated Workflow",
  },
}
