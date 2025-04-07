import React from 'react';

const Sending: React.FC = () => {
  return (
    <section id="sending" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">Sending Invoices</h2>
      <p className="mt-4 text-lg text-secondary-500">
        After an invoice has been validated, you can send it to your customer via email or the PEPPOL network.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">Email Sending</h3>
      <p className="mt-4 text-secondary-700">
        When sending via email, our platform:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Generates a PDF version of the invoice</li>
        <li>Attaches both the PDF and UBL XML files to the email</li>
        <li>Sends the email to the customer's email address</li>
        <li>Updates the invoice status in Reckon One</li>
      </ul>

      <div className="mt-4 bg-secondary-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-secondary-900">Email Template</h4>
        <p className="mt-2 text-sm text-secondary-700">
          The default email template includes:
        </p>
        <ul className="mt-2 text-sm list-disc pl-5 text-secondary-700">
          <li>Your company name and logo</li>
          <li>Invoice number and amount</li>
          <li>Due date and payment instructions</li>
          <li>PDF and UBL XML attachments</li>
        </ul>
        <p className="mt-2 text-sm text-secondary-700">
          You can customize the email message before sending.
        </p>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">PEPPOL Sending</h3>
      <p className="mt-4 text-secondary-700">
        When sending via the PEPPOL network, our platform:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Transmits the UBL XML invoice directly to the recipient's PEPPOL access point</li>
        <li>Provides a transmission receipt with a unique identifier</li>
        <li>Updates the invoice status in Reckon One</li>
      </ul>

      <div className="mt-4 bg-secondary-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-secondary-900">PEPPOL Requirements</h4>
        <p className="mt-2 text-sm text-secondary-700">
          To send via PEPPOL, you need the recipient's:
        </p>
        <ul className="mt-2 text-sm list-disc pl-5 text-secondary-700">
          <li>PEPPOL Participant ID (usually their ABN with a prefix)</li>
          <li>Document type identifier (for invoices: urn:oasis:names:specification:ubl:schema:xsd:Invoice-2)</li>
          <li>Process identifier (for invoices: urn:fdc:peppol.eu:2017:poacc:billing:01:1.0)</li>
        </ul>
        <p className="mt-2 text-sm text-secondary-700">
          Our platform can look up the recipient's PEPPOL details using their ABN.
        </p>
      </div>
    </section>
  );
};

export default Sending;