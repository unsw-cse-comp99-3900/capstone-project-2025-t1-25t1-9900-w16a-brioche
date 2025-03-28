import AuthButtonGroup from "@/components/auth/AuthButtonGroup"
import LogoTextGroup from "./LogoTextGroup"

const LandingHeader = () => {
  return (
    <header className=" bg-white/90 backdrop-blur-sm z-50 border-b border-secondary-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LogoTextGroup />

          {/* Center Navigation Links */}
          <nav className="hidden md:flex lg:space-x-6 space-x-1 pr-12">
            <a
              href="#features"
              className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors"
            >
              Contact
            </a>
          </nav>
          <AuthButtonGroup />
        </div>
      </div>
    </header>
  )
}
export default LandingHeader
