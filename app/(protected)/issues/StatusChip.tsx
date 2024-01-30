import { cn } from "@/lib/utils";
import React from "react";
import type { FC, PropsWithChildren } from "react";

interface StatusChipProps {
  status: "OPEN" | "CLOSED";
}

const StatusChip: FC<StatusChipProps> = ({ status }) => {
  return (
    <p
      className={cn({
        "w-fit px-2 py-[4px] rounded-md border-[2px]": true,
        "text-green-800 bg-green-100 border-green-600": status === "OPEN",
        "text-red-800 bg-red-100 border-red-600": status === "CLOSED",
      })}
    >
      {status}
    </p>
  );
};

export default StatusChip;
