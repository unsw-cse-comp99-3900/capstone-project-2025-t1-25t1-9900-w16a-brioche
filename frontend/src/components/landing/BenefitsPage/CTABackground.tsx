import React from 'react';

const CTABackground: React.FC = () => {
  return (
    <>
      {/* Gradient background with modern design elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800">
        {/* Subtle wave pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Elegant geometric elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="300" cy="100" r="100" fill="#ffffff" fillOpacity="0.3" />
          <circle cx="200" cy="250" r="150" fill="#ffffff" fillOpacity="0.2" />
        </svg>
      </div>
      
      {/* Subtle diagonal lines */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
          backgroundSize: "100px 100px"
        }}
      ></div>
      
      {/* Soft glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-[80px]"></div>
    </>
  );
};

export default CTABackground;