import React from 'react';
import Image from 'next/image';
import CustomPopup from './template/CustomPopup';
import ButtonWithIcon from '../Button/ButtonWithIcon';

interface PopupProps {
  heading: string;
  description: string;
  description2: string;
  onClick: () => void;
}

const CenterPopup: React.FC<PopupProps> = ({
  heading,
  description,
  description2,
  onClick,
}) => {
  return (
    <div className="text-center">
      <CustomPopup>
        <h1 className="text-primary mt-0 mb-4 font-[kanit] font-bold text-2xl z-70">
          {heading}
        </h1>
        <h1 className="text-[#000000] mt-0 mb-4 font-[kanit] font-nedium text-xl z-70">
          {description}
        </h1>
        <h1 className="text-[#000000] mt-0 font-[kanit] font-bold text-xl z-70">
          {description2}
        </h1>
        <div className="flex flex-col items-center py-2 z-70">
          <ButtonWithIcon
            className="
            bg-primary
            text-white
            w-5/6
            h-10
            rounded-full z-70"
            intext="Back"
            iconPath="/icons/back.png"
            iconPosition="left"
            onClick={onClick}
          />
        </div>
      </CustomPopup>
    </div>
  );
};

export default CenterPopup;
