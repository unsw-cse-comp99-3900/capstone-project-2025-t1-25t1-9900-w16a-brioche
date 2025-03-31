/**
 * @file SignInButton.tsx - Contains the SignInButton component, which renders a button that redirects the user to the sign-in page.
 */

import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react"

/**
 * SignInButton Component
 *
 * This component renders a button that redirects the user to the sign-in page.
 *
 * @returns {JSX.Element} A button that redirects the user to the sign-in page.
 */
const SignInButton = () => {
  return <ClerkSignInButton forceRedirectUrl="/dashboard" />
}
export default SignInButton
