import { cn } from "@/lib/utils";
import { readIssueSchema } from "@/schema/validationSchema";
import React from "react";
import type { FC, PropsWithChildren } from "react";
import { z } from "zod";

interface IssueCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  status?: z.infer<typeof readIssueSchema.shape.status>;
}

const IssueCard: FC<IssueCardProps> = ({
  children,
  className,
  status,
  ...props
}) => {
  return (
    <div
      className={cn(
        {
          "rounded-lg shadow-md transition-colors duration-200": true,
          "hover:border-2 hover:border-red-400 hover:bg-red-50":
            status === "OPEN",
          "hover:border-2 hover:border-green-400 hover:bg-green-50":
            status === "CLOSED",
          "hover:border-2 hover:border-yellow-400 hover:bg-yellow-50":
            status === "IN_PROGRESS",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default IssueCard;
