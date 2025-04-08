import React from "react"

const UBLConversion: React.FC = () => {
  return (
    <section id="ubl-conversion" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        UBL Conversion
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        After creating an invoice in Reckon One, our platform automatically
        converts it to UBL XML format, which is required for Australian
        e-invoicing.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Conversion Process
      </h3>
      <p className="mt-4 text-secondary-700">
        The conversion process maps Reckon One invoice fields to their
        corresponding UBL XML elements. This includes:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Invoice header information (ID, issue date, due date)</li>
        <li>Supplier details (name, ABN, address, contact information)</li>
        <li>Customer details (name, ABN, address, contact information)</li>
        <li>Line items (description, quantity, unit price, tax)</li>
        <li>Payment terms and instructions</li>
      </ul>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        UBL XML Structure
      </h3>
      <p className="mt-4 text-secondary-700">
        The UBL XML follows the structure required by the Australian e-invoicing
        standard, which is based on the PEPPOL BIS Billing 3.0 specification.
      </p>

      <div className="mt-4 border border-secondary-200 rounded-md">
        <div className="bg-secondary-50 px-4 py-2 border-b border-secondary-200">
          <h4 className="text-md font-medium text-secondary-900">
            Sample UBL XML Structure
          </h4>
        </div>
        <div className="p-4">
          <div className="bg-secondary-800 rounded-md overflow-auto">
            <pre className="text-xs text-secondary-100 p-4 font-mono">
              {`<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" 
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" 
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>INV-2023-001</cbc:ID>
  <cbc:IssueDate>2023-07-15</cbc:IssueDate>
  <cbc:DueDate>2023-08-15</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>AUD</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>PO-2023-001</cbc:BuyerReference>
  
  <!-- Supplier Information -->
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0151">47555222000</cbc:EndpointID>
      <cac:PartyIdentification>
        <cbc:ID>47555222000</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>Supplier Company Name</cbc:Name>
      </cac:PartyName>
      <!-- Address and contact details -->
    </cac:Party>
  </cac:AccountingSupplierParty>
  
  <!-- Customer Information -->
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0151">91888333000</cbc:EndpointID>
      <cac:PartyIdentification>
        <cbc:ID>91888333000</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>Customer Company Name</cbc:Name>
      </cac:PartyName>
      <!-- Address and contact details -->
    </cac:Party>
  </cac:AccountingCustomerParty>
  
  <!-- Payment Terms -->
  <cac:PaymentTerms>
    <cbc:Note>Payment due within 30 days</cbc:Note>
  </cac:PaymentTerms>
  
  <!-- Tax Information -->
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="AUD">10.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="AUD">100.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="AUD">10.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>10</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>GST</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  
  <!-- Invoice Totals -->
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="AUD">100.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="AUD">100.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="AUD">110.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="AUD">110.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  
  <!-- Invoice Line Items -->
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="EA">1</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="AUD">100.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>Web Development Services</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>10</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>GST</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="AUD">100.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UBLConversion
