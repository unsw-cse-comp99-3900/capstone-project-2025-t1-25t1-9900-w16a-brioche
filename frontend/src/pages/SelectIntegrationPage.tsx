/**
 * @file SelectIntegrationPage.tsx - Defines the SelectIntegrationPage component, which allows users to choose and connect to an invoice API such as Reckon.
 * * It supports selecting a demo account, authenticating via Reckon, and selecting available books for integration.
 */

/**
 * SelectIntegrationPage Component
 *
 * * This component renders the integration selection interface, where users can:
 *   - Choose between Reckon and other invoice APIs
 *   - Connect to Reckon via OAuth and select a book
 *   - Use a demo account for testing purposes
 *   - Navigate to the dashboard after successful setup
 *
 * @returns {JSX.Element} The full page layout for selecting and managing invoice API integration.
 */

import React, { useState, useEffect } from "react"
import { FileText } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import { useNavigate } from "react-router-dom"
import { useConnectReckon } from "@/hooks/reckon/useConnectReckon"
import { Demo_RECKON_BOOK_ID } from "@/constants"
import { useUser } from "@clerk/clerk-react"
import BookContainer from "@/containers/Books/BookContainer"

const SelectIntegrationPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<"reckon" | "other">(
    "reckon"
  )
  const [showBookSelector, setShowBookSelector] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const navigate = useNavigate()
  const connectReckon = useConnectReckon()
  const { user } = useUser()

  // Check if session exists on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId")
    if (sessionId && sessionId !== "888") {
      setIsConnected(true)
    }
  }, [])

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

      // In a real implementation, after successful authentication and redirect back,
      // you would set isConnected to true and localStorage would be updated
      setIsConnected(true)
      localStorage.setItem("sessionId", "session-" + Date.now())
      setShowBookSelector(true)
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to connect to Reckon:", error.message)
      } else {
        console.error("Unknown error:", error)
      }
    }
  }

  const handleNavigateToBook = (bookId: string) => {
    localStorage.setItem("bookId", bookId)
    navigate("/dashboard")
  }

  // Effect to automatically show book selector if connected
  useEffect(() => {
    if (isConnected && selectedOption === "reckon") {
      setShowBookSelector(true)
    }
  }, [isConnected, selectedOption])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="pointer-events-none">
        <GridPatternOverlay />
      </div>

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
                    onClick={() => {
                      setSelectedOption("reckon")
                      setShowBookSelector(false)
                    }}
                  >
                    Reckon One API
                  </button>
                  <button
                    className={`w-full py-2 px-4 rounded-lg ${
                      selectedOption === "other"
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedOption("other")
                      setShowBookSelector(false)
                    }}
                  >
                    Other API
                  </button>
                </div>
              </div>

              {/* Right Side: Content - increased to 3/4 of the space */}
              <div className="bg-white shadow rounded-lg p-6 md:col-span-3 relative">
                {selectedOption === "reckon" && (
                  <div className="absolute top-4 right-4">
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm"
                      onClick={handleUseDemoAccount}
                    >
                      Use Demo Account
                    </button>
                  </div>
                )}

                {selectedOption === "reckon" ? (
                  showBookSelector || isConnected ? (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      <h2 className="text-lg font-semibold mb-4">
                        Select a Book to Open
                      </h2>
                      <BookContainer
                        onNavigate={handleNavigateToBook}
                        isConnected={isConnected}
                        onBack={() => setShowBookSelector(false)}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        Reckon One Integration
                      </h2>

                      {/* Tutorial guidance for new users */}
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-md font-medium text-blue-800 mb-2">
                          Getting Started
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                          <li>
                            If you already have a Reckon account, click{" "}
                            <span className="font-semibold">Connect</span> to
                            link your account.
                          </li>
                          <li>
                            New to Reckon one? Click{" "}
                            <span className="font-semibold">
                              Use Demo Account
                            </span>{" "}
                            in the top-right corner to explore with our sample
                            data.
                          </li>
                          <li>
                            After connecting, you'll be able to select and
                            manage your books.
                          </li>
                        </ul>
                      </div>

                      <div className="space-x-4">
                        <button
                          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg"
                          onClick={handleConnectReckon}
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  )
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
