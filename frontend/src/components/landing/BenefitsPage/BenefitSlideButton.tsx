import React, { ReactNode } from 'react';

interface BenefitSlideButtonProps {
  href: string;
  text: string;
  icon?: ReactNode;
}

const BenefitSlideButton: React.FC<BenefitSlideButtonProps> = ({ href, text, icon }) => {
  return (
    <a 
      href={href} 
      className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-primary-500 rounded-full shadow-md"
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary-600 group-hover:translate-x-0 ease">
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-primary-600 transition-all duration-300 transform group-hover:translate-x-full ease">{text}</span>
      <span className="relative invisible">{text}</span>
    </a>
  );
};

export default BenefitSlideButton;