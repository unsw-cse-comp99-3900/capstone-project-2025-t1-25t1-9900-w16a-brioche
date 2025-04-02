/**
 * @file LogoTextGroup.tsx - Defines the LogoTextGroup component, which combines the Logo component with the "InvoiceFlow" text.
 */
import { Link } from "react-router-dom"
import Logo from "./Logo"

/**
 * LogoTextGroup Component
 *
 * This component renders the application's logo alongside the "InvoiceFlow" text, creating a cohesive branding element.
 *
 * @returns {JSX.Element} A link containing the logo and text.
 */
const LogoTextGroup: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center hover:opacity-90 transition-opacity"
    >
      <Logo />

      {/* Logo text */}
      <div className="ml-3">
        <span className="text-2xl font-bold text-gray-900">
          Invoice<span className="text-primary-600">Flow</span>
        </span>
      </div>
    </Link>
  )
}
export default LogoTextGroup
