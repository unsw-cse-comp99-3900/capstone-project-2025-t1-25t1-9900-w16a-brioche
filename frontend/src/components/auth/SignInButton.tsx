import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react"

const SignInButton = () => {
  return <ClerkSignInButton forceRedirectUrl="/dashboard" />
}
export default SignInButton
