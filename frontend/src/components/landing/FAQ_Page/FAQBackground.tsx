import React from 'react';
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

const FAQBackground: React.FC = () => {
  return (
    <>
      {/* Premium background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white">
      <GridPatternOverlay />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
    </>
  );
};

export default FAQBackground;