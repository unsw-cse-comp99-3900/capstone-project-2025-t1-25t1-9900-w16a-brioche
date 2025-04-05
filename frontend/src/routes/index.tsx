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
import NotFoundPage from "@/pages/NotFoundPage"
// import InvoiceTestPage from "@/pages/ApiTestPage"
import CustomersPage from "@/pages/CustomersPage"
import CreateCustomerPage from "@/pages/CreateCustomerPage"
import LoadingPage from "@/pages/LoadingPage"
import EditCustomerPage from "@/pages/EditCustomerPage"
import ProductsPage from "@/pages/ProductsPage"
import CreateProductPage from "@/pages/CreateProductPage"
import InvoicesPage from "@/pages/invoices/InvoicesPage"
import EditProductPage from "@/pages/EditProductPage"
import CreateInvoicePage from "@/pages/invoices/CreateInvoicePage"
import EditInvoicePage from "@/pages/invoices/EditInvoicePage"
import InvoicePdfUploadPage from "@/pages/InvoicePdfUploadPage"

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
        path: "/invoices",
        element: <InvoicesPage />,
      },
      {
        path: "/invoices/create",
        element: <CreateInvoicePage />,
      },
      {
        path: "/invoices/:id/edit",
        element: <EditInvoicePage />,
      },
      {
        path: "/invoices/upload",
        element: <InvoicePdfUploadPage />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/customers/create",
        element: <CreateCustomerPage />,
      },
      {
        path: "/customers/:id/edit",
        element: <EditCustomerPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/create",
        element: <CreateProductPage />,
      },
      {
        path: "/products/:id/edit",
        element: <EditProductPage />,
      },
      // {
      //   path: "/api-test",
      //   element: <InvoiceTestPage />,
      // },
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
