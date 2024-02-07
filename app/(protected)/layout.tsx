import React from "react";
import type { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <div className="mx-6">{children}</div>
    </div>
  );
};

export default Layout;
