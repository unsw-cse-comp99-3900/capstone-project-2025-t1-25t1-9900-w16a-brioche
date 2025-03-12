import { RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import router from "@/routes"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

function App() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
