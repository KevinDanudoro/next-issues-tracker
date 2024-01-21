"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import type { FC } from "react";
import { FaBug } from "react-icons/fa";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const pathname = usePathname();

  const links = [
    {
      label: "dashboard",
      href: "/",
    },
    {
      label: "issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug size={20} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn({
                "text-zinc-800": pathname === link.href,
                "text-zinc-500": pathname !== link.href,
                "capitalize hover:text-zinc-800 transition-colors": true,
              })}
              aria-disabled={pathname == link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
