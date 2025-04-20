import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FeatureHeader from "@/components/landing/KeyFeatureHeader"

describe("FeatureHeader", () => {
  it("renders the title and description", () => {
    render(
      <FeatureHeader
        title="Fast Integration"
        description="Connect with APIs in minutes."
      />
    )
    expect(screen.getByText("Fast Integration")).toBeInTheDocument()
    expect(
      screen.getByText("Connect with APIs in minutes.")
    ).toBeInTheDocument()
  })
})
