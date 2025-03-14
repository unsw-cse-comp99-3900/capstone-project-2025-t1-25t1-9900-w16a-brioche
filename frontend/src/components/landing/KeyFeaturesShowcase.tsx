import React from "react";
import FeatureCard from "@/components/landing/KeyFeatureCard";
import { landingFeature } from "@/constants/Landing/landingFeature";

const FeaturesShowcase: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
      {landingFeature.showcase.map((feature, index) => (
        <FeatureCard key={index} {...feature} index={index} />
      ))}
    </div>
  );
};

export default FeaturesShowcase;
