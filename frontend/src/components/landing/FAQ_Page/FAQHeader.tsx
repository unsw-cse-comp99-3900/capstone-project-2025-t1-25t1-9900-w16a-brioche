import React from 'react';
import { landingFAQ } from '@/constants/Landing/landingFAQ';

const FAQHeader: React.FC = () => {
  return (
    <div className="text-center mb-16" data-aos="fade-up">
      <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-primary-200">
        <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          {landingFAQ.content.tagText}
        </span>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
        {landingFAQ.content.headingText}
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-600">
        {landingFAQ.content.subheadingText}
      </p>
    </div>
  );
};

export default FAQHeader;