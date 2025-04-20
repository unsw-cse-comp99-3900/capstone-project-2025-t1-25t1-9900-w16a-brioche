import { render } from "@testing-library/react"
import ProcessTimelineNode from "@/components/landing/ProcessTimelineNode"
import { landingProcess } from "@/constants/Landing/landingProcess"

describe("ProcessTimelineNode", () => {
  it("renders the correct step number", () => {
    const index = 0
    const stepNumber = landingProcess.steps[index].stepNumber
    const { container } = render(<ProcessTimelineNode stepIndex={index} />)

    expect(container.textContent).toContain(String(stepNumber))
  })
})
