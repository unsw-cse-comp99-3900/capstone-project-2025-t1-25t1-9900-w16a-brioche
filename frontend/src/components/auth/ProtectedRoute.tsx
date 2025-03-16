import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"
import LoadingPage from "@/pages/LoadingPage"
interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return <LoadingPage />
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={location.pathname} />
  }

  return <>{children}</>
}

export default ProtectedRoute
