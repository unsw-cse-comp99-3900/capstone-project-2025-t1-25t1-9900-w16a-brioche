/**
 * @file InvoiceCreationContainer.tsx - Defines the InvoiceCreationContainer component, which provides details on creating invoices.
 * It covers manual entry and CSV/Excel upload methods.
 */

/**
 * InvoiceCreationContainer Component
 *
 * This component renders the invoice creation section, detailing the methods for creating invoices manually or via CSV/Excel upload.
 *
 * @returns {JSX.Element} The invoice creation section.
 */

import React from "react"

const InvoiceCreation: React.FC = () => {
  return (
    <section id="invoice-creation" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        Invoice Creation
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        Our platform provides two methods for creating invoices: manual entry
        and CSV/Excel upload.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Manual Invoice Creation
      </h3>
      <p className="mt-4 text-secondary-700">
        The manual invoice form allows you to create invoices by entering all
        details directly. The form includes fields for:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Customer information (name, ABN, address, contact details)</li>
        <li>Invoice details (number, date, due date, reference)</li>
        <li>Line items (description, quantity, unit price, tax)</li>
        <li>Notes and payment terms</li>
      </ul>

      <p className="mt-4 text-secondary-700">
        When you submit the form, our platform creates the invoice in Reckon One
        using the following API call:
      </p>

      <div className="mt-4 border border-secondary-200 rounded-md">
        <div className="bg-secondary-50 px-4 py-2 border-b border-secondary-200 flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            POST
          </span>
          <span className="ml-2 text-secondary-900 font-mono text-sm">
            /{"{bookId}"}/invoices
          </span>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-medium text-secondary-900">
            Request Body Example
          </h4>
          <div className="mt-2 bg-secondary-800 rounded-md overflow-auto">
            <pre className="text-xs text-secondary-100 p-4 font-mono">
              {`{
  "customerId": "cust123",
  "invoiceNumber": "INV-2023-001",
  "reference": "PO-2023-001",
  "issueDate": "2023-07-15T00:00:00Z",
  "dueDate": "2023-08-15T00:00:00Z",
  "status": "Draft",
  "currencyCode": "AUD",
  "taxInclusive": true,
  "lines": [
    {
      "description": "Web Development Services",
      "quantity": 1.0,
      "unitPrice": 100.0,
      "taxRateId": "tax001"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        CSV/Excel Upload
      </h3>
      <p className="mt-4 text-secondary-700">
        The CSV/Excel upload feature allows you to create multiple invoices at
        once by uploading a spreadsheet. The file should contain columns for:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Customer details (name, ABN, email)</li>
        <li>Invoice details (number, date, due date)</li>
        <li>Line item details (description, quantity, unit price, tax)</li>
      </ul>

      <p className="mt-4 text-secondary-700">
        Our platform processes the file, maps the columns to the appropriate
        fields, and creates invoices in Reckon One for each row in the
        spreadsheet.
      </p>

      <div className="mt-4 bg-secondary-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-secondary-900">
          CSV Format Requirements
        </h4>
        <p className="mt-2 text-sm text-secondary-700">
          Your CSV file should have headers in the first row. The following
          columns are required:
        </p>
        <ul className="mt-2 text-sm list-disc pl-5 text-secondary-700">
          <li>Customer Name</li>
          <li>Customer Email</li>
          <li>Invoice Date</li>
          <li>Due Date</li>
          <li>Description</li>
          <li>Quantity</li>
          <li>Unit Price</li>
          <li>Tax Rate</li>
        </ul>
      </div>
    </section>
  )
}

export default InvoiceCreation
