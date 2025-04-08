import React, { useState } from "react"
import { FileText } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import { useNavigate } from "react-router-dom"
import { useConnectReckon } from "@/hooks/reckon/useConnectReckon"
import { Demo_RECKON_BOOK_ID } from "@/constants"
import { useUser } from "@clerk/clerk-react"

const SelectIntegrationPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    "reckon" | "other" | null
  >(null)
  const navigate = useNavigate()
  const connectReckon = useConnectReckon()
  const { user } = useUser()

  const handleUseDemoAccount = () => {
    localStorage.setItem("bookId", Demo_RECKON_BOOK_ID) // Set bookId in localStorage
    localStorage.setItem("sessionId", "888")
    navigate("/dashboard") // Redirect to the dashboard
  }

  const handleConnectReckon = async () => {
    try {
      const userId = user?.username
      if (!userId) {
        throw new Error("User ID is required")
      }
      const redirectUrl = await connectReckon.mutateAsync(userId)
      window.location.href = redirectUrl // Redirect to the Reckon authentication URL
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to connect to Reckon:", error.message)
      } else {
        console.error("Unknown error:", error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader
              title="Welcome to InvoiceFlow"
              icon={FileText}
              gradient={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {/* Left Side: Options - reduced to 1/4 of the space */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Select Invoice API
                </h2>
                <div className="space-y-4">
                  <button
                    className={`w-full py-2 px-4 rounded-lg ${
                      selectedOption === "reckon"
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedOption("reckon")}
                  >
                    Reckon One API
                  </button>
                  <button
                    className={`w-full py-2 px-4 rounded-lg ${
                      selectedOption === "other"
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedOption("other")}
                  >
                    Other API
                  </button>
                </div>
              </div>

              {/* Right Side: Content - increased to 3/4 of the space */}
              <div className="bg-white shadow rounded-lg p-6 md:col-span-3">
                {selectedOption === "reckon" ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Reckon One Integration
                    </h2>
                    <div className="space-x-4">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                        onClick={handleConnectReckon} // Connect button handler
                      >
                        Connect
                      </button>
                      <button
                        className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg"
                        onClick={handleUseDemoAccount} // Use Demo Account button handler
                      >
                        Use Demo Account
                      </button>
                    </div>
                  </div>
                ) : selectedOption === "other" ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Other API Integration
                    </h2>
                    <p className="text-gray-600">
                      Other APIs are under development...
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Please select the invoice API you wish to use.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SelectIntegrationPage
