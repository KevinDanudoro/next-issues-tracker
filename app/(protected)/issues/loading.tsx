import { Skeleton } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="grid grid-cols-8 grid-rows-8 mx-6 gap-4">
      {/* <Button>
        <Link href="/issues/new">New issue</Link>
      </Button> */}
      <Skeleton className="sm:col-start-7 sm:col-span-1 col-start-5 col-span-2 h-10" />
      <Skeleton className="sm:col-start-8 sm:col-span-1 col-start-7 col-span-2 h-10" />

      <Skeleton className="col-start-1 col-span-8 h-10" />

      <Skeleton className="col-span-2 col-start-1 sm:col-span-1 h-10" />
      <Skeleton className="col-span-4 sm:col-span-5 h-10" />
      <Skeleton className="col-span-2 h-10" />
      <Skeleton className="col-span-2 col-start-1 sm:col-span-1 h-10" />
      <Skeleton className="col-span-4 sm:col-span-5 h-10" />
      <Skeleton className="col-span-2 h-10" />
      <Skeleton className="col-span-2 col-start-1 sm:col-span-1 h-10" />
      <Skeleton className="col-span-4 sm:col-span-5 h-10" />
      <Skeleton className="col-span-2 h-10" />
      <Skeleton className="col-span-2 col-start-1 sm:col-span-1 h-10" />
      <Skeleton className="col-span-4 sm:col-span-5 h-10" />
      <Skeleton className="col-span-2 h-10" />
      <Skeleton className="col-span-2 col-start-1 sm:col-span-1 h-10" />
      <Skeleton className="col-span-4 sm:col-span-5 h-10" />
      <Skeleton className="col-span-2 h-10" />
    </div>
  );
};

export default Loading;
