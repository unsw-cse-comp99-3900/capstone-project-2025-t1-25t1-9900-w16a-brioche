/**
 * @file ProtectedRoute.tsx - Defines the ProtectedRoute component that handles authentication and redirects users to the sign-in page if they are not authenticated.
 */

import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"
import { Navigate, useLocation } from "react-router-dom"
import LoadingPage from "@/pages/LoadingPage"

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * ProtectedRoute Component
 *
 * This component checks if the user is signed in. If not, it redirects them to the sign-in page.
 * While loading, it displays a loading page.
 *
 * @param {ProtectedRouteProps} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to render if the user is authenticated.
 * @returns {JSX.Element} - Either the children, a redirect to the sign-in page, or a loading page.
 */
const ProtectedWithBookidRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return <LoadingPage />
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={location.pathname} />
  }

  // Check if `bookId` exists in localStorage
  const bookId = localStorage.getItem("bookId")
  if (!bookId) {
    return <Navigate to="/select" replace />
  }

  return <>{children}</>
}

export default ProtectedWithBookidRoute
