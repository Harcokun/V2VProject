import { useRouter } from "next/router";
import * as React from "react";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const router = useRouter();
  return (
    <div
      className="absolute
                    top-[100px]
				    w-1/6
					h-screen
					bg-[#E6F3F3]
                shadow-lg"
    >
      <h1 className="static font-bold text-xl my-4 ml-10 text-[#009B94]">
        Menu
      </h1>
      <li
        className="static font-bold text-lg my-4 ml-10"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Dashboard
      </li>
      {/* <li
        className="static font-bold text-lg my-4 ml-10"
        onClick={() => {
          router.push("/car");
        }}
      >
        Car Management
      </li> */}
    </div>
  );
};

export default Sidebar;
