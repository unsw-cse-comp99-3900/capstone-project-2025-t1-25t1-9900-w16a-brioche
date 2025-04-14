/**
 * @file ReckonIntegrationContainer.tsx - Defines the ReckonIntegrationContainer component, which details the integration with Reckon One.
 * It covers authentication, book selection, and API endpoints.
 */

import React from "react"
import { reckonIntegrationText } from "@/constants/Documentation/Integration"

/**
 * ReckonIntegrationContainer Component
 *
 * This component renders the section detailing the integration with Reckon One, including authentication, book selection,
 * and available API endpoints.
 *
 * @returns {JSX.Element} The Reckon One integration section.
 */
const ReckonIntegration: React.FC = () => {
  return (
    <section id="reckon-integration" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">
        {reckonIntegrationText.title}
      </h2>
      <p className="mt-4 text-lg text-secondary-500">
        {reckonIntegrationText.intro}
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        {reckonIntegrationText.authentication.title}
      </h3>
      <p className="mt-4 text-secondary-700">
        {reckonIntegrationText.authentication.content}
      </p>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        {reckonIntegrationText.bookSelection.title}
      </h3>
      <p className="mt-4 text-secondary-700">
        {reckonIntegrationText.bookSelection.content}
      </p>

      <div className="mt-4 bg-secondary-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-secondary-900">
          {reckonIntegrationText.importantNote.title}
        </h4>
        <p className="mt-2 text-sm text-secondary-700">
          {reckonIntegrationText.importantNote.content}
        </p>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">
        {reckonIntegrationText.apiEndpoints.title}
      </h3>
      <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-secondary-300">
          <thead className="bg-secondary-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-secondary-900 sm:pl-6"
              >
                Endpoint
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200 bg-white">
            {reckonIntegrationText.apiEndpoints.list.map((item, idx) => (
              <tr key={idx}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-secondary-900 sm:pl-6">
                  {item.endpoint}
                </td>
                <td className="px-3 py-4 text-sm text-secondary-500">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ReckonIntegration
