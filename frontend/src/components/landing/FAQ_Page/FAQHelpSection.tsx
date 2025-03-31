import React from "react"
import { landingFAQ } from "@/constants/Landing/landingFAQ"

const FAQHelpSection: React.FC = () => {
  const { title, description, buttons } = landingFAQ.helpSection

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
          {buttons.map((button, index) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQHelpSection
