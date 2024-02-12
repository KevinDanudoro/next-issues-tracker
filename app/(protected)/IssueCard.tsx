import { cn } from "@/lib/utils";
import React from "react";
import type { FC, PropsWithChildren } from "react";

interface IssueCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

const IssueCard: FC<IssueCardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg shadow-md transition-colors duration-200 flex justify-center items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default IssueCard;
