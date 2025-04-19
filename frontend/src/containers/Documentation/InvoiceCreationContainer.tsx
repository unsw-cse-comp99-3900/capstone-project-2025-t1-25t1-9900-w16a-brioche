/**
 * @file InvoiceCreationContainer.tsx - Defines the InvoiceCreationContainer component, which provides details on creating invoices.
 * It covers manual entry and PDF upload methods.
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
        and PDF upload.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Manual Invoice Creation
      </h3>
      <p className="mt-4 text-secondary-700">
        The manual invoice creation form allows you to generate invoices by
        directly entering all necessary details. The form includes the following
        fields:
      </p>

      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>
          <strong>Customer Information</strong>
          <ul className="list-disc pl-5">
            <li>
              <strong>Name</strong>: Enter the full name.
            </li>
          </ul>
        </li>
        <li>
          <strong>Invoice Details</strong>
          <ul className="list-disc pl-5">
            <li>
              <strong>Invoice Date</strong>: Set the date on which the invoice
              is issued.
            </li>
            <li>
              <strong>Due Date</strong>: Specify the payment due date to ensure
              timely payment.
            </li>
            <li>
              <strong>Reference Information</strong>: Include any relevant
              reference numbers or notes for identification.
            </li>
          </ul>
        </li>
        <li>
          <strong>Invoice Items</strong>
          <ul className="list-disc pl-5">
            <li>
              <strong>Item</strong>: Enter the name of the product or service.
            </li>
            <li>
              <strong>Item Price</strong>: Enter the price per item.
            </li>
            <li>
              <strong>Description</strong>: Provide a brief description of each
              item or service to help the customer understand what they are
              purchasing.
            </li>
            <li>
              <strong>Quantity</strong>: Enter the number of products or
              services provided.
            </li>
            <li>
              <strong>Tax</strong>: Specify the applicable tax rate or amount.
            </li>
          </ul>
        </li>
        <li>
          <strong>Notes and Payment Terms</strong>
          <ul className="list-disc pl-5">
            <li>
              <strong>Notes</strong>: Add any additional information or
              instructions you wish to convey to the customer.
            </li>
            <li>
              <strong>Payment Terms</strong>: Clearly state the payment
              conditions to inform the customer of the payment requirements.
            </li>
          </ul>
        </li>
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
            /&#123;bookId&#125;/invoices
          </span>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-medium text-secondary-900">
            Request Body Example
          </h4>
          <div className="mt-2 bg-secondary-800 rounded-md overflow-auto">
            <pre className="text-xs text-secondary-100 p-4 font-mono">
              {`{
  "customer": "Company Ltd",
  "invoiceDate": "2020-02-06T12:00:00Z",
  "dueDate": "null",
  "invoiceDiscountAmount": "null",
  "invoiceDiscountPercent": "null",
  "amountTaxStatus": "Inclusive",
  "reference": "null",
  "accountsReceivableLedgerAccount": "Sales",
  "notes": "null",
  "paymentDetails": "null",
  "lineItems": [{
    "lineNumber": 2,
    "itemDetails": "null",
    "description": "null",
    "taxAmount": "null",
    "taxRate": "null"
  }]
}`}
            </pre>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        PDF Upload invoice creation
      </h3>
      <p className="mt-4 text-secondary-700">
        Our platform supports PDF invoice creation using Gemini 2.0 AI
        extraction. When a user uploads a PDF, Gemini 2.0 automatically parses
        its content and populates the invoice form.
      </p>
      <p className="mt-4 text-secondary-700">
        If the customer or any item doesn’t exist, they will be created first.
        After extraction, the form is fully editable, allowing users to review
        and make adjustments before clicking the &ldquo;Create&rdquo; button.
      </p>
    </section>
  )
}

export default InvoiceCreation
