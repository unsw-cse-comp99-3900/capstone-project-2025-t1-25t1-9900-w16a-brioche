import SignInButton from "./SignInButton"
import SignUpButton from "./SignUpButton"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"

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
