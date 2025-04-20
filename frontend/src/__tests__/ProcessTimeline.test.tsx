import { render } from "@testing-library/react"
import ProcessTimeline from "@/components/landing/ProcessTimeline"
import { landingProcess } from "@/constants/Landing/landingProcess"

describe("ProcessTimeline", () => {
  it("renders one ProcessStep per step in landingProcess.steps", () => {
    const { container } = render(<ProcessTimeline />)

    const stepContainers = container.querySelectorAll(
      "div.relative[data-aos][data-aos-delay]"
    )

    expect(stepContainers.length).toBe(landingProcess.steps.length)
  })

  it("renders the center timeline vertical line", () => {
    const { container } = render(<ProcessTimeline />)
    const line = container.querySelector("div.bg-gradient-to-b")
    expect(line).toBeInTheDocument()
  })
})
