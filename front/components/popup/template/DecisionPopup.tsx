import React from 'react';
import ButtonWithIcon from '../../Button/ButtonWithIcon';

interface PopupProps {
  heading: string;
  description: string;
  okOnClick?: () => void;
  cancelOnClick?: () => void;
  okText?: string;
  cancelText?: string;
}

const DecisionPopup: React.FC<PopupProps> = ({
  heading,
  description,
  okOnClick,
  cancelOnClick,
  okText = 'ตกลง',
  cancelText = 'กลับ',
}) => {
  return (
    // back drop
    <div className="fixed left-0 top-0 h-screen w-screen bg-blend-multiply bg-gray-900/30 z-50">
      {/* Content wrapper */}
      <div
        className="
          absolute 
          w-5/6 max-w-sm
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          p-5
          bg-white rounded-xl 
          "
      >
        <div className="px-5 py-3">
          <h1 className="text-[#000000] mt-0 text-center font-[kanit] font-bold text-xl">
            {heading}
          </h1>
        </div>
        <p className="text-[#737373] text-left font-[kanit] mt-2 break-normal w-4/6">
          {description}
        </p>
        <div className="flex justify-evenly">
          <ButtonWithIcon
            className="
            bg-alert
            text-white
            w-2/5
            h-10
            rounded-full"
            intext={cancelText}
            iconPosition="left"
            iconPath="/icons/close_24px_white.png"
            onClick={cancelOnClick}
          />
          <ButtonWithIcon
            className="
            bg-primary bg-opacity-30
            border-primary border-2
            text-primary-dark
            w-2/5
            h-10
            rounded-full"
            intext={okText}
            iconPath="/icons/check_primary.png"
            iconPosition="left"
            onClick={okOnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DecisionPopup;
