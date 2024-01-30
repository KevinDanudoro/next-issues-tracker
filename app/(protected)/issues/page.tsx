"use client";

import React from "react";
import type { FC } from "react";
import IssueTable from "./new/IssueTable";
import TableButton from "./TableButton";
import { z } from "zod";
import { readIssueSchema } from "@/schema/validationSchema";
import { issueDatas } from "./table-data";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Checkbox } from "@radix-ui/themes";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import StatusChip from "./StatusChip";

interface PageProps {}
type Issue = z.infer<typeof readIssueSchema>;

const Page: FC<PageProps> = ({}) => {
  const data: Issue[] = issueDatas;
  const columns: ColumnDef<Issue>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div className="h-full">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            color="gray"
          >
            Title
            {column.getIsSorted() === "asc" ? (
              <FaSortAlphaDown className="ml-2 h-4 w-4" />
            ) : (
              <FaSortAlphaUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-xs">
          <StatusChip status={row.getValue("status")} />
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="capitalize">
          {new Date(row.getValue("createdAt")).toDateString()}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mx-6">
      <TableButton />
      <IssueTable table={table} />
    </div>
  );
};

export default Page;
