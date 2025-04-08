import LogoTextGroup from "./LogoTextGroup"
import { UserButton } from "@clerk/clerk-react"

/**
 * MinimalHeader Component
 *
 * A simplified header component that includes only the logo and user button.
 *
 * @returns {JSX.Element} The minimal header.
 */
const MinimalHeader = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm z-50 border-b border-secondary-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LogoTextGroup />

          {/* User Button */}
          <div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MinimalHeader
