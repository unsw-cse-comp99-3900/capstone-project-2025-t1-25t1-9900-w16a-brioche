/**
 * @file LoadingPage.tsx - Defines the LoadingPage component, which renders a full-page loading indicator using the LoadingContainer.
 */

/**
 * LoadingPage Component
 *
 * * This component renders the loading screen layout, used during data fetching or authentication state checks.
 *
 * @returns {JSX.Element} The full-page loading view.
 */

import React from "react"
import LoadingContainer from "@/containers/LoadingContainer"

const LoadingPage: React.FC = () => {
  return <LoadingContainer />
}

export default LoadingPage
