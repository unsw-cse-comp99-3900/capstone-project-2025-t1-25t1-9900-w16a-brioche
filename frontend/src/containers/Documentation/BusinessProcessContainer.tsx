import { processSteps } from '@/constants/Documentation/BusinessProcess';
import React from 'react';


const BusinessProcess: React.FC = () => {
  return (
    <section id="business-process" className="mb-16">
      <h2 className="text-2xl font-bold text-secondary-900 tracking-tight">Business Process Flow</h2>
      <p className="mt-4 text-lg text-secondary-500">
        Our e-invoicing platform follows a streamlined process to create, validate, and send e-invoices.
      </p>

      <div className="mt-6 bg-white p-6 rounded-lg border border-secondary-200">
        <div className="flex flex-col items-center">
          {processSteps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center justify-center w-64 h-20 ${step.color} rounded-lg ${step.borderColor} text-center p-4`}>
                <div>
                  <div className={`font-medium ${step.textColor}`}>{step.title}</div>
                  <div className={`text-xs mt-1 ${step.textColor.replace('-700', '-600')}`}>{step.subtitle}</div>
                </div>
              </div>
              {idx < processSteps.length - 1 && (
                <div className="h-8 w-0.5 bg-secondary-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-xl font-medium text-secondary-900">Process Description</h3>

      <div className="mt-4 space-y-6">
        {processSteps.map((step) => (
          <div key={step.id}>
            <h4 className={`text-lg font-medium ${step.textColor}`}>{step.title}</h4>
            {step.description.map((desc, i) => (
              <p key={i} className="mt-2 text-secondary-700">{desc}</p>
            ))}
            {step.subpoints && (
              <ul className="mt-2 list-disc pl-5 text-secondary-700">
                {step.subpoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessProcess;
