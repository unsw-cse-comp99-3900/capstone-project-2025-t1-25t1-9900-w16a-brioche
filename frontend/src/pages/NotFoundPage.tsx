/**
 * @file NotFoundPage.tsx - Defines the NotFoundPage component, which renders the 404 not found interface using the NotFoundContainer.
 */

/**
 * NotFoundPage Component
 *
 * * This component renders the 404 not found page layout, displayed when a user navigates to an undefined route.
 *
 * @returns {JSX.Element} The not found (404) page view.
 */

import React from "react"
import NotFoundContainer from "@/containers/NotFoundContainer"

const NotFoundPage: React.FC = () => {
  return <NotFoundContainer />
}

export default NotFoundPage
