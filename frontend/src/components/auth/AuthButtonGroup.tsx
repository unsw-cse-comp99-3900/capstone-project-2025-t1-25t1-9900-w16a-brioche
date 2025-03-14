import SignInButton from "./SignInButton"
import SignUpButton from "./SignUpButton"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"

const AuthButtonGroup = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button className="mr-2">
          <SignInButton />
        </Button>
        <Button>
          <SignUpButton />
        </Button>
      </SignedOut>
    </div>
  )
}
export default AuthButtonGroup
