import React from 'react';
import { landingProcess } from "@/constants/Landing/landingProcess";
import GlowHoverEffect from "@/components/common/GlowHoverEffect";
import GradientAccentLine from "@/components/common/GradientAccentLine";
import ProcessCardTitle from "@/components/landing/ProcessCardTitle";
import ProcessFeatureList from "@/components/landing/ProcessFeatureList";

interface ProcessCardProps {
  stepIndex: number;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ stepIndex }) => {
  const step = landingProcess.steps[stepIndex];
  const isEven = stepIndex % 2 === 1;
  
  return (
    <GlowHoverEffect>
      
      <GradientAccentLine />
      
      
      <ProcessCardTitle 
        title={step.title}
        stepNumber={step.stepNumber}
        isEven={isEven}
      />
      
      
      <p className="text-gray-600 text-lg leading-relaxed">
        {step.description}
      </p>
      
      
      <ProcessFeatureList 
        features={step.features}
        isEven={isEven}
      />
    </GlowHoverEffect>
  );
};

export default ProcessCard;