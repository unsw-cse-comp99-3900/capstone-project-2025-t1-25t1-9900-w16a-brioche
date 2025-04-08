import React from "react"
import PageHeader from "@/components/common/PageHeader"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Book, FilePlus2, FileUp } from "lucide-react"

const DashboardHeaderContainer: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to your invoice management dashboard"
      ></PageHeader>
      <div className="flex items-center space-x-2">
        <Link to="/select">
          <Button size="icon" variant="outline" className="h-10 w-10">
            <Book size={18} />
          </Button>
        </Link>
        <div className="group relative">
          <Button size="lg" className="text-md">
            <FilePlus2 className="mr-2" /> Create Invoice
          </Button>
          <div className="absolute right-0 mt-2 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1">
              <Link to="/invoices/create" className="block">
                <div className="flex items-center px-4 py-2 text-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                  <FilePlus2 className="mr-2 h-4 w-4" />
                  <span>Create Manually</span>
                </div>
              </Link>
              <Link to="/invoices/upload" className="block">
                <div className="flex items-center px-4 py-2 text-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                  <FileUp className="mr-2 h-4 w-4" />
                  <span>Upload PDF</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeaderContainer
