import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { format } from "date-fns"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import useEditInvoice from "@/hooks/invoice/useEditInvoice"
import useInvoice from "@/hooks/invoice/useInvoice"
import useProducts from "@/hooks/product/useProducts"

import { useDueDate } from "@/hooks/payment/useDueDate"
import {
  invoiceFormSchema,
  InvoiceFormValues,
  apiToFormSchema,
} from "@/types/invoice"

import InvoiceInformation from "@/components/invoice/InvoiceInformation"
import InvoiceDetails from "@/components/invoice/InvoiceDetails"
import InvoiceItems from "@/components/invoice/InvoiceItems"
import InvoiceNotesAndTotals from "@/components/invoice/InvoiceTotal"

const EditInvoiceContainer: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const {
    data: invoice,
    isLoading: isLoadingInvoice,
    refetch,
  } = useInvoice(id ?? "")
  const { data: products = [] } = useProducts()

  const { mutateAsync: editInvoice, isPending: isEditing } = useEditInvoice(
    id ?? ""
  )

  const [totals, setTotals] = useState({
    subtotal: "0.00",
    discount: "0.00",
    totalExclTax: "0.00",
    tax: "0.00",
    total: "0.00",
  })

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      customer: "",
      invoiceDate: new Date(),
      dueDate: undefined,
      referenceCode: "",
      invoiceDiscount: "",
      note: "",
      paymentDetails: "",
      paymentTerms: "",
      items: [
        {
          item: "",
          itemPrice: "",
          description: "",
          qty: "",
          discount: "",
          taxCode: "",
          tax: "",
          amount: "",
        },
      ],
    },
  })

  useEffect(() => {
    const refreshData = async () => {
      try {
        await refetch()
      } catch (error) {
        console.error("Failed to refresh invoice data:", error)
      }
    }
    refreshData()
  }, [refetch])

  const [isInvoiceReady, setIsInvoiceReady] = useState(false)
  useEffect(() => {
    if (invoice) {
      form.reset(apiToFormSchema(invoice))
      setIsInvoiceReady(true)
    }
  }, [invoice, form])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      const items = value.items || []
      const discountInput = value.invoiceDiscount || ""

      let subtotal = 0
      let lineItemTotalTax = 0

      items.forEach((item, index) => {
        if (!item) return

        const qty = parseFloat(item.qty || "0")
        const price = parseFloat(item.itemPrice || "0")
        const discountPercent = parseFloat(item.discount || "0")
        const taxPercent = (() => {
          const selected = products.find((p) => p.id === item.item)
          return selected?.sale?.taxRate?.percent || 0
        })()

        const lineGross = qty * price
        const lineDiscounted = lineGross * (1 - discountPercent / 100)
        const tax = lineDiscounted - lineDiscounted / (1 + taxPercent / 100)

        if (name?.includes(`items.${index}.discount`)) {
          form.setValue(`items.${index}.tax`, tax.toFixed(2))
        }

        subtotal += lineDiscounted
        lineItemTotalTax += tax
      })

      let invoiceDiscount = 0
      if (discountInput.includes("%")) {
        invoiceDiscount =
          (subtotal * parseFloat(discountInput.replace("%", ""))) / 100
      } else if (discountInput.includes("$")) {
        invoiceDiscount = parseFloat(discountInput.replace("$", ""))
      } else {
        invoiceDiscount = parseFloat(discountInput || "0")
      }

      const grandTotal = subtotal - invoiceDiscount
      const finalTotalTax =
        subtotal !== 0 ? lineItemTotalTax * (grandTotal / subtotal) : 0
      const totalExclTax = subtotal - invoiceDiscount - lineItemTotalTax

      setTotals({
        subtotal: subtotal.toFixed(2),
        discount: invoiceDiscount.toFixed(2),
        totalExclTax: totalExclTax.toFixed(2),
        tax: finalTotalTax.toFixed(2),
        total: grandTotal.toFixed(2),
      })
    })

    return () => subscription.unsubscribe()
  }, [form, products])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!name?.includes("items")) return

      const indexMatch = name.match(/^items\.(\d+)\.qty$/)
      if (!indexMatch) return

      const index = Number(indexMatch[1])
      const itemId = value.items?.[index]?.item
      const qty = Number(value.items?.[index]?.qty || 0)

      const selected = products.find((p) => p.id === itemId)
      const price = selected?.sale?.price || 0
      const percent = selected?.sale?.taxRate?.percent || 0

      if (qty && price && percent) {
        const gross = qty * price
        const discountPercent = parseFloat(
          value.items?.[index]?.discount || "0"
        )
        const discounted = gross * (1 - discountPercent / 100)
        const taxAmount = discounted - discounted / (1 + percent / 100)
        form.setValue(`items.${index}.tax`, taxAmount.toFixed(2))
      }
    })

    return () => subscription.unsubscribe()
  }, [form, products])

  const paymentTermId = useWatch({
    control: form.control,
    name: "paymentTerms",
  })
  const invoiceDate = useWatch({ control: form.control, name: "invoiceDate" })
  const formattedInvoiceDate = invoiceDate
    ? format(new Date(invoiceDate), "yyyy-MM-dd")
    : ""
  const { data: dueDateData } = useDueDate(
    paymentTermId || "",
    formattedInvoiceDate
  )
  useEffect(() => {
    if (dueDateData?.dueDate) {
      form.setValue("dueDate", new Date(dueDateData.dueDate))
      console.log("Due Date updated:", new Date(dueDateData.dueDate))
    }
  }, [dueDateData, form])

  const onSubmit = async (data: InvoiceFormValues) => {
    try {
      await editInvoice(data)
      toast.success("Invoice updated successfully")
      navigate("/invoices")
    } catch (
      error: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
      let errorMessage = "Failed to update invoice."
      if (error?.response?.data?.message) {
        const backendMessage = error.response.data.message
        errorMessage = Array.isArray(backendMessage)
          ? backendMessage.join("; ")
          : backendMessage
      } else if (error?.message) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      }
      toast.error("Failed to update invoice", { description: errorMessage })
      console.error("Error updating invoice:", error)
    }
  }

  if (isLoadingInvoice) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  const CustomFormActions = () => (
    <div className="flex justify-end mb-4 space-x-2">
      <Button
        type="button"
        onClick={() => form.handleSubmit(onSubmit)()}
        disabled={isEditing}
        className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1"
      >
        <Save className="h-4 w-4" />
        {isEditing ? "Updating..." : "Receive Payment"}
      </Button>
    </div>
  )

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
      <div className="px-4 py-5 sm:p-6">
        <CustomFormActions />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InvoiceInformation form={form} />
            <InvoiceDetails form={form} />
            <InvoiceItems form={form} isInvoiceReady={isInvoiceReady} />
            <InvoiceNotesAndTotals form={form} totals={totals} />

            <div className="pt-5">
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/invoices")}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isEditing}
                  className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {isEditing ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditInvoiceContainer
