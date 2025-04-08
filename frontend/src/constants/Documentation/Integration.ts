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
      "Reckon One organizes data into \"books.\" After authentication, you'll need to select which book to use for your e-invoices. The bookId is a crucial parameter used in all API calls to Reckon One.",
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
        endpoint: "GET /books",
        description: " Retrieve the list of all books",
      },
      {
        endpoint: "GET /{bookId}/classifications",
        description: " Retrieve classifications for a given book",
      },
      {
        endpoint: "GET PUT DELETE /{bookId}/classifications/{classificationId}",
        description: "Get, update, or delete a specific classification by ID",
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
        endpoint: "GET POST /{bookId}/invoices",
        description: "Retrieve a list of invoices or create a new",
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
        endpoint: "GET POST /{bookId}/items",
        description: "Retrieve a list of items or create a new item",
      },
      {
        endpoint: "GET PUT DELETE /{bookId}/items/{itemId}",
        description: "Get, update, or delete an item by ID",
      },
      {
        endpoint: "GET /{bookId}/ledgerAccounts",
        description: "Retrieve a list of ledger accounts for a given",
      },
      {
        endpoint: "GET /ReckonAuth/login",
        description: "Login using ReckonAuth",
      },
      {
        endpoint: "GET /{bookId}/terms",
        description: "Retrieve a list of terms associated with a book",
      },
      {
        endpoint: "GET /{bookId}/UserData",
        description: "Retrieve user data",
      },
    ],
  },
};
