import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessImage from "@/components/landing/ProcessImage"
import { landingProcess } from "@/constants/Landing/landingProcess"

describe("ProcessImage", () => {
  const step = landingProcess.steps[0]

  it("renders the step image with correct alt text", () => {
    render(<ProcessImage stepIndex={0} />)
    const image = screen.getByAltText(step.imageAlt)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", step.imageUrl)
  })

  it("renders the step label text", () => {
    render(<ProcessImage stepIndex={0} />)
    expect(screen.getByText(step.stepLabel)).toBeInTheDocument()
  })
})
