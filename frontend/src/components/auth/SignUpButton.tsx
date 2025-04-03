/**
 * @file SignUpButton.tsx - Contains the SignUpButton component, which renders a button that redirects the user to the sign-up page.
 */

import { SignUpButton as ClerkSignUpButton } from "@clerk/clerk-react"

/**
 * SignUpButton Component
 *
 * This component renders a button that redirects the user to the sign-up page.
 *
 * @returns {JSX.Element} A button that redirects the user to the sign-up page.
 */
const SignUpButton = () => {
  return <ClerkSignUpButton />
}
export default SignUpButton
