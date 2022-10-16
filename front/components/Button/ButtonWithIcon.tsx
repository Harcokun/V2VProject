import React from "react";
import Image from "next/image";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intext: string;
  iconPath: string;
  iconPosition: string;
}

const ButtonWithIcon: React.FC<ButtonProp> = ({
  intext,
  iconPath,
  iconPosition,
  ...props
}) => {
  return (
    <button {...props}>
      <span className="font-sans flex justify-center items-center">
        {iconPosition == "left" && (
          <Image
            className="flex-grow-0"
            src={iconPath}
            alt="icon image"
            width={24}
            height={24}
            layout="intrinsic"
            objectFit="scale-down"
          />
        )}
        <p className="flex-grow-0 mr-3">{intext}</p>
        {iconPosition == "right" && (
          <Image
            className="flex-grow-0"
            src={iconPath}
            alt="icon image"
            width={24}
            height={24}
            layout="intrinsic"
            objectFit="scale-down"
          />
        )}
      </span>
    </button>
  );
};

export default ButtonWithIcon;
