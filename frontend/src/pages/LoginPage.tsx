/**
 * @file LoginPage.tsx - Defines the LoginPage component, which renders the login interface using the LoginContainer.
 */

/**
 * LoginPage Component
 *
 * * This component renders the login page layout, typically used for user authentication entry.
 *
 * @returns {JSX.Element} The login page view.
 */

import React from "react"
import LoginContainer from "@/containers/Auth/LoginContainer"

const LoginPage: React.FC = () => {
  return <LoginContainer />
}

export default LoginPage
