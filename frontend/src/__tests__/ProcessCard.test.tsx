import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessCard from "@/components/landing/ProcessCard"
import { landingProcess } from "@/constants/Landing/landingProcess"

describe("ProcessCard", () => {
  const step = landingProcess.steps[0]

  it("renders the title, step number and description", () => {
    render(<ProcessCard stepIndex={0} />)
    expect(screen.getByText(step.title)).toBeInTheDocument()
    expect(screen.getByText(step.description)).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.includes(String(step.stepNumber)))
    ).toBeInTheDocument()
  })

  it("renders all features for the step", () => {
    render(<ProcessCard stepIndex={0} />)
    step.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })
})
