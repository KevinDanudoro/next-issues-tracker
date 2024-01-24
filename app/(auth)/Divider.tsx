import React from "react";
import type { FC, PropsWithChildren } from "react";

interface DividerProps extends PropsWithChildren {}

const Divider: FC<DividerProps> = ({ children }) => {
  return (
    <div className="relative w-full flex justify-center">
      <span className="bg-slate-200 z-10 px-4 text-sm">{children}</span>
      <span className="absolute block h-[2px] w-full bg-gray-400 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
    </div>
  );
};

export default Divider;
