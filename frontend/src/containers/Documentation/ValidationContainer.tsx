import React from "react"
/**
 * @file ValidationContainer.tsx - Defines the ValidationContainer component.
 * This section introduces our invoice validation strategy including Gemini 2.0 automatic checking and optional ESS external validation.
 */

const Validation: React.FC = () => {
  return (
    <section id="validation" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        Validation
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        Our platform provides automatic invoice validation using Gemini 2.0,
        helping users ensure data correctness before submission.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        Gemini 2.0 Validation
      </h3>
      <p className="mt-4 text-secondary-700">
        After uploading a PDF invoice, Gemini 2.0 automatically verifies the
        content and provides a detailed validation report. This report helps
        users identify and fix any formatting or logic issues—such as missing
        fields, inconsistent dates, or tax mismatches—before finalizing the
        invoice.
      </p>

      <p className="mt-4 text-secondary-700">
        The validation feedback is user-friendly and updated in real-time as
        users modify the form.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        External Validation via ESS Validator (Optional)
      </h3>
      <p className="mt-4 text-secondary-700">
        For users who want to perform official compliance checks, we recommend
        the use of the <strong>ESS Validator</strong>, which is an external tool
        provided for verifying e-invoicing standards such as UBL 2.1, EN16931,
        and PEPPOL A-NZ rules.
      </p>
      <p className="mt-4 text-secondary-700">
        You can download the generated invoice and upload it to the ESS
        Validator tool for external validation. This is especially useful for
        auditors or organizations with strict compliance requirements.
      </p>
    </section>
  )
}

export default Validation
