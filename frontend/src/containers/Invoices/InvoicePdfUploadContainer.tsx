import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PageHeader from "@/components/common/PageHeader"
import { FileText, Upload, Eye, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useProcessInvoicePdf } from "@/hooks/invoice/useProcessInvoicePdf"
import usePreprocessInvoiceData from "@/hooks/invoice/usePreprocessInvoiceData"
import FileUploadLight from "@/components/ui/file-upload-light"

const InvoicePdfUploadContainer: React.FC = () => {
  const navigate = useNavigate()
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const processPdf = useProcessInvoicePdf()
  const preprocessInvoiceData = usePreprocessInvoiceData()

  const handleFileChange = (files: File[]) => {
    // Filter for PDF files only
    const pdfFile = files.find((file) => file.type === "application/pdf")

    if (pdfFile) {
      setPdfFiles([pdfFile])
      setError(null)

      // Create URL for preview
      const fileUrl = URL.createObjectURL(pdfFile)
      setPreviewUrl(fileUrl)
    } else if (files.length > 0) {
      setError("Please upload a PDF file only")
    }
  }

  const handleRemoveFile = () => {
    setPdfFiles([])
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setError(null)
  }

  const handleUpload = async () => {
    if (!pdfFiles.length) {
      toast.error("Please upload a PDF file")
      return
    }

    try {
      const result = await processPdf.mutateAsync(pdfFiles[0])

      if (!result.success) {
        toast.error("Error Processing PDF", {
          description:
            result.error || "Failed to process PDF due to fail to extract data",
        })
      }
      console.log("processPdfWithGemini result", result)

      if (result.success && result.data) {
        // Preprocess invoice data to ensure customers and products exist
        const preprocessResult = await preprocessInvoiceData.mutateAsync(
          result.data
        )
        console.log("Preprocess result:", preprocessResult)

        if (!preprocessResult.success) {
          toast.error("Error Processing PDF", {
            description:
              "Failed to process PDF: due to fail to preprocess invoice data",
          })
          throw new Error(
            preprocessResult.error || "Failed to preprocess invoice data"
          )
        }

        // Navigate to create invoice page with state
        navigate("/invoices/create", {
          state: { from: "/invoices/upload" },
        })

        toast.success("PDF Processed Successfully", {
          description:
            "Invoice data has been extracted and pre-filled in the create form.",
        })
      } else {
        throw new Error(result.error || "Failed to process PDF")
      }
    } catch (err) {
      console.error("Error processing PDF:", err)
      setError(
        "Failed to process PDF. Please try again or enter details manually."
      )
      toast.error("Error Processing PDF", {
        description:
          "Failed to extract data from PDF. Please try again or enter details manually.",
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Upload Invoice PDF"
        description="Upload your invoice PDF files for processing"
        icon={FileText}
        gradient={true}
      />

      <Card className="shadow-md border-0 bg-gradient-to-br from-white/70 to-slate-200 dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {!pdfFiles.length && (
          <div className="mb-6">
            <FileUploadLight onChange={handleFileChange} />
          </div>
        )}

        {pdfFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{pdfFiles[0].name}</p>
                  <p className="text-sm text-gray-500">
                    {(pdfFiles[0].size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {previewUrl && (
              <div className="border rounded-md overflow-hidden bg-white p-2">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium">PDF Preview</h3>
                  <div className="flex space-x-2">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </a>
                  </div>
                </div>
                <div className="h-[500px] w-full">
                  <iframe
                    src={previewUrl}
                    className="w-full h-full"
                    title="PDF Preview"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-4 p-4">
              <Button variant="outline" onClick={handleRemoveFile} size="lg">
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white"
                onClick={handleUpload}
                disabled={processPdf.isPending}
                size="lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                {processPdf.isPending ? "Processing..." : "Process Invoice"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default InvoicePdfUploadContainer
