import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookCustomer } from "@/hooks/book/useBookCustomer"

const BookContainer: React.FC = () => {
  const navigate = useNavigate()

  const { data: customers = [], isLoading, error } = useBookCustomer()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-center">
          <h3 className="text-lg font-semibold">Error loading customers</h3>
          <p className="text-sm">{(error as Error).message}</p>
        </div>
      </div>
    )
  }

  // const handleNavigate = (customerId: string) => {
  //   navigate(`/customer/${customerId}`)
  // }

  const handleNavigate = (bookId: string) => {
    localStorage.setItem("bookId", bookId)
    navigate("/dashboard")
  }

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          There are no books here
        </h2>
        <div className="flex space-x-4">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Add Book
          </Button>
          <Button className="bg-gray-600 text-white hover:bg-gray-700">
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                Book Name:
              </CardTitle>
              {/* <CardDescription>view details</CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col justify-between min-h-[200px]">
              <div className="text-3xl font-bold text-primary">
                {customer.name}
              </div>
              <div className="mt-auto flex justify-center">
                <Button
                  type="button"
                  // onClick={() => handleNavigate(customer.id)}
                  onClick={() => handleNavigate(customer.id)}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BookContainer
