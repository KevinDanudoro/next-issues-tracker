import { Skeleton } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return <Skeleton className="h-10" />;
};

export default Loading;
