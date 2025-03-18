import React from 'react';
import FAQItem from '@/components/landing/FAQ_Page/FAQItem';
import { landingFAQ } from '@/constants/Landing/landingFAQ';

const FAQList: React.FC = () => {
  return (
    <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
      {landingFAQ.faqItems.map((item) => (
        <FAQItem
          key={item.id}
          icon={item.icon}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default FAQList;