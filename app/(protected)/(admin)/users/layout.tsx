import { auth } from "@/auth";
import React from "react";
import type { FC, PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") Response.redirect("/not-found");

  return <div>{children}</div>;
};

export default Layout;
