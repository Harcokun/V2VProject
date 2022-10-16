import React, { useContext } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Container
import { useContainer } from "../containers/containerProvider";

// Components
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  heading: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  heading
}) => {
  const {authService} = useContainer();
  const router = useRouter();

  return (
    <>
      <Header>
        <div
          className="absolute
							left-[22px]
							bottom-[16px]"
        >
          <span
            className="
							text-3xl
							font-bold 
							text-white"
          >
            {heading}
          </span>
        </div>
      </Header>
      <Sidebar/>
      <main className="absolute left-[19%] w-[95%]">{children}</main>
    </>
  );
};

export default Layout;
