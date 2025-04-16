import React from "react"
/**
 * @file ValidationContainer.tsx - Defines the ValidationContainer component that displays the invoice validation process.
 * Includes validation steps and results display.
 */

/**
 * Validation Component
 *
 * This component renders the validation section, detailing the invoice validation process,
 * including XML wellformedness checks, schema validation, business rules validation,
 * and PEPPOL rules validation. It also displays validation results and any errors
 * or warnings that need to be addressed.
 *
 * @returns {JSX.Element} The validation section
 */

const Validation: React.FC = () => {
  return (
    <section id="validation" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        Validation
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        Our platform validates UBL XML invoices against Australian e-invoicing
        standards using the ESS Validator.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Validation Process
      </h3>
      <p className="mt-4 text-secondary-700">
        The validation process includes several checks to ensure the invoice
        complies with Australian e-invoicing standards:
      </p>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>
          <strong>XML Wellformedness:</strong> Checks that the XML is properly
          formed
        </li>
        <li>
          <strong>Schema Validation:</strong> Validates against the UBL 2.1 XML
          Schema
        </li>
        <li>
          <strong>Business Rules:</strong> Checks compliance with EN16931
          business rules
        </li>
        <li>
          <strong>PEPPOL Rules:</strong> Validates against Australia-specific
          PEPPOL rules
        </li>
      </ul>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Description
      </h3>
      <ul className="mt-2 list-disc pl-5 text-secondary-700">
        <li>Takes invoice XML file as input</li>
        <li>Generates a report in json format as output</li>
      </ul>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Validation Report format
      </h3>
      <p className="mt-4 text-secondary-700">
        The high level structure is the following:
      </p>
      <ul className="list-none pl-5 text-secondary-700">
        <li>
          - Overall Validation result (Successful or Not, and Summary of the
          result)
        </li>
        <li>
          - List of individual Validations, one Section for each Set of Rules:
          <ul className="list-none pl-5">
            <li>
              - For Each Set of Rules: List of Failed Validations:
              <ul className="list-none pl-5">
                <li>
                  - For Each Failed Validation:
                  <ul className="list-none pl-5">
                    <li>- id=Rule Code</li>
                    <li>- text=Description of the Validation error</li>
                    <li>- location=the XPath of the data (path in the XML)</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <div className="mt-4 border border-secondary-200 rounded-md">
        <div className="bg-secondary-50 px-4 py-2 border-b border-secondary-200">
          <h4 className="text-md font-medium text-secondary-900">
            Example of Failed report:{" "}
          </h4>
        </div>
        <div className="p-4">
          <div className="bg-secondary-800 rounded-md overflow-auto">
            <pre className="text-xs text-secondary-100 p-4 font-mono">
              {`{
  "customer": "Online validation tool",
  "successful": false,
  "message": "Schematron validation on file 'invoice.xml' completed with status: FAILED. Total failed assertions count= 2. Failed assertions codes: { PEPPOL-EN16931-R007-AUNZ-SB, PEPPOL-EN16931-R004-AUNZ-SB }. Total reports count= 0.",
  "report": {
    "successful": false,
    "summary": "Validation failed. Check individual validation reports for details",
    "filename": "invoice.xml",
    "reports": {
      "AUNZ_PEPPOL_SB_1_0_10": {
        "rules": "AUNZ_PEPPOL_SB_1_0_10",
        "successful": false,
        "summary": "Validation result for AUNZ_PEPPOL_SB_1_0_10: Failed. Failed assertions count = 2. Assertion errors: { PEPPOL-EN16931-R007-AUNZ-SB, PEPPOL-EN16931-R004-AUNZ-SB }. Schematron Reports fired: no schematron reports fired.",
        "firedAssertionErrors": [
          {
            "id": "PEPPOL-EN16931-R007-AUNZ-SB",
            "text": "Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:selfbilling:NN:1.0' where NN indicates the process number.",
            "location": "/*:Invoice[namespace-uri()='urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'][1]",
            "test": "$profile != 'Unknown'",
            "flag": "fatal"
          },
          {
            "id": "PEPPOL-EN16931-R004-AUNZ-SB",
            "text": "Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:selfbilling:international:aunz:3.0'.",
            "location": "/*:Invoice[namespace-uri()='urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'][1]",
            "test": "starts-with(normalize-space(cbc:CustomizationID/text()), 'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:selfbilling:international:aunz:3.0')",
            "flag": "fatal"
          }
        ],
        "firedSuccessfulReports": [],
        "firedAssertionErrorsCount": 2,
        "firedSuccessfulReportsCount": 0,
        "firedAssertionErrorCodes": [
          "PEPPOL-EN16931-R007-AUNZ-SB",
          "PEPPOL-EN16931-R004-AUNZ-SB"
        ]
      },
      "AUNZ_UBL_1_0_10": {
        "rules": "AUNZ_UBL_1_0_10",
        "successful": true,
        "summary": "Validation result for AUNZ_UBL_1_0_10: Successful. No assertion errors fired. Schematron Reports fired: no schematron reports fired.",
        "firedAssertionErrors": [],
        "firedSuccessfulReports": [],
        "firedAssertionErrorsCount": 0,
        "firedSuccessfulReportsCount": 0,
        "firedAssertionErrorCodes": []
      }
    },
    "firedAssertionErrorsCount": 2,
    "allAssertionErrorCodes": [
      "PEPPOL-EN16931-R007-AUNZ-SB",
      "PEPPOL-EN16931-R004-AUNZ-SB"
    ],
    "firedSuccessfulReportsCount": 0
  }
}

`}
            </pre>
          </div>
        </div>
      </div>

      {/* <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Validation Results
      </h3>
      <p className="mt-4 text-secondary-700">
        After validation, our platform displays the results, including any
        errors or warnings that need to be addressed. If the invoice passes
        validation, it's ready to be sent.
      </p> */}

      {/* <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-secondary-900">
              Successful Validation
            </h4>
            <div className="mt-4 flex items-center">
              <svg
                className="h-8 w-8 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-900">
                  Invoice is valid
                </p>
                <p className="text-sm text-secondary-500">
                  All validation checks passed
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-green-600">
                <svg
                  className="h-5 w-5 mr-1.5"
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
                XML is well-formed
              </li>
              <li className="flex items-center text-sm text-green-600">
                <svg
                  className="h-5 w-5 mr-1.5"
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
                Schema validation passed
              </li>
              <li className="flex items-center text-sm text-green-600">
                <svg
                  className="h-5 w-5 mr-1.5"
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
                Business rules validation passed
              </li>
              <li className="flex items-center text-sm text-green-600">
                <svg
                  className="h-5 w-5 mr-1.5"
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
                PEPPOL rules validation passed
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-secondary-900">
              Failed Validation
            </h4>
            <div className="mt-4 flex items-center">
              <svg
                className="h-8 w-8 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-900">
                  Invoice is invalid
                </p>
                <p className="text-sm text-secondary-500">
                  Validation errors found
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-green-600">
                <svg
                  className="h-5 w-5 mr-1.5"
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
                XML is well-formed
              </li>
              <li className="flex items-center text-sm text-green-600">
                <svg
                  className="h-5 w-5 mr-1.5"
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
                Schema validation passed
              </li>
              <li className="flex items-center text-sm text-red-600">
                <svg
                  className="h-5 w-5 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Business rules validation failed
              </li>
              <li className="flex items-center text-sm text-red-600">
                <svg
                  className="h-5 w-5 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                PEPPOL rules validation failed
              </li>
            </ul>
            <div className="mt-4 bg-red-50 p-3 rounded-md">
              <h5 className="text-sm font-medium text-red-800">
                Error Details
              </h5>
              <ul className="mt-2 text-sm text-red-700 list-disc pl-5">
                <li>Missing mandatory field: Buyer reference</li>
                <li>
                  Invalid tax category: Must be one of S, Z, E, AE, K, G, O, L,
                  M
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default Validation
