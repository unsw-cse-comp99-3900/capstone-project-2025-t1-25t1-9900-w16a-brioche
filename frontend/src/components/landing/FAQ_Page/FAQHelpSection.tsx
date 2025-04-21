/**
 * @file FAQHelpSection.tsx - Displays a help or contact section below the FAQ on the landing page.
 * Includes a styled call-to-action box with a title, description, and multiple action buttons.
 */

import React, { useState } from "react"
import { landingFAQ } from "@/constants/Landing/landingFAQ"
import { toast } from "sonner"

/**
 * FAQHelpSection Component
 *
 * This component renders a styled help section beneath the FAQ block.
 * It includes:
 * - A title and description text
 * - Decorative background gradients and blur effects
 * - Multiple CTA buttons with optional icons and primary styling
 *
 * The section also supports fade-up animation via AOS and is anchored with `id="contact"`.
 *
 * @returns {JSX.Element} A gradient-based help/contact card with buttons.
 */
const FAQHelpSection: React.FC = () => {
  const { title, description, buttons } = landingFAQ.helpSection
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(landingFAQ.contactEmail)
      setCopied(true)
      toast.success("Email copied to clipboard!")
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      // fallback: select and copy
      const textarea = document.createElement("textarea")
      textarea.value = landingFAQ.contactEmail
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      toast.success("Email copied to clipboard!")
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div
      id="contact"
      className="mt-16 text-center"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-primary-500 to-blue-500 opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-primary-500 to-blue-500 opacity-10 rounded-full blur-xl"></div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {buttons.map((button, index) => {
            if (button.text === "Contact Email") {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center justify-center px-6 py-3 border ${
                    button.primary
                      ? "border-transparent text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
                      : "border-primary-300 text-primary-700 bg-white hover:bg-primary-50"
                  } text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  {button.icon}
                  {copied ? "Copied!" : button.text}
                </button>
              )
            }
            return (
              <a
                key={index}
                href={button.href}
                className={`inline-flex items-center justify-center px-6 py-3 border ${
                  button.primary
                    ? "border-transparent text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
                    : "border-primary-300 text-primary-700 bg-white hover:bg-primary-50"
                } text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}
              >
                {button.icon}
                {button.text}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FAQHelpSection
