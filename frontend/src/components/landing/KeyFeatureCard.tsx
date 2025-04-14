/**
 * @file FeatureCard.tsx - Defines the FeatureCard component used in the landing page to display a key feature block with an icon, header, feature list, and highlight.
 */

import React from "react"
import IconWrapper from "@/components/landing/IconWrapper"
import FeatureHeader from "@/components/landing/KeyFeatureHeader"
import FeatureList from "@/components/landing/KeyFeaturelist"
import FeatureHighlight from "@/components/landing/KeyFeatureHighlight"

interface FeatureCardProps {
  /** Title text of the feature card */
  title: string
  /** Description text under the title */
  description: string
  /** List of feature bullet points */
  features: string[]
  /** Index of the card, used for staggered animation and icon selection */
  index: number
}

/**
 * FeatureCard Component
 *
 * Renders a single card in the key features section with animation, gradient glow effect,
 * icon, header, feature list, and highlight footer.
 *
 * @param {FeatureCardProps} props - Component props
 * @param {string} props.title - The title of the feature
 * @param {string} props.description - Description displayed under the title
 * @param {string[]} props.features - Bullet points listed in the feature list
 * @param {number} props.index - Index used to control animation delay and icon variant
 * @returns {JSX.Element} A styled feature card component
 */
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
