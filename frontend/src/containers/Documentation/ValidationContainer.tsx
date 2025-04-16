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
        Validation Results
      </h3>
      <p className="mt-4 text-secondary-700">
        After validation, our platform displays the results, including any
        errors or warnings that need to be addressed. If the invoice passes
        validation, it's ready to be sent.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
      </div>
    </section>
  )
}

export default Validation
