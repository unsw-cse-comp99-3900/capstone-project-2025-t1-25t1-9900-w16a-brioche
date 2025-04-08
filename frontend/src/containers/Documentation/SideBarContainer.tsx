import { navItems, renderIcon } from '@/constants/Documentation/SideBar';
import React from 'react';


interface SideBarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeSection, onSectionChange }) => {
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
