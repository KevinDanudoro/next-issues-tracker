"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import type { FC } from "react";

interface InteractiveLinkProps {
  links: {
    label: string;
    href: string;
  }[];
}

const InteractiveLink: FC<InteractiveLinkProps> = ({ links }) => {
  const pathname = usePathname();

  return (
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
  );
};

export default InteractiveLink;
