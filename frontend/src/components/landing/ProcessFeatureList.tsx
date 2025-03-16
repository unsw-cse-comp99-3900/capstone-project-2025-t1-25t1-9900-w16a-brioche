import React from 'react';

interface ProcessFeatureListProps {
  features: string[];
  isEven: boolean;
}

const ProcessFeatureList: React.FC<ProcessFeatureListProps> = ({ features, isEven }) => {
  return (
    <div className={`mt-6 space-y-2 ${isEven ? '' : 'text-right'}`}>
      {features.map((feature, featureIndex) => (
        <div 
          key={featureIndex} 
          className={`flex items-center ${isEven ? '' : 'justify-end'} text-sm text-gray-500`}
        >
          {isEven && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          <span>{feature}</span>
          {!isEven && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessFeatureList;