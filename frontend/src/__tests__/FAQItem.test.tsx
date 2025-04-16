import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FAQItem from "@/components/landing/FAQ_Page/FAQItem"

describe("FAQItem", () => {
  it("toggles answer area className on click", () => {
    render(
      <FAQItem
        icon={<span>?</span>}
        question="What is FAQ?"
        answer={<span>Frequently Asked Questions</span>}
      />
    )
    const answerDiv = screen.getByText(
      "Frequently Asked Questions"
    ).parentElement
    expect(answerDiv?.className).toContain("max-h-0")
    expect(answerDiv?.className).toContain("opacity-0")

    fireEvent.click(screen.getByText("What is FAQ?"))

    expect(answerDiv?.className).toContain("max-h-96")
    expect(answerDiv?.className).toContain("opacity-100")
  })
})
