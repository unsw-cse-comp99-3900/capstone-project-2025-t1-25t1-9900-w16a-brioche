import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={location.pathname} />
  }

  return <>{children}</>
}

export default ProtectedRoute
