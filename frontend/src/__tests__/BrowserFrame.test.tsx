import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BrowserFrame from "@/components/landing/BrowserFrame"

describe("BrowserFrame", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <BrowserFrame>
        <p>Test Content</p>
      </BrowserFrame>
    )
    expect(container).toBeInTheDocument()
  })

  it("renders the browser-like top bar with red, yellow, and green buttons", () => {
    const { container } = render(
      <BrowserFrame>
        <p>Test Content</p>
      </BrowserFrame>
    )

    // Check if the red button exists
    const redButton = container.querySelector(".bg-red-500")
    expect(redButton).toBeInTheDocument()

    // Check if the yellow button exists
    const yellowButton = container.querySelector(".bg-yellow-500")
    expect(yellowButton).toBeInTheDocument()

    // Check if the green button exists
    const greenButton = container.querySelector(".bg-green-500")
    expect(greenButton).toBeInTheDocument()
  })

  it("renders the children inside the frame", () => {
    const { getByText } = render(
      <BrowserFrame>
        <p>Test Content</p>
      </BrowserFrame>
    )
    expect(getByText("Test Content")).toBeInTheDocument()
  })
})
