import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  heading: string;
}

const Card: React.FC<CardProps> = ({ children, heading }) => {
  return (
    <div>
      {/* Content wrapper */}
      <div
        className="
          w-full
          p-5
          bg-white rounded-xl 
          z-70
          "
      >
        <p className="font-medium text-lg">{heading}</p>
        <hr className="my-2"/>
        {children}
      </div>
    </div>
  );
};

export default Card;
