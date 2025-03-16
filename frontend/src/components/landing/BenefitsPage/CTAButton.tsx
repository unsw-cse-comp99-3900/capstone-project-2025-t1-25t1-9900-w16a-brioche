import React from 'react';

interface CTAButtonProps {
  text: string;
  href: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, href }) => {
  return (
    <a 
      href={href} 
      className="group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {text}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
    </a>
  );
};

export default CTAButton;