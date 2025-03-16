import React from 'react';

const BenefitsBackground: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: "linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(to right, #4F46E5 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}
    ></div>
  );
};

export default BenefitsBackground;