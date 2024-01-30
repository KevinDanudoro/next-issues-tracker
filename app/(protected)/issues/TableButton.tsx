import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { FC } from "react";

interface TableButtonProps {}

const TableButton: FC<TableButtonProps> = ({}) => {
  return (
    <div className="grid grid-cols-8 gap-4 mb-4">
      <Button
        variant="solid"
        className="sm:col-start-7 sm:col-span-1 col-start-5 col-span-2"
        size="2"
      >
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <Button
        color="red"
        variant="soft"
        className="sm:col-start-8 sm:col-span-1 col-start-7 col-span-2"
        size="2"
        disabled={true}
      >
        Delete Issues
      </Button>
    </div>
  );
};

export default TableButton;
