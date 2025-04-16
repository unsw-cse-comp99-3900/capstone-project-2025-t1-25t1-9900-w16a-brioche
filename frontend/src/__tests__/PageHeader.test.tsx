import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import PageHeader from "@/components/common/PageHeader"

describe("PageHeader", () => {
  it("renders title and description", () => {
    render(<PageHeader title="Test Title" description="Test Description" />)
    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })
})
