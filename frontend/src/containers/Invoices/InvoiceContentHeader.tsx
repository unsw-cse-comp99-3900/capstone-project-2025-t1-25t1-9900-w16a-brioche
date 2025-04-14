/**
 * @file InvoiceContentHeader.tsx - Defines the header component for the invoice management page
 * Contains the page title and create invoice button with dropdown options
 */

/**
 * InvoiceContentHeader Component
 * 
 * This component renders the header section of the invoice management page,
 * including a page title with icon and a create invoice button that reveals
 * dropdown options for manual creation or PDF upload when hovered.
 * 
 * @returns {JSX.Element} The invoice content header section
 */

import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import PageHeader from "@/components/common/PageHeader"
import { FileText, FilePlus2, FileUp } from "lucide-react"

const InvoiceContentHeader: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Invoice Management"
        description="Manage your invoices efficiently"
        icon={FileText}
        gradient={true}
      />

      <div className="flex justify-end mb-4">
        <div className="group relative">
          <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white">
            Create Invoice
          </Button>
          <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1">
              <Link to="/invoices/create" className="block">
                <div className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                  <FilePlus2 className="mr-2 h-4 w-4" />
                  <span>Create Manually</span>
                </div>
              </Link>
              <Link to="/invoices/upload" className="block">
                <div className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                  <FileUp className="mr-2 h-4 w-4" />
                  <span>Upload PDF</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceContentHeader
