import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa"

const AuthFooter = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-12 text-center">
        <p className="text-sm">
          © 2025 W16a-Brioche Development Team. All rights reserved.
        </p>

        {/* Link Group */}
        <div className="flex justify-center gap-6 mt-3">
          <Link to="/privacy" className="hover:text-blue-400 text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-blue-400 text-sm">
            Terms of Service
          </Link>
          <Link to="/cookies" className="hover:text-blue-400 text-sm">
            Cookie Policy
          </Link>
        </div>

        {/* GitHub Icon */}
        <div className="flex justify-center mt-4">
          <a
            href="https://github.com/unsw-cse-comp99-3900/capstone-project-2025-t1-25t1-9900-w16a-brioche"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AuthFooter
