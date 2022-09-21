import * as React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Header: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="relative
						w-full
						h-[100px]
						bg-gradient-to-r from-secondary to-primary
            
            "
    >
      {children}
    </div>
  );
};

export default Header;
