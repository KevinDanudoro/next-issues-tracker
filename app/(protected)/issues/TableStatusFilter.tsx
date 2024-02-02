import { ReadIssue } from "@/schema/inferedSchema";
import {
  Button,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import { Column } from "@tanstack/react-table";
import React from "react";
import type { FC } from "react";
import { FaCheck, FaFilter } from "react-icons/fa";
import { z } from "zod";

interface TableStatusFilterProps {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  hideableColumn: Column<ReadIssue>[];
}

const TableStatusFilter: FC<TableStatusFilterProps> = ({
  className,
  hideableColumn,
}) => {
  return (
    <div className={className}>
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Button variant="soft" className="capitalize">
            <FaFilter />
            <p>Filter Status</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {hideableColumn.map((col) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              className="space-x-6 capitalize"
              checked={col.getIsVisible()}
              onCheckedChange={(value) => col.toggleVisibility(!!value)}
            >
              {col.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
};

export default TableStatusFilter;
