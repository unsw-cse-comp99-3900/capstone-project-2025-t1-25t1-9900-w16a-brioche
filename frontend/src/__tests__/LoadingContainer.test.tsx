import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LoadingContainer from "@/containers/LoadingContainer"

describe("LoadingContainer", () => {
  it("renders the loading spinner", () => {
    render(<LoadingContainer />)

    const loadingElement = screen.getByText(/loading/i) 
    expect(loadingElement).toBeInTheDocument()
  })
})
