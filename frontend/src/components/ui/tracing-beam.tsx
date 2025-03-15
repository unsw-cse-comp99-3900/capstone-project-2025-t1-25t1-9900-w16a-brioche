"use client"
import React, { useEffect, useRef, useState } from "react"
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "motion/react"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  )

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-full mx-auto h-full", className)}
    >
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            height: svgHeight,
          }}
          className="relative h-full w-20"
        >
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="absolute left-0 top-0 h-full"
            fill="none"
          >
            <motion.path
              d={`M 1 0 V ${svgHeight}`}
              stroke="#A855F7"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <motion.path
              d={`M 1 ${y1} L 1 ${y2}`}
              stroke="url(#gradient)"
              strokeWidth="2"
              className="drop-shadow-[0_0_2px_#A855F7]"
            />
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#A855F7" stopOpacity="0" />
                <stop stopColor="#A855F7" />
                <stop offset="0.5" stopColor="#38BDF8" />
                <stop stopColor="#A855F7" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
          <div className="absolute left-0 top-0 h-full w-full">
            <motion.div
              style={{
                top: y1,
              }}
              className="absolute left-0 h-2 w-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500"
            />
            <motion.div
              style={{
                top: y2,
              }}
              className="absolute left-0 h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400"
            />
          </div>
        </motion.div>
      </div>
      <div ref={contentRef} className="ml-4 md:ml-16 relative">
        {children}
      </div>
    </motion.div>
  )
}
