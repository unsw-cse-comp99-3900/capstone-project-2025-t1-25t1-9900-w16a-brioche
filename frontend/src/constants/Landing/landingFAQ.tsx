/**
 * @file landingFAQ.tsx - Provides FAQ content and help section for the landing page.
 *
 * ** Defines structured question-and-answer entries used in the FAQ accordion.
 * ** Includes help CTA section and embedded icons for enhanced visual presentation.
 */

/**
 * landingFAQ Object
 *
 * Contains content for the FAQ section of the landing page, including:
 * - Static headings
 * - Help section (with CTA buttons)
 * - List of expandable FAQ items
 *
 * @returns {object} - Structured data for rendering landing page FAQ and support section.
 */

export const landingFAQ = {
  contactEmail: "contact@invoice-flow.org",
  content: {
    tagText: "Support",
    headingText: "Frequently Asked Questions",
    subheadingText:
      "Find answers to common questions about our e-invoicing platform.",
  },
  helpSection: {
    title: "Still have questions?",
    description:
      "Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.",
    buttons: [
      {
        text: "Contact Email",
        href: "mailto:zanema528@gmail.com",
        primary: true,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        ),
      },
      {
        text: "View Documentation",
        href: "/documentation",
        primary: false,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        ),
      },
    ],
  },
  faqItems: [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      question: "What is e-invoicing?",
      answer: (
        <>
          <p className="text-gray-600 leading-relaxed">
            E-invoicing is the exchange of invoice documents between a supplier
            and a buyer in an integrated electronic format. Unlike PDFs or
            scanned documents, e-invoices are structured digital documents (like
            UBL XML) that can be processed automatically by accounting systems.
            In Australia, e-invoicing follows the PEPPOL framework and helps
            businesses reduce processing time and errors.
          </p>
          <div className="mt-4 flex items-center text-sm text-primary-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <a href="/documentation" className="font-medium hover:underline">
              View our API documentation for more details
            </a>
          </div>
        </>
      ),
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      ),
      question: "How does the Reckon One integration work?",
      answer: (
        <>
          <p className="text-gray-600 leading-relaxed">
            Our platform integrates directly with Reckon One's API to create and
            manage invoices. After connecting your Reckon One account, you can
            create invoices either manually or by uploading PDF files. The
            platform then automatically converts these invoices to format that
            for e-invoicing compliance. The integration requires your Reckon One
            credentials and bookId to access your business data.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Reckon One API
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              PDF AI Conversion
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Automated Workflow
            </span>
          </div>
        </>
      ),
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      question: "What is the validation process?",
      answer: (
        <>
          <p className="text-gray-600 leading-relaxed">
            Our platform validates invoices against Australian e-invoicing
            standards using the AI Validator. The validation process checks for
            basic PEPPOL compliance.
          </p>
          <p className="mt-4 text-gray-600">
            If validation fails, you'll receive detailed error messages to help
            you fix the issues. Once validated, invoices can be sent directly to
            recipients.
          </p>
        </>
      ),
    },
    {
      id: 4,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      question: "How can I send invoices to my customers?",
      answer: (
        <>
          <p className="text-gray-600 leading-relaxed">
            After an invoice has been validated, our platform offers Email
            delivery method to send it to your customers:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary-50 p-4 rounded-lg">
              <h4 className="font-medium text-secondary-900 mb-2">Email</h4>
              <p className="text-sm text-secondary-700">
                Send invoices via email with both PDF and UBL XML attachments.
                Recipients can view the PDF and process the UBL XML if their
                systems support it.
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Email delivery is accessible directly from the validation results
            page, making the process seamless and efficient.
          </p>
        </>
      ),
    },
    {
      id: 5,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      question: "What are the benefits of using this platform?",
      answer: (
        <>
          <p className="text-gray-600 leading-relaxed">
            Our e-invoicing platform offers several key benefits for SMEs:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
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
              </div>
              <span className="text-sm text-gray-600">
                Easy to use and user friendly
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
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
              </div>
              <span className="text-sm text-gray-600">
                Reduced errors and fraud risk
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
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
              </div>
              <span className="text-sm text-gray-600">
                Increased efficiency (up to 75%)
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
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
              </div>
              <span className="text-sm text-gray-600">
                Reduced environmental impact
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
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
                </div>
              </div>
              <span className="text-sm text-gray-600">
                Australian standards compliance
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-gray-600">
                Streamlined automated workflow
              </span>
            </div>
          </div>
        </>
      ),
    },
  ],
}

export default landingFAQ
