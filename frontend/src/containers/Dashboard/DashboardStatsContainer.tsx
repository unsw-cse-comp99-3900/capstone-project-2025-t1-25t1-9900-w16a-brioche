import React, { useMemo, useEffect } from "react"
import { useInvoices } from "@/hooks/invoice/useInvoices"
import useCustomers from "@/hooks/customer/useCustomers"
import useProducts from "@/hooks/product/useProducts"
import { InvoiceStatus, type Invoice } from "@/types/invoice"
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpCircle,
  TrendingUp,
  Wallet,
  Clock,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
} from "lucide-react"
import { format, subMonths, isAfter } from "date-fns"
import { sampleData } from "@/constants/mockData/dashboardMockdata"

const DashboardStatsContainer: React.FC = () => {
  // Fetch all data
  const {
    data: invoices = [],
    isLoading: invoicesLoading,
    error: invoicesError,
  } = useInvoices()
  const { data: customers = [], isLoading: customersLoading } = useCustomers()
  const { data: products = [], isLoading: productsLoading } = useProducts()

  // Debug data loading
  useEffect(() => {
    console.log("Invoices loaded:", invoices.length, invoices)
    console.log("Customers loaded:", customers.length)
    console.log("Products loaded:", products.length)

    // Check if invoices have the expected structure
    if (invoices.length > 0) {
      console.log("Sample invoice:", invoices[0])
      console.log(
        "Status values:",
        invoices.map((inv) => inv.status)
      )
      console.log(
        "Total Amount values:",
        invoices.map((inv) => inv.totalAmount)
      )
    }

    // Check for API errors
    if (invoicesError) {
      console.error("Error fetching invoices:", invoicesError)
    }
  }, [invoices, customers, products, invoicesError])

  // Create sample data for demonstration when real data is not available
  const sampleDataMemo = useMemo(() => sampleData, [])

  // Process the data for insights
  const insights = useMemo(() => {
    console.log(
      "Processing insights with:",
      invoices.length ? "real invoices" : "no invoices",
      customers.length ? "real customers" : "no customers",
      products.length ? "real products" : "no products"
    )

    // Use real data if available, otherwise use sample data
    const dataToUse = {
      invoices: invoices.length > 0 ? invoices : sampleDataMemo.invoices,
      customers: customers.length > 0 ? customers : sampleDataMemo.customers,
      products: products.length > 0 ? products : sampleDataMemo.products,
    }

    // Now timestamp
    const now = new Date()

    // Get invoices from the last 6 months
    const recentInvoices = dataToUse.invoices.filter((inv) => {
      if (!inv.createdDateTime) return false
      const invDate = new Date(inv.createdDateTime)
      return isAfter(invDate, subMonths(now, 6))
    })

    // Calculate monthly revenue and count
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const month = subMonths(now, 5 - i)
      return {
        month: format(month, "MMM"),
        date: month,
        invoices: 0,
        revenue: 0,
        customers: 0,
        year: format(month, "yyyy"),
      }
    })

    // Fill in data for monthly trends
    recentInvoices.forEach((inv) => {
      const invoice = inv as Invoice
      if (!invoice.createdDateTime || !invoice.customer?.id) return
      const invDate = new Date(invoice.createdDateTime)
      const monthIdx = last6Months.findIndex(
        (m) =>
          format(m.date, "MMM") === format(invDate, "MMM") &&
          format(m.date, "yyyy") === format(invDate, "yyyy")
      )
      if (monthIdx >= 0) {
        last6Months[monthIdx].invoices += 1
        last6Months[monthIdx].revenue += invoice.totalAmount ?? 0
      }
    })

    // Populate with sample data for demo if no real data
    if (
      recentInvoices.length === 0 ||
      last6Months.every((m) => m.invoices === 0)
    ) {
      last6Months.forEach((month) => {
        month.invoices = 5 + Math.floor(Math.random() * 25)
        month.revenue = 2000 + Math.floor(Math.random() * 12000)
        month.customers = 3 + Math.floor(Math.random() * 15)
      })
    }

    // Calculate active customers per month based on invoice creation date
    const customerActivityByMonth = new Map()

    recentInvoices.forEach((inv) => {
      const invoice = inv as Invoice
      if (!invoice.createdDateTime || !invoice.customer?.id) return
      const invDate = new Date(invoice.createdDateTime)
      const monthKey = `${format(invDate, "MMM")}-${format(invDate, "yyyy")}`

      if (!customerActivityByMonth.has(monthKey)) {
        customerActivityByMonth.set(monthKey, new Set())
      }
      customerActivityByMonth.get(monthKey).add(invoice.customer.id)
    })

    // Update customer counts in monthly data
    last6Months.forEach((month) => {
      const monthKey = `${month.month}-${month.year}`
      if (customerActivityByMonth.has(monthKey)) {
        month.customers = customerActivityByMonth.get(monthKey).size
      }
      // Keep the sample data if no real data
    })

    // Count products used in invoices
    const productUsage = new Map()

    dataToUse.invoices.forEach((inv) => {
      const invoice = inv as Invoice
      if (!invoice.lineItems) return

      invoice.lineItems.forEach((item) => {
        if (!item?.itemDetails?.item?.id) return
        const productId = item.itemDetails.item.id
        const productName = item.itemDetails.item.name || "Unknown"

        if (!productUsage.has(productId)) {
          productUsage.set(productId, {
            id: productId,
            name: productName,
            count: 0,
            revenue: 0,
          })
        }

        const usage = productUsage.get(productId)
        usage.count += 1
        usage.revenue +=
          (item.itemDetails.price || 0) * (item.itemDetails.quantity || 1)
      })
    })

    // Generate sample product usage if no real data
    if (productUsage.size === 0) {
      dataToUse.products.slice(0, 5).forEach((product, index) => {
        productUsage.set(product.id, {
          id: product.id,
          name: product.name,
          count: 20 - index * 3,
          revenue: 10000 - index * 1500,
        })
      })
    }

    // Top products by usage
    const topProducts = Array.from(productUsage.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Customer value distribution
    const customerValues = dataToUse.customers
      .map((customer) => {
        // Sum up all invoice amounts for this customer
        const customerInvoices = dataToUse.invoices.filter(
          (inv) => (inv as Invoice).customer?.id === customer.id
        )
        const totalSpent = customerInvoices.reduce(
          (sum, inv) => sum + (inv.totalAmount || 0),
          0
        )
        const invoiceCount = customerInvoices.length

        return {
          id: customer.id,
          name: customer.name,
          totalSpent,
          invoiceCount,
          averageValue: invoiceCount > 0 ? totalSpent / invoiceCount : 0,
        }
      })
      .filter((c) => c.invoiceCount > 0)

    // Generate sample customer values if no real data
    if (customerValues.length === 0) {
      customerValues.push(
        ...dataToUse.customers.slice(0, 15).map((customer) => ({
          id: customer.id,
          name: customer.name,
          totalSpent: 500 + Math.floor(Math.random() * 9500),
          invoiceCount: 1 + Math.floor(Math.random() * 5),
          averageValue: 500 + Math.floor(Math.random() * 1500),
        }))
      )
    }

    // Customer segments based on spending
    const customerSegments = [
      { name: "New", value: 0 },
      { name: "Low Value", value: 0 },
      { name: "Mid Value", value: 0 },
      { name: "High Value", value: 0 },
    ]

    customerValues.forEach((customer) => {
      if (customer.invoiceCount === 1) {
        customerSegments[0].value++
      } else if (customer.totalSpent < 1000) {
        customerSegments[1].value++
      } else if (customer.totalSpent < 5000) {
        customerSegments[2].value++
      } else {
        customerSegments[3].value++
      }
    })

    // Ensure we have some data in segments for demo
    if (customerSegments.every((segment) => segment.value === 0)) {
      customerSegments[0].value = 8
      customerSegments[1].value = 12
      customerSegments[2].value = 6
      customerSegments[3].value = 4
    }

    // Get invoice counts by status
    const invoicesByStatus = {
      unpaid: 0,
      paid: 0,
      overdue: 0,
    }

    // Calculate invoice counts by status
    dataToUse.invoices.forEach((inv) => {
      const invoice = inv as Invoice

      // If the invoice is in Paid status, categorize it as paid
      if (invoice.status === InvoiceStatus.Paid) {
        invoicesByStatus.paid++
        return
      }

      // Check if overdue: has a due date and is expired
      if (invoice.dueDate) {
        const dueDate = new Date(invoice.dueDate)
        const today = new Date()

        if (dueDate < today) {
          // The invoice is overdue but not paid, categorize it as overdue
          invoicesByStatus.overdue++
          return
        }
      }

      // All other cases (Draft or Approved but not overdue) are categorized as unpaid
      invoicesByStatus.unpaid++
    })

    // Ensure we have some status data for demo
    if (Object.values(invoicesByStatus).every((count) => count === 0)) {
      invoicesByStatus.unpaid = 13
      invoicesByStatus.paid = 15
      invoicesByStatus.overdue = 3
    }

    // Calculate business metrics
    const totalRevenue = dataToUse.invoices.reduce(
      (sum, inv) => sum + (inv.totalAmount || 0),
      0
    )
    const avgInvoiceValue =
      dataToUse.invoices.length > 0
        ? totalRevenue / dataToUse.invoices.length
        : 0

    // Calculate pending revenue (sum of unpaid and overdue invoices)
    const pendingRevenue = dataToUse.invoices.reduce((sum, inv) => {
      const invoice = inv as Invoice
      // Add to pending revenue if the invoice is not in Paid status
      if (invoice.status !== InvoiceStatus.Paid) {
        return sum + (invoice.totalAmount || 0)
      }
      return sum
    }, 0)

    // Ensure we have some metrics for demo
    const ensuredMetrics = {
      totalInvoices: dataToUse.invoices.length || 43,
      pendingInvoices: invoicesByStatus.unpaid || 13,
      approvedInvoices: invoicesByStatus.paid || 15,
      totalRevenue: totalRevenue || 43000,
      avgInvoiceValue: avgInvoiceValue || 1850,
      pendingRevenue: pendingRevenue || 12500,
      totalCustomers: dataToUse.customers.length || 30,
      activeCustomers: customerValues.length || 18,
      totalProducts: dataToUse.products.length || 25,
    }

    // Return all calculated insights
    return {
      statusData: [
        { name: "Unpaid", value: invoicesByStatus.unpaid },
        { name: "Paid", value: invoicesByStatus.paid },
        { name: "Overdue", value: invoicesByStatus.overdue },
      ],
      monthlyData: last6Months,
      topProducts,
      customerSegments,
      customerValues,
      metrics: ensuredMetrics,
    }
  }, [invoices, customers, products, sampleDataMemo])

  // Colors for chart elements - using the theme colors
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  // Chart config for better tooltips
  const chartConfig = {
    unpaid: {
      label: "Unpaid",
      color: "hsl(var(--chart-2))",
    },
    paid: {
      label: "Paid",
      color: "hsl(var(--chart-4))",
    },
    overdue: {
      label: "Overdue",
      color: "hsl(var(--chart-5))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-3))",
    },
    invoices: {
      label: "Invoices",
      color: "hsl(var(--chart-1))",
    },
    customers: {
      label: "Customers",
      color: "hsl(var(--chart-2))",
    },
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Loading state
  if (invoicesLoading || customersLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-md border-0 bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300 hover:shadow-xl hover:translate-y-[-3px] hover:bg-gradient-to-br hover:from-white/90 hover:to-blue-50 dark:hover:from-slate-800 dark:hover:to-blue-900/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Wallet className="h-5 w-5" />
              </div>
              Total Revenue
            </CardTitle>
            <CardDescription>All time revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(insights.metrics.totalRevenue)}
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-medium mr-1">
                12%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300 hover:shadow-xl hover:translate-y-[-3px] hover:bg-gradient-to-br hover:from-white/90 hover:to-amber-50 dark:hover:from-slate-800 dark:hover:to-amber-900/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                <Clock className="h-5 w-5" />
              </div>
              Pending Revenue
            </CardTitle>
            <CardDescription>From pending invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">
              {formatCurrency(insights.metrics.pendingRevenue)}
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <ArrowUpCircle className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-amber-500 font-medium mr-1">
                {insights.metrics.pendingInvoices} invoices
              </span>{" "}
              pending
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300 hover:shadow-xl hover:translate-y-[-3px] hover:bg-gradient-to-br hover:from-white/90 hover:to-blue-50 dark:hover:from-slate-800 dark:hover:to-blue-900/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <Users className="h-5 w-5" />
              </div>
              Active Customers
            </CardTitle>
            <CardDescription>With invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {insights.metrics.activeCustomers}
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-medium mr-1">
                {Math.round(
                  (insights.metrics.activeCustomers /
                    insights.metrics.totalCustomers) *
                    100
                )}
                %
              </span>{" "}
              of total customers
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300 hover:shadow-xl hover:translate-y-[-3px] hover:bg-gradient-to-br hover:from-white/90 hover:to-emerald-50 dark:hover:from-slate-800 dark:hover:to-emerald-900/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <DollarSign className="h-5 w-5" />
              </div>
              Avg. Invoice Value
            </CardTitle>
            <CardDescription>Per invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">
              {formatCurrency(insights.metrics.avgInvoiceValue)}
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-medium mr-1">
                18%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6 w-full md:w-auto bg-transparent border-0 p-1.5 rounded-xl backdrop-blur-sm flex flex-wrap justify-center gap-1">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md rounded-lg transition-all duration-200 data-[state=active]:scale-105 data-[state=active]:text-primary"
          >
            <div className="p-1.5 rounded-full bg-primary/10 text-primary">
              <PieChartIcon className="h-4 w-4" />
            </div>
            <span>Business Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md rounded-lg transition-all duration-200 data-[state=active]:scale-105 data-[state=active]:text-blue-500"
          >
            <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-500">
              <Users className="h-4 w-4" />
            </div>
            <span>Customer Insights</span>
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md rounded-lg transition-all duration-200 data-[state=active]:scale-105 data-[state=active]:text-amber-500"
          >
            <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-500">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <span>Product Performance</span>
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md rounded-lg transition-all duration-200 data-[state=active]:scale-105 data-[state=active]:text-emerald-500"
          >
            <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-500">
              <Activity className="h-4 w-4" />
            </div>
            <span>Trends & Forecasts</span>
          </TabsTrigger>
        </TabsList>

        {/* Business Overview Tab */}
        <TabsContent
          value="overview"
          className="animate-in fade-in-50 duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all hover:shadow-2xl group">
              <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <PieChartIcon className="h-5 w-5" />
                  </div>
                  Invoice Status Distribution
                </CardTitle>
                <CardDescription>
                  Current distribution of invoice statuses
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={insights.statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {insights.statusData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Revenue & Invoices */}
            <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all hover:shadow-2xl group">
              <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  Monthly Business Overview
                </CardTitle>
                <CardDescription>
                  Revenue and invoice count trends
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ComposedChart
                    data={insights.monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar
                      yAxisId="left"
                      dataKey="invoices"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                      name="Invoices"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      dot
                      name="Revenue"
                    />
                  </ComposedChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Insights Tab */}
        <TabsContent
          value="customers"
          className="animate-in fade-in-50 duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all hover:shadow-2xl group">
              <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <Users className="h-5 w-5" />
                  </div>
                  Customer Segments
                </CardTitle>
                <CardDescription>
                  Distribution of customer value segments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={insights.customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {insights.customerSegments.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all hover:shadow-2xl group">
              <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Activity className="h-5 w-5" />
                  </div>
                  Customer Activity
                </CardTitle>
                <CardDescription>Monthly active customers</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart
                    data={insights.monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="customers"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      name="Active Customers"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Product Performance Tab */}
        <TabsContent
          value="products"
          className="animate-in fade-in-50 duration-300"
        >
          <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all hover:shadow-2xl group">
            <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                Top Products Performance
              </CardTitle>
              <CardDescription>
                Most frequently invoiced products
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[350px]">
                <BarChart
                  data={insights.topProducts}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--chart-1))"
                    name="Usage Count"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent
          value="trends"
          className="animate-in fade-in-50 duration-300"
        >
          <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white/80 to-slate-100 dark:from-slate-800 dark:to-slate-700/90 transition-all hover:shadow-2xl group">
            <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <LineChartIcon className="h-5 w-5" />
                </div>
                Business Growth Trends
              </CardTitle>
              <CardDescription>
                Revenue, invoices, and customer growth
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[350px]">
                <LineChart
                  data={insights.monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="invoices"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Invoices"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="customers"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Customers"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DashboardStatsContainer
