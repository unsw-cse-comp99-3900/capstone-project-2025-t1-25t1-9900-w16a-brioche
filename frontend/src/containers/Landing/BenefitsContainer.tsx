import React from 'react';
import BenefitsBackground from '@/components/landing/BenefitsPage/BenefitsBackground';
import BenefitsHeader from '@/components/landing/BenefitsPage/BenefitsHeader';
import BenefitsCard from '@/components/landing/BenefitsPage/BenefitsCard';
import BenefitsCTA from '@/components/landing/BenefitsPage/BenefitsCTA';

const BenefitsSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <BenefitsBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mt-20" data-aos="fade-up" data-aos-delay="400">
          <BenefitsHeader />
          <BenefitsCard />
        </div>
        
        <BenefitsCTA />
      </div>
    </section>
  );
};

export default BenefitsSection;