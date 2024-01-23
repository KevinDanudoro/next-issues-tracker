"use client";

import { useNotifContext } from "@/context/NotifContext";
import { cn } from "@/lib/utils";
import { Callout } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";

const Notif: FC = () => {
  const { content } = useNotifContext();

  return (
    <div
      className={cn({
        "fixed top-0 left-0 right-0 flex justify-center py-2 duration-150 z-50":
          true,
        "translate-y-[-100%]": !content.show,
        "translate-y-0": content.show,
      })}
    >
      <Callout.Root
        color={`${
          content.type === "error"
            ? "red"
            : content.type === "warning"
            ? "yellow"
            : "green"
        }`}
      >
        <Callout.Icon>
          <FaInfoCircle />
        </Callout.Icon>
        <Callout.Text>{content.message}</Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default Notif;
