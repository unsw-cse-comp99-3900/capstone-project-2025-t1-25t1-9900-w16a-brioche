import React from "react"

const Overview: React.FC = () => {
  return (
    <section id="overview" className="mb-16">
      <h1 className="text-3xl font-extrabold text-secondary-900 tracking-tight sm:text-4xl">
        InvoiceFlow E-Invoicing Platform Documentation
      </h1>
      <p className="mt-4 text-xl text-secondary-500">
        This documentation outlines the business process flow and integration
        details for our e-invoicing platform, which helps SMEs create, validate,
        and send e-invoices that comply with Australian standards.
      </p>

      <div className="mt-6 bg-secondary-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-secondary-900">
          Platform Overview
        </h2>
        <p className="mt-2 text-secondary-700">
          Our e-invoicing platform integrates with Reckon One to provide a
          seamless e-invoicing solution for Australian SMEs. The platform allows
          you to:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="ml-3 text-secondary-700">
              Create invoices manually or by uploading invoice PDFs
            </p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="ml-3 text-secondary-700">
              Convert invoices to UBL XML format compliant with Australian
              standards
            </p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="ml-3 text-secondary-700">
              Validate invoices against core PEPPOL BIS Billing 3.0 rules using
              AI-powered validation, including required fields such as
              invoiceNumber, customerName, and lineItems. Validation follows
              official rule IDs (e.g., ibt-001, ibt-131) and returns
              user-friendly results.
            </p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="ml-3 text-secondary-700">
              Send validated invoices via email or the PEPPOL network
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Overview
