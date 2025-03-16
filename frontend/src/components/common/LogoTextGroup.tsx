import { Link } from "react-router-dom"
import Logo from "./Logo"

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
