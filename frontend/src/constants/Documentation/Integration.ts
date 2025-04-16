/**
 * @file Integration.ts - Defines static text used to explain the Reckon One integration process.
 *
 * ** Includes user-facing descriptions for authentication, book selection, and API usage.
 * ** Provides a structured list of API endpoints involved in the integration process.
 */

/**
 * reckonIntegrationText Object
 *
 * Contains sectioned instructional text for users on how Reckon One is integrated into the platform.
 * Structured for use in UI pages or documentation panels related to API connectivity and usage.
 *
 * @returns {object} - Instructional content including intro text, step explanations, and API endpoint summaries.
 */
// reckonIntegrationText.ts

export const reckonIntegrationText = {
  title: "Reckon One Integration",
  intro:
    "Our platform integrates with Reckon One to create and manage invoices. This section explains how the integration works.",
  authentication: {
    title: "Authentication",
    content:
      "To connect with Reckon One, you need to authenticate using your Reckon credentials. Our platform securely stores your connection details and uses them to interact with the Reckon One API.",
  },
  bookSelection: {
    title: "Book Selection",
    content:
      'Reckon One organizes data into "books." After authentication, you\'ll need to select which book to use for your e-invoices. The bookId is a crucial parameter used in all API calls to Reckon One.',
  },
  importantNote: {
    title: "Important Note",
    content:
      "All API calls to Reckon One require a bookId parameter. This identifies which set of business data to work with. You can find your available books in the Reckon One dashboard or through our platform's settings page.",
  },
  apiEndpoints: {
    title: "API Endpoints Used",
    list: [
      {
        endpoint: "GET /ReckonAuth/login",
        description: "Authenticate the user via ReckonAuth login endpoint",
      },
      {
        endpoint: "GET /books",
        description: " Retrieve the list of all books",
      },
      {
        endpoint: "GET POST /{bookId}/customers",
        description: "Get a list of customers or create a new customer",
      },
      {
        endpoint: "GET PUT DELETE /{bookId}/customers/{customerId}",
        description: "Retrieve, update, or delete a customer by ID",
      },
      {
        endpoint: "GET POST /{bookId}/invoices",
        description: "Retrieve a list of invoices or create a new",
      },
      {
        endpoint: "GET PUT DELETE /{bookId}/invoices/{invoiceId}",
        description: "Get, update, or delete an invoice by ID",
      },
      {
        endpoint: "GET /{bookId}/invoices/{invoiceId}/pdf",
        description: "Download or preview invoice PDF",
      },
      {
        endpoint: "POST /{bookId}/invoices/{invoiceId}/email",
        description: "Send invoice to recipient via email",
      },
      {
        endpoint: "GET POST /{bookId}/items",
        description: "Retrieve a list of items or create a new item",
      },
      {
        endpoint: "GET PUT DELETE /{bookId}/items/{itemId}",
        description: "Get, update, or delete an item by ID",
      },
      {
        endpoint: "GET /{bookId}/ledgerAccounts",
        description: "Retrieve all ledger accounts for the specified book",
      },
      {
        endpoint: "GET /{bookId}/terms",
        description: "Retrieve a list of terms associated with a book",
      },
      {
        endpoint: "GET /{bookId}/terms/{termId}/duedate/basedate/{invoiceDate}",
        description:
          "Calculate the due date based on selected payment term and invoice date",
      },
      {
        endpoint: "POST /ReckonAuth/callback",
        description:
          "Callback endpoint to exchange OAuth code and state for tokens",
      },
      {
        endpoint: "GET /{bookId}/UserData",
        description: "Retrieve user data",
      },
    ],
  },
}
