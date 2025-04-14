/**
 * @file CustomerContentHeader.tsx - Defines the CustomerContentHeader component, which provides the header for customer management views.
 * It includes navigation and action buttons for managing customers.
 */

/**
 * CustomerContentHeader Component
 *
 * This component renders the header for customer management, including the page title, description, and a button to add new customers.
 *
 * @returns {JSX.Element} The customer management header.
 */

import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import PageHeader from "@/components/common/PageHeader"
import { Users } from "lucide-react"

const CustomerContentHeader: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Customer Management"
        description="Manage your customer relationships efficiently"
        icon={Users}
        gradient={true}
      />

      <div className="flex justify-end mb-4">
        <Link to="/customers/create">
          <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white">
            Add Customer
          </Button>
        </Link>
      </div>
    </>
  )
}

export default CustomerContentHeader
