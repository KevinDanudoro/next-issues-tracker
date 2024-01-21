import Link from "next/link";
import React from "react";
import type { FC } from "react";
import { FaBug } from "react-icons/fa";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
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
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="capitalize text-zinc-500 hover:text-zinc-800 transition-colors"
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
