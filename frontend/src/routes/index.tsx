import { createBrowserRouter } from "react-router-dom"

// Import layouts
import LandingLayout from "@/components/layout/LandingLayout"
import DashboardLayout from "@/components/layout/DashboardLayout"
import AuthLayout from "@/components/layout/Layout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

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
import InvoiceTestPage from "@/pages/ApiTestPage"
import CustomersPage from "@/pages/CustomersPage"
import LoadingPage from "@/pages/LoadingPage"
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
    ],
  },

  // Dashboard routes with dashboard layout
  {
    path: "/",
    // for clerk protect route
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/api-test",
        element: <InvoiceTestPage />,
      },
    ],
  },

  // 404 page without layout
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/loading",
    element: <LoadingPage />,
  },
])

export default router
