import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ValidationResultModal } from "@/components/invoice/ValidationResultModal"
import type { ValidationResult } from "@/hooks/invoice/useValidateInvoicePeppol"

describe("ValidationResultModal", () => {
  const mockResult: ValidationResult = {
    isValid: true,
    violations: [
      {
        field: "Invoice.Total",
        severity: "Error",
        message: "Total amount is missing",
        ruleId: "PEPPOL-TOTAL-001",
        lineNumber: 42,
        userFriendlyField: "Total Amount",
      },
      {
        field: "Invoice.Note",
        severity: "Warning",
        message: "Note is optional but recommended",
        ruleId: "PEPPOL-NOTE-003",
        lineNumber: 15,
      },
    ],
  }

  it("does not render when isOpen is false or result is null", () => {
    const { container: closedContainer } = render(
      <ValidationResultModal
        isOpen={false}
        onClose={vi.fn()}
        result={mockResult}
      />
    )
    expect(closedContainer).toBeEmptyDOMElement()

    const { container: nullContainer } = render(
      <ValidationResultModal isOpen={true} onClose={vi.fn()} result={null} />
    )
    expect(nullContainer).toBeEmptyDOMElement()
  })

  it("renders validation failed UI when there is an error", () => {
    render(
      <ValidationResultModal
        isOpen={true}
        onClose={vi.fn()}
        result={mockResult}
      />
    )
    expect(screen.getByText("Validation Failed")).toBeInTheDocument()
    expect(screen.getByText(/Total Amount/)).toBeInTheDocument()
    expect(screen.getByText(/Note is optional/)).toBeInTheDocument()
  })

  it("renders validation passed UI when no errors exist", () => {
    const passedResult: ValidationResult = {
      isValid: true,
      violations: [],
    }

    render(
      <ValidationResultModal
        isOpen={true}
        onClose={vi.fn()}
        result={passedResult}
      />
    )

    expect(screen.getByText("Validation Passed")).toBeInTheDocument()
    expect(
      screen.getByText(/meets all checked PEPPOL requirements/i)
    ).toBeInTheDocument()
  })

  it("calls onClose and onEdit callbacks", () => {
    const handleClose = vi.fn()
    const handleEdit = vi.fn()

    render(
      <ValidationResultModal
        isOpen={true}
        onClose={handleClose}
        onEdit={handleEdit}
        result={mockResult}
      />
    )

    fireEvent.click(screen.getByText("Edit Invoice"))
    fireEvent.click(screen.getAllByText("Close")[0])

    expect(handleEdit).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
