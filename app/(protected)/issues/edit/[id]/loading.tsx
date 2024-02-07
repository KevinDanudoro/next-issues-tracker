import { Skeleton } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-[20%] h-10" />
    </div>
  );
};

export default Loading;
