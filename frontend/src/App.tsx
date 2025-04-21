import { RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import router from "@/routes"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 3,
      },
    },
  })

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster closeButton expand={false} richColors />
    </QueryClientProvider>
  )
}

export default App
