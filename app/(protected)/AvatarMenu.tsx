import { logout } from "@/lib/action";
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";
import type { FC } from "react";

interface AvatarMenuProps {}

const AvatarMenu: FC<AvatarMenuProps> = ({}) => {
  const session = useSession();
  const inisial = session.data?.user.name?.charAt(0);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="ml-auto">
          <Avatar fallback={inisial ?? "U"} radius="full" variant="solid" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <form action={logout}>
          <button type="submit">
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Logout
            </DropdownMenu.Item>
          </button>
        </form>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AvatarMenu;
