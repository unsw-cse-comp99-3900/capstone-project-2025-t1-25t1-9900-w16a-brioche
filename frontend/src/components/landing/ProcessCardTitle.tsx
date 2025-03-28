import React from "react"

interface ProcessCardTitleProps {
  title: string
  stepNumber: number
  isEven: boolean
}

const ProcessCardTitle: React.FC<ProcessCardTitleProps> = ({
  title,
  stepNumber,
  isEven,
}) => {
  return (
    <div className={`flex items-center ${isEven ? "" : "justify-end"} mb-6`}>
      {isEven && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full blur-sm opacity-70"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 text-white shadow-lg">
            <span className="absolute text-xs font-bold -top-1 -right-1 bg-white text-primary-600 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              {stepNumber}
            </span>
            {stepNumber === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </div>
        </div>
      )}
      <h3
        className={`text-2xl font-bold text-gray-900 ${isEven ? "ml-5" : "mr-5"}`}
      >
        {title}
      </h3>
      {!isEven && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full blur-sm opacity-70"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 text-white shadow-lg">
            <span className="absolute text-xs font-bold -top-1 -right-1 bg-white text-primary-600 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              {stepNumber}
            </span>
            {stepNumber === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProcessCardTitle
