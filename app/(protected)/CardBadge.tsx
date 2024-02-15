import { cn } from "@/lib/utils";
import { readIssueSchema } from "@/schema/validationSchema";
import React from "react";
import type { FC, PropsWithChildren } from "react";
import { z } from "zod";

interface CardBadgeProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  color?: "red" | "yellow" | "green";
}

const CardBadge: FC<CardBadgeProps> = ({
  color,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        {
          "w-12 h-12 rounded-full border-4 flex justify-center items-center":
            true,
          "border-red-400 bg-red-50": color === "red",
          "border-yellow-400 bg-yellow-50": color === "yellow",
          "border-green-400 bg-green-50": color === "green",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CardBadge;
