/**
 * @file EditCustomerPage.tsx - Defines the EditCustomerPage component, which renders the page layout for editing an existing customer.
 * * It includes the page header and the EditCustomerContainer component.
 */

/**
 * EditCustomerPage Component
 *
 * * This component renders the main layout for the edit customer page, including a decorative background,
 *   a header with title and icon, and the form container for customer editing.
 *
 * @returns {JSX.Element} The full page structure for updating an existing customer.
 */

import React from "react"
import { UserCog } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import { EditCustomerContainer } from "@/containers/Customers"

const EditCustomerPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader title="Edit Customer" icon={UserCog} gradient={true} />
            <EditCustomerContainer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditCustomerPage
