import React from 'react';

interface SideBarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'overview', title: 'Overview', icon: 'home' },
    { id: 'business-process', title: 'Business Process Flow', icon: 'document' },
    { id: 'reckon-integration', title: 'Reckon One Integration', icon: 'lightning' },
    { id: 'invoice-creation', title: 'Invoice Creation', icon: 'plus' },
    { id: 'ubl-conversion', title: 'UBL Conversion', icon: 'template' },
    { id: 'validation', title: 'Validation', icon: 'check-circle' },
    { id: 'sending', title: 'Sending Invoices', icon: 'paper-airplane' },
    { id: 'sme-guidelines', title: 'SME Guidelines', icon: 'information-circle' }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="text-primary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'document':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'lightning':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'plus':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'template':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'check-circle':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'paper-airplane':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'information-circle':
        return (
          <svg className="text-secondary-400 group-hover:text-secondary-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="hidden lg:block lg:col-span-3">
      <nav className="sticky top-6 space-y-1" aria-label="Sidebar">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { 
              e.preventDefault(); 
              onSectionChange(item.id); 
            }}
            className={`${
              activeSection === item.id
                ? 'bg-secondary-50 text-primary-600'
                : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
            } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
          >
            {renderIcon(item.icon)}
            <span className="truncate">{item.title}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;