import { Skeleton } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return <Skeleton className="mx-4 h-10" />;
};

export default Loading;
