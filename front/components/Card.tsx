import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
  heading: string;
}

const Card: React.FC<LayoutProps> = ({ children, heading }) => {
  return (
    <div className="rounded-lg bg-slate-50 shadow-sm w-8 h-5">
      <span
        className="
							text-lg
							font-bold 
							text-black"
      >
        {heading}
        <hr className="fill-black h-2" />
      </span>
      {children}
    </div>
  );
};

export default Card;
