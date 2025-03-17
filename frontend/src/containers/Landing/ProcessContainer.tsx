import React from "react"
import ProcessBackground from "@/components/landing/ProcessBackground"
import ProcessContent from "@/components/landing/ProcessContent"
import ProcessTimeline from "@/components/landing/ProcessTimeline"

const ProcessContainer: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <ProcessBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ProcessContent />
        <ProcessTimeline />
      </div>
    </section>
  )
}

export default ProcessContainer
