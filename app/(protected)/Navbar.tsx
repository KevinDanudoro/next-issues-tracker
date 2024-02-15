import React from "react";
import type { FC } from "react";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import AvatarMenu from "./AvatarMenu";
import InteractiveLink from "./InteractiveLink";
import { auth } from "@/auth";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await auth();

  const userLinks = [
    {
      label: "dashboard",
      href: "/",
    },
    {
      label: "issues",
      href: "/issues",
    },
  ];

  const adminLinks = [
    ...userLinks,
    {
      label: "users",
      href: "/users",
    },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-14 items-center">
      <Link href="/" className="mr-8">
        <FaBug size={20} />
      </Link>
      <InteractiveLink
        links={session?.user.role === "ADMIN" ? adminLinks : userLinks}
      />

      <AvatarMenu />
    </nav>
  );
};

export default Navbar;
