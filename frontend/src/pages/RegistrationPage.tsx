/**
 * @file RegistrationPage.tsx - Defines the RegistrationPage component, which renders the user registration interface using the RegistrationContainer.
 */

/**
 * RegistrationPage Component
 *
 * * This component renders the registration page layout, used for creating a new user account.
 *
 * @returns {JSX.Element} The registration page view.
 */

import React from "react"
import RegistrationContainer from "@/containers/Auth/RegistrationContainer"

const RegistrationPage: React.FC = () => {
  return <RegistrationContainer />
}

export default RegistrationPage
