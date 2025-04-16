import React from "react"
/**
 * @file SMEGuidelinesContainer.tsx - Defines the SMEGuidelinesContainer component, which provides guidelines for SMEs using the e-invoicing platform.
 * It includes getting started guide and benefits of e-invoicing.
 */

/**
 * SMEGuidelines Component
 *
 * This component renders the SME guidelines section, detailing how to effectively use the e-invoicing platform,
 * including getting started steps and benefits of using e-invoicing.
 *
 * @returns {JSX.Element} The SME guidelines section
 */

const SMEGuidelines: React.FC = () => {
  return (
    <section id="sme-guidelines" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        SME Guidelines
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        This section provides practical guidelines for small and medium-sized
        enterprises (SMEs) on how to effectively use our e-invoicing platform.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Getting Started
      </h3>
      <div className="mt-4 space-y-4 text-secondary-700">
        <p>To get started with e-invoicing, follow these steps:</p>
        <ol className="list-decimal pl-5">
          <li>Register for an account on our platform</li>
          <li>Connect your Reckon One account</li>
          <li>Set up your business profile with your ABN and other details</li>
          <li>Create your first e-invoice using the manual form.</li>
          <li>Send the validated e-invoice to your customer</li>
        </ol>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Benefits of E-Invoicing
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-secondary-400">
          <div className="flex-shrink-0">
            <svg
              className="h-10 w-10 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900">
              Faster Payments
            </p>
            <p className="text-sm text-secondary-500">
              Receive payments up to 5 days faster with e-invoicing
            </p>
          </div>
        </div>

        <div className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-secondary-400">
          <div className="flex-shrink-0">
            <svg
              className="h-10 w-10 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900">
              Reduced Fraud Risk
            </p>
            <p className="text-sm text-secondary-500">
              Secure transmission with validation reduces fraud risk
            </p>
          </div>
        </div>

        <div className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-secondary-400">
          <div className="flex-shrink-0">
            <svg
              className="h-10 w-10 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900">
              Increased Efficiency
            </p>
            <p className="text-sm text-secondary-500">
              Reduce manual data entry and processing time
            </p>
          </div>
        </div>

        <div className="relative rounded-lg border border-secondary-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-secondary-400">
          <div className="flex-shrink-0">
            <svg
              className="h-10 w-10 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900">
              Environmental Impact
            </p>
            <p className="text-sm text-secondary-500">
              Reduce paper usage and carbon footprint
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Best Practices
      </h3>
      <div className="mt-4 space-y-4 text-secondary-700">
        <h4 className="text-lg font-medium text-secondary-900">
          1. Ensure Data Accuracy
        </h4>
        <p>
          Accurate data is crucial for successful e-invoicing. Double-check the
          following information:
        </p>
        <ul className="list-disc pl-5">
          <li>Customer ABN or other business identifier</li>
          <li>Invoice line items, quantities, and prices</li>
          <li>Tax calculations and codes</li>
          <li>Payment terms and bank details</li>
        </ul>

        <h4 className="text-lg font-medium text-secondary-900">
          2. Regular Reconciliation
        </h4>
        <p>
          Regularly reconcile your e-invoices with your Reckon One accounting
          system to ensure all invoices are properly recorded and tracked.
        </p>

        <h4 className="text-lg font-medium text-secondary-900">
          3. Monitor Invoice Status
        </h4>
        <p>
          Use the dashboard to monitor the status of your e-invoices. Follow up
          on any invoices that show errors or have not been delivered.
        </p>

        <h4 className="text-lg font-medium text-secondary-900">
          4. Keep Your Information Updated
        </h4>
        <p>
          Ensure your business information is always up-to-date, including
          contact details, bank accounts, and tax registrations.
        </p>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Frequently Asked Questions
      </h3>
      <div className="mt-4 space-y-4">
        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            What is UBL XML?
          </h4>
          <p className="mt-2 text-secondary-700">
            Universal Business Language (UBL) XML is a standardized XML format
            for business documents, including invoices. It's the format used for
            e-invoicing in Australia and many other countries.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            What is the PEPPOL network?
          </h4>
          <p className="mt-2 text-secondary-700">
            PEPPOL (Pan-European Public Procurement Online) is a network that
            enables businesses to exchange electronic documents, including
            e-invoices, in a standardized way. Australia has adopted PEPPOL for
            e-invoicing.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            Do I need to register for PEPPOL?
          </h4>
          <p className="mt-2 text-secondary-700">
            No, our platform handles the PEPPOL connection for you. You only
            need to register on our platform and connect your Reckon One
            account.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            Can I still send PDF invoices?
          </h4>
          <p className="mt-2 text-secondary-700">
            Yes, when sending invoices by email, our platform currently attaches
            only the PDF version. UBL XML attachments will be added in a future
            update.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            What if my customer doesn't support e-invoicing?
          </h4>
          <p className="mt-2 text-secondary-700">
            You can still send the invoice by email with a PDF attachment. The
            customer can view and process the PDF invoice as usual.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            How do I know if my invoice was delivered?
          </h4>
          <p className="mt-2 text-secondary-700">
            Our platform provides delivery status updates for invoices sent via
            email. PEPPOL status tracking will be added in future versions. You
            can check the status of your invoices on the dashboard.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-secondary-900">
            What is the bookId in Reckon One?
          </h4>
          <p className="mt-2 text-secondary-700">
            The bookId is a unique identifier for your business data in Reckon
            One. It's required for all API calls to Reckon One. You can find
            your bookId in the Reckon One dashboard or through our platform's
            settings page.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SMEGuidelines
