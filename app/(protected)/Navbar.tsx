"use client";

import React from "react";
import type { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaBug } from "react-icons/fa";
import AvatarMenu from "./AvatarMenu";

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
    <nav className="flex border-b mb-5 px-5 h-14 items-center">
      <Link href="/" className="mr-8">
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

      <AvatarMenu />
    </nav>
  );
};

export default Navbar;
