/**
 * @file HeroContainer.tsx - Defines the hero section component for the landing page
 * Contains the hero section background, content and showcase components
 */

/**
 * Import required dependencies and components:
 * - React for JSX support
 * - HeroBackground for the section's background visuals
 * - HeroContent for the main content area
 * - HeroShowcase for featuring key product visuals
 */
import React from "react"
import HeroBackground from "@/components/landing/HeroBackground"
import HeroContent from "@/components/landing/HeroContent"
import HeroShowcase from "@/components/landing/HeroShowcase"

const HeroContainer: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      <HeroBackground />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <HeroContent />
          <HeroShowcase />
        </div>
      </div>
    </section>
  )
}

export default HeroContainer
