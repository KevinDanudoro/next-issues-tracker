import { cn } from "@/lib/utils";
import { readIssueSchema } from "@/schema/validationSchema";
import React from "react";
import type { FC, PropsWithChildren } from "react";
import { z } from "zod";

interface IssueCardBadgeProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  status?: z.infer<typeof readIssueSchema.shape.status>;
}

const IssueCardBadge: FC<IssueCardBadgeProps> = ({
  status,
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
          "border-red-400 bg-red-50": status === "OPEN",
          "border-yellow-400 bg-yellow-50": status === "IN_PROGRESS",
          "border-green-400 bg-green-50": status === "CLOSED",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default IssueCardBadge;
