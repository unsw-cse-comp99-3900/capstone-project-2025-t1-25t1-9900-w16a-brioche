import React from "react";

interface FeatureHeaderProps {
  title: string;
  description: string;
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureHeader;