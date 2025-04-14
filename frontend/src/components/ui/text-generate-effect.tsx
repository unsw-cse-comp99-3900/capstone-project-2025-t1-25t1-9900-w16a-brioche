/**
 * @file TextGenerateEffect.tsx - Defines a typing animation component that reveals text one character at a time.
 */

"use client"
import React, { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TextGenerateEffectProps {
  /** The full text string to animate */
  words: string
  /** Optional class name for styling the outer container */
  className?: string
}

/**
 * TextGenerateEffect Component
 *
 * Displays animated text that appears one character at a time, simulating a typing effect.
 * Includes a blinking cursor during the animation and supports custom styling via `className`.
 *
 * @param {TextGenerateEffectProps} props - Component props.
 * @param {string} props.words - The text to animate.
 * @param {string} [props.className] - Optional class name for styling.
 * @returns {JSX.Element} - A text animation component with a blinking cursor.
 */
export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 40) // Speed of text generation

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, words])

  return (
    <div className={cn("", className)}>
      <div className="relative">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedText}
        </motion.span>
        {!isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute ml-1 inline-block h-6 w-0.5 bg-white"
          ></motion.span>
        )}
      </div>
    </div>
  )
}
