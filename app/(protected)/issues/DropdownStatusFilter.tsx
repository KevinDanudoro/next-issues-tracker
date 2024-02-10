import { ReadIssue } from "@/schema/inferedSchema";
import { readIssueSchema } from "@/schema/validationSchema";
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
import { FaFilter } from "react-icons/fa";
import { z } from "zod";

interface TableStatusFilterProps {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  status: ("ALL" | z.infer<typeof readIssueSchema.shape.status>)[];
  column: Column<ReadIssue> | undefined;
}

const TableStatusFilter: FC<TableStatusFilterProps> = ({
  className,
  status,
  column,
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
          <DropdownMenuCheckboxItem
            className="space-x-6 capitalize"
            checked={!column?.getFilterValue()}
            onCheckedChange={() => column?.setFilterValue(undefined)}
          >
            All
          </DropdownMenuCheckboxItem>

          {status.map((stat) => (
            <DropdownMenuCheckboxItem
              key={stat}
              className="space-x-6 capitalize"
              checked={column?.getFilterValue() === stat}
              onCheckedChange={() => column?.setFilterValue(stat)}
            >
              {stat.replaceAll("_", " ").toLowerCase()}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
};

export default TableStatusFilter;
