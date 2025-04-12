/**
 * @file ValidationResultModal.tsx - Displays a modal showing the results of invoice validation.
 */
import React from "react"
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { type ValidationResult } from "@/hooks/invoice/useValidateInvoicePeppol"

/**
 * ValidationResultModalProps Interface
 *
 * Defines the props for the ValidationResultModal component.
 */
interface ValidationResultModalProps {
  /**
   * Indicates whether the modal is open.
   */
  isOpen: boolean
  /**
   * Callback function to close the modal.
   */
  onClose: () => void
  /**
   * The validation result to display.
   */
  result: ValidationResult | null
  /**
   * Optional callback function to navigate to the invoice edit page.
   */
  onEdit?: () => void
}

/**
 * ValidationResultModal Component
 *
 * A modal component that displays the results of invoice validation,
 * including any errors or warnings.
 *
 * @param {ValidationResultModalProps} props - The component props.
 * @returns {JSX.Element | null} The rendered modal, or null if not open or no result.
 */
export const ValidationResultModal: React.FC<ValidationResultModalProps> = ({
  isOpen,
  onClose,
  result,
  onEdit,
}) => {
  if (!isOpen || !result) return null

  console.log("result", result)

  const hasErrors = result.violations.some((v) => v.severity === "Error")

  const hasErrorsWarnings = result.violations.some(
    (v) => v.severity === "Error" || v.severity === "Warning"
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-lg w-full max-h-[80vh]">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b">
            {hasErrors ? (
              <XCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
            )}
            <h3
              className={`text-xl font-semibold ${hasErrors ? "text-red-600" : "text-green-600"}`}
            >
              {hasErrors ? "Validation Failed" : "Validation Passed"}
            </h3>
          </div>

          {/* Body - Scrollable List */}
          <div className="overflow-y-auto flex-grow mb-4">
            {result.violations.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                This invoice meets all checked PEPPOL requirements.
              </p>
            ) : (
              <div className="space-y-3">
                {result.violations.map((violation, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${violation.severity === "Error" ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      {/* Icon based on severity */}
                      {violation.severity === "Error" ? (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-grow">
                        {/* Main message */}
                        <p
                          className={`text-sm font-medium ${violation.severity === "Error" ? "text-red-800" : "text-yellow-800"}`}
                        >
                          {violation.userFriendlyField ? (
                            <>
                              <span className="font-semibold">
                                {violation.userFriendlyField}
                              </span>
                              : {violation.message}
                            </>
                          ) : (
                            <>
                              Field{" "}
                              <code className="bg-gray-200 px-1 rounded text-xs">
                                {violation.field}
                              </code>
                              : {violation.message}
                            </>
                          )}
                        </p>
                        {/* Rule ID and Line Number */}
                        <p className="text-xs text-gray-600 mt-1">
                          {violation.ruleId && (
                            <span className="mr-2">
                              Rule:{" "}
                              <code className="bg-gray-200 px-1 rounded text-xs">
                                {violation.ruleId}
                              </code>
                            </span>
                          )}
                          {violation.lineNumber && (
                            <span>Line: {violation.lineNumber}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            {hasErrorsWarnings && onEdit && (
              <Button
                onClick={onEdit}
                variant={hasErrors ? "default" : "outline"}
              >
                Edit Invoice
              </Button>
            )}
            <Button
              onClick={onClose}
              variant={hasErrors ? "outline" : "default"}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
