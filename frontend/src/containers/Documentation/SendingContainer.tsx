/**
 * @file SendingContainer.tsx - Defines the SendingContainer component, which explains the process of sending invoices.
 * It includes methods for sending via email and the PEPPOL network.
 */

/**
 * SendingContainer Component
 *
 * This component renders the section on sending invoices, detailing the email and PEPPOL network methods,
 * along with their requirements and processes.
 *
 * @returns {JSX.Element} The invoice sending section.
 */

import React from "react"

const Sending: React.FC = () => {
  return (
    <section id="sending" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        Sending Invoices
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        After an invoice has been validated, you can send it to your customer
        via email or the PEPPOL network.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Email Sending
      </h3>
      <p className="mt-4 text-secondary-700">
        When sending via email, our platform:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Generates a PDF version of the invoice</li>
        <li>Attaches a PDF version of the invoice to the email</li>
        <li>Sends the email to the customer's email address</li>
        <li>Updates the invoice status in Reckon One</li>
      </ul>

      <div className="mt-4 bg-secondary-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-secondary-900">
          Email Template
        </h4>
        <p className="mt-2 text-sm text-secondary-700">
          The default email template includes:
        </p>
        <ul className="mt-2 text-sm list-disc pl-5 text-secondary-700">
          <li>Your company name and logo</li>
          <li>Invoice number and amount</li>
          <li>Due date and payment instructions</li>
          <li>PDF attachments (UBL XML is not yet supported)</li>
        </ul>
        <p className="mt-2 text-sm text-secondary-700">
          You can customize the email message before sending.
        </p>
      </div>
    </section>
  )
}

export default Sending
