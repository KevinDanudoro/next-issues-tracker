"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import type { FC } from "react";
import { FaBug } from "react-icons/fa";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-100 flex items-center h-12 px-6 justify-between fixed w-full">
      <FaBug size={20} />
      <Button>
        {pathname === "/login" ? (
          <Link href="/register">Register</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </Button>
    </div>
  );
};

export default Navbar;
