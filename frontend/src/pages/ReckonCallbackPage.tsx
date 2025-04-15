/**
 * @file ReckonCallbackPage.tsx - Defines the ReckonCallbackPage component, which handles the OAuth callback from Reckon.
 * * It extracts the authorization code and state from the URL and triggers the Reckon integration logic.
 */

/**
 * ReckonCallbackPage Component
 *
 * * This component handles the OAuth callback response from Reckon by retrieving the `code` and `state` parameters from the URL.
 *   It triggers the Reckon integration via a custom mutation hook and stores the session ID locally before redirecting the user.
 *
 * @returns {JSX.Element} A minimal placeholder UI while processing the callback.
 */

// src/pages/ReckonCallbackPage.tsx
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useReckonCallback from "@/hooks/reckon/useReckonCallback"

const ReckonCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const reckonCallback = useReckonCallback()

  useEffect(() => {
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    console.log("Reckon callback code:", code)
    console.log("Reckon callback state:", state)

    if (code && state) {
      try {
        reckonCallback.mutate({ code, state })
        localStorage.setItem("sessionId", state)
        navigate("/select")
      } catch (e) {
        console.error("Reckon callback error:", e)
        navigate("/select")
      }
    } else {
      console.error("wrong callback:", new Error("Missing code or state"))
      navigate("/select")
    }
  }, [searchParams, reckonCallback, navigate])

  return <div className="p-4">Processing Reckon integration...</div>
}

export default ReckonCallbackPage
