/**
 * @file AuthButtonGroup.tsx - Contains the AuthButtonGroup component, which renders authentication buttons based on the user's sign-in status.
 * It uses Clerk components for handling signed-in and signed-out states, and custom components for sign-in and sign-up buttons.
 */

import SignInButton from "./SignInButton"
import SignUpButton from "./SignUpButton"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"

/**
 * AuthButtonGroup Component
 *
 * This component renders a group of authentication buttons, including a user button for signed-in users and sign-in/sign-up buttons for signed-out users.
 *
 * @returns {JSX.Element} A div containing the authentication buttons.
 */
const AuthButtonGroup = () => {
  return (
    <div>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <button className="mr-4 sm:inline-block text-secondary-700 hover:text-primary-600 font-medium text-base">
          <SignInButton />
        </button>
        <Button className="text-base">
          <SignUpButton />
        </Button>
      </SignedOut>
    </div>
  )
}
export default AuthButtonGroup
