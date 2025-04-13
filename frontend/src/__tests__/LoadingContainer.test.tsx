import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
// Update the import path for LoadingContainer using the '@' alias
import LoadingContainer from "@/containers/LoadingContainer"

describe("LoadingContainer", () => {
  it("renders the loading spinner", () => {
    render(<LoadingContainer />)

    const loadingElement = screen.getByText(/loading/i) // Simple text check, adjust regex as needed
    expect(loadingElement).toBeInTheDocument()
  })
})
