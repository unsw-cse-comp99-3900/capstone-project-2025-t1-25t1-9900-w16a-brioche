import { createBrowserRouter } from "react-router-dom"

// Import layouts
import LandingLayout from "@/components/layout/LandingLayout"
import DashboardLayout from "@/components/layout/DashboardLayout"
import AuthLayout from "@/components/layout/Layout"

// Import pages using absolute paths
import LandingPage from "@/pages/LandingPage"
import LoginPage from "@/pages/LoginPage"
import RegistrationPage from "@/pages/RegistrationPage"
import DashboardPage from "@/pages/DashboardPage"
import InvoiceUploadPage from "@/pages/InvoiceCsvUploadPage"
import InvoiceFormPage from "@/pages/InvoiceFormPage"
import ValidationResultsPage from "@/pages/ValidationResultsPage"
import InvoiceDetailPage from "@/pages/InvoiceDetailPage"
import NotFoundPage from "@/pages/NotFoundPage"
import InvoiceTestPage from "@/pages/APITestPage"

// Define routes
const router = createBrowserRouter([
  // Public routes with main layout
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      // 404 page for public routes
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  // Dashboard routes with dashboard layout
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/invoice/upload",
        element: <InvoiceUploadPage />,
      },
      {
        path: "/invoice/create",
        element: <InvoiceFormPage />,
      },
      {
        path: "/invoice/validation",
        element: <ValidationResultsPage />,
      },
      {
        path: "/invoice/:id",
        element: <InvoiceDetailPage />,
      },
      {
        path: "/api-test",
        element: <InvoiceTestPage />,
      },
    ],
  },
])

export default router
