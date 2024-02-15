import React from "react";
import type { FC } from "react";
import { logout } from "@/lib/action";
import {
  Avatar,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@radix-ui/themes";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { auth } from "@/auth";

interface AvatarMenuProps {}

const AvatarMenu: FC<AvatarMenuProps> = async ({}) => {
  const session = await auth();
  const inisial = session?.user.name?.charAt(0);
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <button className="ml-auto">
          <Avatar fallback={inisial ?? "U"} radius="full" variant="solid" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="space-x-10">
          <p>Profile</p> <FaRegUser />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logout}>
          <button type="submit">
            <DropdownMenuItem color="red" className="space-x-10">
              <p>Logout</p>
              <FiLogOut />
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

export default AvatarMenu;
