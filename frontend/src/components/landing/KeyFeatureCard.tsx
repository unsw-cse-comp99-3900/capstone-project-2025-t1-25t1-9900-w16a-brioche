import React from "react"
import IconWrapper from "@/components/landing/IconWrapper"
import FeatureHeader from "@/components/landing/KeyFeatureHeader"
import FeatureList from "@/components/landing/KeyFeaturelist"
import FeatureHighlight from "@/components/landing/KeyFeatureHighlight"


interface FeatureCardProps {
  title: string
  description: string
  features: string[]
  index: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  features,
  index,
}) => {
  return (
    <div
      className="group relative"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-70 blur-lg transition duration-500 group-hover:duration-200"></div>

      <IconWrapper index={index} />

      <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-transparent transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-t-2xl"></div>
        <FeatureHeader title={title} description={description} />
        <FeatureList features={features} />
        <FeatureHighlight index={index} />
      </div>
    </div>
  )
}

export default FeatureCard
