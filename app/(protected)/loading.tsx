import { Skeleton } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-10" />

      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-32 w-full md:w-auto md:flex-1" />
        <Skeleton className="h-32 w-full md:w-auto md:flex-1" />
        <Skeleton className="h-32 w-full md:w-auto md:flex-1" />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-48 md:flex-1" />
        <Skeleton className="h-48 md:flex-1" />
      </div>
    </div>
  );
};

export default Loading;
