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
        navigate("/book")
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