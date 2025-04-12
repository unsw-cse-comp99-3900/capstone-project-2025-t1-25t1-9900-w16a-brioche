/**
 * @file DashboardHeader.tsx - Defines the DashboardHeader component, which is the main header for the dashboard layout.
 * It includes navigation links, a mobile menu, and user authentication features.
 */
import React, { useState } from "react"
import Logo from "./Logo"
import { useLocation, Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  Receipt,
  BarChart3,
  Menu,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { UserButton } from "@clerk/clerk-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import LogoTextGroup from "./LogoTextGroup"

/**
 * DashboardHeader Component
 *
 * This component renders the header for the dashboard, including the logo, navigation links,
 * mobile menu, and user authentication button. It handles navigation state and active link styling.
 *
 * @returns {JSX.Element} The dashboard header.
 */
const DashboardHeader = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const [isManagementOpen, setIsManagementOpen] = useState(false)

  /**
   * isActive - Checks if a given path is currently active based on the current URL.
   *
   * @param   {string} path - The path to check for activity.
   * @returns {boolean} - True if the path is active, false otherwise.
   */
  const isActive = (path: string) => {
    if (path === "/dashboard" && currentPath === "/dashboard") {
      return true
    }
    if (path.startsWith("/management") && currentPath.includes(path)) {
      return true
    }
    if (path === "/documentation" && currentPath === "/documentation") {
      return true
    }
    return false
  }

  return (
    <header className="bg-white/90 backdrop-blur-sm z-50 border-b border-secondary-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LogoTextGroup />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex lg:space-x-8 space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1 lg:space-x-6">
                {/* Dashboard Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/dashboard"
                    className={cn(
                      "text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors flex items-center relative",
                      isActive("/dashboard") &&
                        "text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full"
                    )}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Management Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent relative",
                      (currentPath.includes("/management") ||
                        currentPath.includes("/invoice")) &&
                        "text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full"
                    )}
                  >
                    Management
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white rounded-md shadow-lg p-4">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary-500/20 to-primary-600 p-6 no-underline outline-none focus:shadow-md">
                            <BarChart3 className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Business Management
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Generate professional invoices quickly and easily
                              for your clients
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/customers"
                        title="Customers"
                        icon={<Users className="h-5 w-5 text-primary-600" />}
                      >
                        Manage client information for faster invoice creation
                      </ListItem>
                      <ListItem
                        href="/products"
                        title="Products & Services"
                        icon={<Package className="h-5 w-5 text-primary-600" />}
                      >
                        Add items that you can quickly include in your invoices
                      </ListItem>
                      <ListItem
                        href="/invoices"
                        title="Invoice History"
                        icon={<Receipt className="h-5 w-5 text-primary-600" />}
                      >
                        View, edit, send and track all your previously created
                        invoices
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Documentation Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/documentation"
                    className={cn(
                      "text-secondary-600 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors flex items-center relative",
                      isActive("/documentation") &&
                        "text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full"
                    )}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Menu Button and User Button */}
          <div className="flex items-center">
            {/* Mobile Menu */}
            <div className="md:hidden mr-4">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[280px] sm:w-[350px] p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="px-4 py-6 border-b border-secondary-200">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/"
                          className="flex items-center hover:opacity-90 transition-opacity"
                        >
                          <Logo />
                          <div className="ml-3">
                            <span className="text-xl font-bold text-gray-900">
                              Invoice
                              <span className="text-primary-600">Flow</span>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="flex-1 overflow-y-auto py-4">
                      <nav className="flex flex-col px-4 space-y-1">
                        {/* Dashboard Link */}
                        <a
                          href="/dashboard"
                          className={cn(
                            "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors",
                            isActive("/dashboard")
                              ? "text-primary-600 bg-primary-50"
                              : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                          )}
                        >
                          <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
                          Dashboard
                        </a>

                        {/* Management Section */}
                        <Collapsible
                          open={isManagementOpen}
                          onOpenChange={setIsManagementOpen}
                          className="w-full"
                        >
                          <CollapsibleTrigger className="w-full">
                            <div
                              className={cn(
                                "flex items-center justify-between px-3 py-3 text-base font-medium rounded-md transition-colors w-full",
                                currentPath.includes("/management") ||
                                  currentPath.includes("/invoice")
                                  ? "text-primary-600 bg-primary-50"
                                  : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                              )}
                            >
                              <div className="flex items-center">
                                <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
                                Management
                              </div>
                              {isManagementOpen ? (
                                <ChevronDown className="h-5 w-5" />
                              ) : (
                                <ChevronRight className="h-5 w-5" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-11 pr-3 space-y-1 mt-1">
                            {/* Products & Services */}
                            <a
                              href="/products"
                              className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                currentPath.includes("/management/products")
                                  ? "text-primary-600 bg-primary-50"
                                  : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                              )}
                            >
                              Products & Services
                            </a>

                            {/* Customers */}
                            <a
                              href="/customers"
                              className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                currentPath.includes("/management/customers")
                                  ? "text-primary-600 bg-primary-50"
                                  : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                              )}
                            >
                              Customers
                            </a>

                            {/* Invoice History */}
                            <a
                              href="/invoices"
                              className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                currentPath.includes("/management/invoices")
                                  ? "text-primary-600 bg-primary-50"
                                  : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                              )}
                            >
                              Invoices
                            </a>
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Documentation Link */}
                        <a
                          href="/documentation"
                          className={cn(
                            "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors",
                            isActive("/documentation")
                              ? "text-primary-600 bg-primary-50"
                              : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
                          )}
                        >
                          <FileText className="mr-3 h-5 w-5 flex-shrink-0" />
                          Documentation
                        </a>
                      </nav>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="border-t border-secondary-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <UserButton
                            appearance={{
                              elements: {
                                avatarBox: "h-10 w-10",
                              },
                            }}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-secondary-700">
                            Account Settings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* User Button */}
            <div className="hidden md:block">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * ListItem Component
 *
 * A styled list item for use within the NavigationMenu.
 */
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start p-3 rounded-md hover:bg-secondary-100 transition-colors",
            className
          )}
          {...props}
        >
          {icon && <div className="mr-3 mt-0.5">{icon}</div>}
          <div>
            <div className="text-sm font-medium text-secondary-900">
              {title}
            </div>
            <p className="text-xs text-secondary-500 mt-1">{children}</p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default DashboardHeader
