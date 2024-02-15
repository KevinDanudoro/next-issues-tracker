import { cn } from "@/lib/utils";
import React from "react";
import type { FC, PropsWithChildren } from "react";

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

const Card: FC<CardProps> = ({ children, className, ...props }) => {
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

export default Card;
