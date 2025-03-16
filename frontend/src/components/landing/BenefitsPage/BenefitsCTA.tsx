import React from 'react';
import BenefitSlideButton from '@/components/landing/BenefitsPage/BenefitSlideButton';
import { landingBenefits } from '@/constants/Landing/landingbenefits';

const BenefitsCTA: React.FC = () => {
  return (
    <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="500">
      <BenefitSlideButton 
        href={landingBenefits.cta.href}
        text={landingBenefits.cta.text}
      />
    </div>
  );
};

export default BenefitsCTA;