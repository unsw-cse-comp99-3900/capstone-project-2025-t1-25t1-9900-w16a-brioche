import React from 'react';

const ReckonIntegration: React.FC = () => {
  return (
    <section id="reckon-integration" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">Reckon One Integration</h2>
      <p className="mt-4 text-lg text-secondary-500">
        Our platform integrates with Reckon One to create and manage invoices. This section explains how the integration works.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">Authentication</h3>
      <p className="mt-4 text-secondary-700">
        To connect with Reckon One, you need to authenticate using your Reckon credentials. Our platform securely stores your connection details and uses them to interact with the Reckon One API.
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">Book Selection</h3>
      <p className="mt-4 text-secondary-700">
        Reckon One organizes data into "books." After authentication, you'll need to select which book to use for your e-invoices. The <code>bookId</code> is a crucial parameter used in all API calls to Reckon One.
      </p>

      <div className="mt-4 bg-secondary-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-secondary-900">Important Note</h4>
        <p className="mt-2 text-sm text-secondary-700">
          All API calls to Reckon One require a <code>bookId</code> parameter. This identifies which set of business data to work with. You can find your available books in the Reckon One dashboard or through our platform's settings page.
        </p>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">API Endpoints Used</h3>
      <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-secondary-300">
          <thead className="bg-secondary-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-secondary-900 sm:pl-6">Endpoint</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200 bg-white">
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-secondary-900 sm:pl-6">GET /{'{bookId}'}/invoices</td>
              <td className="px-3 py-4 text-sm text-secondary-500">Retrieves a list of invoices from the specified book</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-secondary-900 sm:pl-6">POST /{'{bookId}'}/invoices</td>
              <td className="px-3 py-4 text-sm text-secondary-500">Creates a new invoice in the specified book</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-secondary-900 sm:pl-6">GET /{'{bookId}'}/invoices/{'{id}'}</td>
              <td className="px-3 py-4 text-sm text-secondary-500">Retrieves a specific invoice by ID</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-secondary-900 sm:pl-6">GET /{'{bookId}'}/contacts</td>
              <td className="px-3 py-4 text-sm text-secondary-500">Retrieves customer contacts for invoice creation</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-secondary-900 sm:pl-6">GET /{'{bookId}'}/tax-rates</td>
              <td className="px-3 py-4 text-sm text-secondary-500">Retrieves available tax rates for invoice line items</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReckonIntegration;