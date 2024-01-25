import React from "react";
import type { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { auth } from "@/auth";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
