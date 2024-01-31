import { Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { FC } from "react";
import TableStatusFilter from "./TableStatusFilter";

interface TableButtonProps {
  disabled: boolean;
  onDeleteButtonClick: () => void;
}

const TableButton: FC<TableButtonProps> = ({
  onDeleteButtonClick,
  disabled,
}) => {
  return (
    <div className="grid grid-cols-8 mb-4 gap-2 sm:gap-4 content-center">
      <TableStatusFilter className="col-start-1" />

      <Button
        variant="solid"
        className="col-start-6 col-span-3 sm:col-start-5 sm:col-span-2 lg:col-start-7 lg:col-span-1"
        size="2"
      >
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <Button
        color="red"
        variant="soft"
        className="col-start-6 col-span-3 sm:col-start-7 sm:col-span-2 lg:col-start-8 lg:col-span-1"
        size="2"
        disabled={disabled}
        onClick={onDeleteButtonClick}
      >
        Delete Issues
      </Button>
    </div>
  );
};

export default TableButton;
