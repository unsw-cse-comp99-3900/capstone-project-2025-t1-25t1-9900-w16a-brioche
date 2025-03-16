import React from 'react';
import CTAButton from '@/components/landing/BenefitsPage/CTAButton';
import { landingBenefits } from '@/constants/Landing/landingbenefits';

const CTAContent: React.FC = () => {
  return (
    <div className="relative max-w-5xl mx-auto text-center" data-aos="fade-up">
      <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-indigo-100 bg-indigo-800 bg-opacity-50 rounded-full backdrop-blur-sm">
        {landingBenefits.landingCTA.tagline}
      </span>
      
      <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6 drop-shadow-sm">
        {landingBenefits.landingCTA.heading}
      </h2>
      
      <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
        {landingBenefits.landingCTA.description}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <CTAButton 
          text={landingBenefits.landingCTA.primaryButton.text}
          href={landingBenefits.landingCTA.primaryButton.href}
        />
      </div>
    </div>
  );
};

export default CTAContent;