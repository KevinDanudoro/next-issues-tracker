import React from "react";
import type { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

interface LayoutProps extends PropsWithChildren {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
