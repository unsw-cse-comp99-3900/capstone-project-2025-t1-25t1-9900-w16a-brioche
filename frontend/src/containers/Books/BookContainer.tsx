/**
 * @file BookContainer.tsx - Defines the BookContainer component, which manages the display and interaction of book-related data.
 * It handles loading states, error handling, and displays a list of books or relevant messages.
 */

import React from "react"
import { Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookCustomer } from "@/hooks/book/useBookCustomer"
import { AxiosError } from "axios"

interface BookContainerProps {
  onNavigate: (bookId: string) => void
  isConnected: boolean
  onBack?: () => void
}

/**
 * BookContainer Component
 *
 * This component renders the main container for displaying books, including loading states, error messages,
 * and a list of books with navigation options.
 *
 * @param {BookContainerProps} props - The properties for the BookContainer component.
 * @returns {JSX.Element} The book display container.
 */
const BookContainer: React.FC<BookContainerProps> = ({
  onNavigate,
  isConnected,
  onBack,
}) => {
  const { data: customers = [], isLoading, error } = useBookCustomer()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    // Check if the error is a 404 (no books found)
    const is404Error = (error as AxiosError).status === 404

    if (is404Error) {
      return (
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Books Found
          </h3>
          <p className="text-gray-600 mb-4">
            You don't have any books connected to your account yet.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">You can:</p>
            <p className="text-sm">
              Visit{" "}
              <a
                href="https://portal.reckon.com/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                portal.reckon.com
              </a>{" "}
              to purchase a book, or use the Demo Account in the top-right
              corner.
            </p>
            {!isConnected && onBack && (
              <div className="mt-4">
                <Button
                  className="bg-gray-600 text-white hover:bg-gray-700"
                  onClick={onBack}
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="text-red-600 text-center">
        <h3 className="text-lg font-semibold">Error loading books</h3>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    )
  }

  if (customers.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No Books Available
        </h3>
        <p className="text-gray-600 mb-4">
          Your account doesn't have any books available at the moment.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Visit{" "}
            <a
              href="https://portal.reckon.com/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              portal.reckon.com
            </a>{" "}
            to manage your books.
          </p>
          {!isConnected && onBack && (
            <div className="mt-4">
              <Button
                className="bg-gray-600 text-white hover:bg-gray-700"
                onClick={onBack}
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {customers.map((customer) => (
        <Card
          key={customer.id}
          className="shadow-md border-0 bg-gradient-to-br from-white/80 to-slate-100
          dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300 hover:shadow-xl
          hover:translate-y-[-3px] hover:bg-gradient-to-br hover:from-white/90 hover:to-blue-50
          dark:hover:from-slate-800 dark:hover:to-blue-900/20 group"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div
                className="p-2 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-primary-600
                group-hover:text-white transition-colors duration-300"
              >
                <Book className="h-5 w-5" />
              </div>
              Book:
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between min-h-[160px]">
            <div className="text-lg font-bold text-primary">
              {customer.name}
            </div>
            <div className="mt-auto flex justify-center">
              <Button
                type="button"
                onClick={() => onNavigate(customer.id)}
                className="bg-primary-600 hover:bg-primary-700 text-white w-full"
              >
                Open
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {!isConnected && onBack && (
        <div className="col-span-full mt-4">
          <Button
            className="bg-gray-600 text-white hover:bg-gray-700"
            onClick={onBack}
          >
            Back to Connection Options
          </Button>
        </div>
      )}
    </div>
  )
}

export default BookContainer
