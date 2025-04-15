/**
 * @file CustomersPage.tsx - Defines the CustomersPage component, which renders the main page for managing customers.
 * * It includes the header and table components for displaying customer data.
 */

/**
 * CustomersPage Component
 *
 * * This component renders the main layout for the customers page, including a decorative background,
 *   a content header, and the table that displays customer records.
 *
 * @returns {JSX.Element} The full page layout for viewing and managing customers.
 */

import React from "react"
import {
  CustomerContentHeader,
  CustomerTableContainer,
} from "@/containers/Customers"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

const CustomersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <CustomerContentHeader />
        <CustomerTableContainer />
      </div>
    </div>
  )
}

export default CustomersPage
