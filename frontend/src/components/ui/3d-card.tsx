/**
 * @file Card3D.tsx - Provides a 3D interactive card system using motion effects.
 * Includes CardContainer, CardBody, and CardItem components with preserved 3D transforms
 * and context-based mouse interaction handling.
 */

"use client" // For Next.js environments

/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

// Mouse enter state context
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

/**
 * CardContainer Component
 *
 * Wraps the card and handles mouse-based 3D tilt animation.
 * It manages mouse enter state and rotation transform using refs and state.
 *
 * @param {object} props - Children and optional class styling.
 * @returns {JSX.Element} 3D animated card wrapper with context provider.
 */
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  // Handle 3D perspective rotation based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
    if (!containerRef.current) return
    containerRef.current.style.transition = "transform 0.1s ease"
  }

  const handleMouseLeave = () => {
    setIsMouseEntered(false)
    if (!containerRef.current) return
    containerRef.current.style.transition = "transform 0.5s ease"
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)"
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-transform duration-200 ease-out",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

/**
 * CardBody Component
 *
 * The container for all layered elements inside the 3D card.
 *
 * @param {object} props - Children and optional class styling.
 * @returns {JSX.Element} Card content area with preserve-3d styling.
 */
export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("h-96 w-96 [transform-style:preserve-3d]", className)}>
      {children}
    </div>
  )
}

/**
 * CardItem Component
 *
 * Represents a single floating element inside the CardBody that can animate in 3D space.
 * Accepts translation and rotation props for 3D transformation.
 *
 * @param {object} props - Children and transform values.
 * @returns {JSX.Element} A transformable motion div that responds to mouse state.
 */
export const CardItem = ({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}: {
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseEntered] = useMouseEnter()

  const handleAnimationStart = () => {
    if (!ref.current) return
    ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
  }

  const handleAnimationComplete = () => {
    if (!ref.current) return
    ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        transform:
          "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
      }}
      animate={
        isMouseEntered
          ? {
              transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
            }
          : {
              transform:
                "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
            }
      }
      transition={{ duration: 0.3 }}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      className={cn("w-fit", className)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * useMouseEnter Hook
 *
 * Provides access to the mouse-enter state used across Card components.
 * Must be used within a <CardContainer /> context.
 *
 * @returns {[boolean, Dispatch]} Mouse hover state and setter.
 */
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider")
  }
  return context
}
