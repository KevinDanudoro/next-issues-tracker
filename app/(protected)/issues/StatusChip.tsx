import { cn } from "@/lib/utils";
import React from "react";
import type { FC } from "react";

interface StatusChipProps extends React.HTMLAttributes<HTMLParagraphElement> {
  status: "OPEN" | "CLOSED" | "IN_PROGRESS";
}

const StatusChip: FC<StatusChipProps> = ({ status, className, ...props }) => {
  return (
    <p
      className={cn(
        {
          "w-fit px-2 py-[4px] rounded-md border-[2px]": true,
          "text-green-800 bg-green-100 border-green-600": status === "CLOSED",
          "text-red-800 bg-red-100 border-red-600": status === "OPEN",
          "text-yellow-800 bg-yellow-100 border-yellow-600":
            status === "IN_PROGRESS",
        },
        className
      )}
      {...props}
    >
      {status.replaceAll("_", " ")}
    </p>
  );
};

export default StatusChip;
