import React from "react";
import type { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
