import React from "react";
import ProcessCard from "@/components/landing/ProcessCard";
import ProcessTimelineNode from "@/components/landing/ProcessTimelineNode";
import ProcessImage from "@/components/landing/ProcessImage";

interface ProcessStepProps {
  stepIndex: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ stepIndex }) => {
  const isEven = stepIndex % 2 === 1;

  return (
    <div 
      className={`relative ${stepIndex < 2 ? 'mb-24 md:mb-32' : ''}`} 
      data-aos={isEven ? "fade-left" : "fade-right"} 
      data-aos-delay={100 * (stepIndex + 1)}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className={`md:w-1/2 ${isEven ? 'md:order-last md:pl-16' : 'md:pr-16 md:text-right'}`}>
          <ProcessCard stepIndex={stepIndex} />
        </div>
        
        <ProcessTimelineNode stepIndex={stepIndex} />
        
        <div className={`md:w-1/2 ${isEven ? 'md:order-first' : ''} mt-12 md:mt-0`}>
          <ProcessImage stepIndex={stepIndex} />
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;