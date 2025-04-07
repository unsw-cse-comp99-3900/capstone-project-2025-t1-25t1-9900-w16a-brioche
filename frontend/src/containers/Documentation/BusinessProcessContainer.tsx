import React from 'react';

const BusinessProcess: React.FC = () => {
  return (
    <section id="business-process" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">Business Process Flow</h2>
      <p className="mt-4 text-lg text-secondary-500">
        Our e-invoicing platform follows a streamlined process to create, validate, and send e-invoices.
      </p>

      {/* Process Flow Diagram */}
      <div className="mt-6 bg-white p-6 rounded-lg border border-secondary-200">
        <div className="flex flex-col items-center">
          {/* Step 1 */}
          <div className="flex items-center justify-center w-64 h-20 bg-primary-50 rounded-lg border border-primary-200 text-center p-4">
            <div>
              <div className="font-medium text-primary-700">1. Invoice Creation</div>
              <div className="text-xs text-primary-600 mt-1">CSV/Excel/Manual Entry</div>
            </div>
          </div>
          {/* Arrow */}
          <div className="h-8 w-0.5 bg-secondary-300"></div>
          {/* Step 2 */}
          <div className="flex items-center justify-center w-64 h-20 bg-green-50 rounded-lg border border-green-200 text-center p-4">
            <div>
              <div className="font-medium text-green-700">2. UBL XML Conversion</div>
              <div className="text-xs text-green-600 mt-1">Australian Standard Format</div>
            </div>
          </div>
          {/* Arrow */}
          <div className="h-8 w-0.5 bg-secondary-300"></div>
          {/* Step 3 */}
          <div className="flex items-center justify-center w-64 h-20 bg-blue-50 rounded-lg border border-blue-200 text-center p-4">
            <div>
              <div className="font-medium text-blue-700">3. Invoice Validation</div>
              <div className="text-xs text-blue-600 mt-1">ESS Validator</div>
            </div>
          </div>
          {/* Arrow */}
          <div className="h-8 w-0.5 bg-secondary-300"></div>
          {/* Step 4 */}
          <div className="flex items-center justify-center w-64 h-20 bg-yellow-50 rounded-lg border border-yellow-200 text-center p-4">
            <div>
              <div className="font-medium text-yellow-700">4. Invoice Sending</div>
              <div className="text-xs text-yellow-600 mt-1">Email or PEPPOL Network</div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">Process Description</h3>
      
      <div className="mt-4 space-y-6">
        <div>
          <h4 className="text-lg font-medium text-primary-700">1. Invoice Creation</h4>
          <p className="mt-2 text-secondary-700">
            Create invoices using one of two methods:
          </p>
          <ul className="mt-2 list-disc pl-5 text-secondary-700">
            <li>Upload a CSV or Excel file with invoice data</li>
            <li>Manually enter invoice details through our form</li>
          </ul>
          <p className="mt-2 text-secondary-700">
            The invoice data is sent to the Reckon One API to create a standard invoice in their format.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-green-700">2. UBL XML Conversion</h4>
          <p className="mt-2 text-secondary-700">
            After creating the invoice in Reckon One, our platform automatically converts it to UBL XML format, which is the standard required for Australian e-invoicing. This conversion maps all relevant fields to their corresponding UBL XML elements.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium text-blue-700">3. Invoice Validation</h4>
          <p className="mt-2 text-secondary-700">
            The UBL XML invoice is validated against Australian e-invoicing standards using the ESS Validator. This validation includes:
          </p>
          <ul className="mt-2 list-disc pl-5 text-secondary-700">
            <li>XML wellformedness checking</li>
            <li>Schema validation against UBL 2.1 XSD</li>
            <li>Business rules validation (EN16931)</li>
            <li>PEPPOL rules validation (Australia-specific)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-medium text-yellow-700">4. Invoice Sending</h4>
          <p className="mt-2 text-secondary-700">
            Once validated, the invoice can be sent using one of two methods:
          </p>
          <ul className="mt-2 list-disc pl-5 text-secondary-700">
            <li>Email: Send via email with PDF and UBL XML attachments</li>
            <li>PEPPOL Network: Send directly to recipients on the PEPPOL network</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BusinessProcess;