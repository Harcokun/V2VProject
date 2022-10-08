import React from 'react';

const CustomPopup: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children }) => {
  return (
    // back drop

    <div className="fixed left-0 top-0 h-screen w-screen bg-blend-multiply bg-gray-900/30 z-40">

      {/* Content wrapper */}
      <div
        className="
          absolute 
          w-5/6 max-w-sm
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          p-5
          bg-white rounded-xl 
          z-70
          "
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPopup;
