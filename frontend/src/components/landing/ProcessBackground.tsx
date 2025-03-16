import React from 'react';

const ProcessBackground: React.FC = () => {
  return (
    <>
      
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(to right, #4F46E5 1px, transparent 1px)', 
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
    </>
  );
};

export default ProcessBackground;