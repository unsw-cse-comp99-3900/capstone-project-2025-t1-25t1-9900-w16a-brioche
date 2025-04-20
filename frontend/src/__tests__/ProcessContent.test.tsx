import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessContent from "@/components/landing/ProcessContent"
import { landingProcess } from "@/constants/Landing/landingProcess"

describe("ProcessContent", () => {
  const { tagText, headingText, subheadingText } = landingProcess.content

  it("renders the section tag text", () => {
    render(<ProcessContent />)
    expect(screen.getByText(tagText)).toBeInTheDocument()
  })

  it("renders the section heading and subheading", () => {
    render(<ProcessContent />)
    expect(screen.getByText(headingText)).toBeInTheDocument()
    expect(screen.getByText(subheadingText)).toBeInTheDocument()
  })
})
