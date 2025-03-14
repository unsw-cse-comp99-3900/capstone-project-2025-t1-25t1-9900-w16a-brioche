import React from "react";
import { landingFeature } from "@/constants/Landing/landingFeature";

const FeaturesContent: React.FC = () => {
  return (
    <div className="text-center mb-16 -mt-8" data-aos="fade-up">
      {/* Section label */}
      <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-primary-200">
        <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
        {landingFeature.content.tagText}
        </span>
      </div>
      <h2 className="text-3xl scale-105 font-bold text-gray-900 sm:text-4xl mb-4">
        {landingFeature.content.headingText}
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-600">
        {landingFeature.content.subheadingText}
      </p>
    </div>
  );
};

export default FeaturesContent;