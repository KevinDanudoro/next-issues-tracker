"use client";

import React from "react";
import type { FC } from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import IssueTable from "./new/IssueTable";
import { issueData } from "./table-data";
import { issueColumn } from "./table-column";
import TableStatusFilter from "./TableStatusFilter";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const table = useReactTable({
    columns: issueColumn,
    data: issueData,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });
  const issueStatus = Array.from(new Set(issueData.map((d) => d.status)));

  const onDeleteAllButtonClick = () => {
    console.log(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    );
  };

  return (
    <div className="mx-6 grid grid-cols-8 mb-4 gap-2 sm:gap-4 content-center">
      <TableStatusFilter
        className="col-start-1 col-span-4 sm:col-span-2"
        status={issueStatus}
        column={table.getColumn("status")}
      />

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
        disabled={
          !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
        }
        onClick={onDeleteAllButtonClick}
      >
        Delete Issues
      </Button>

      <IssueTable table={table} className="col-span-full" />

      <div className="col-span-full flex justify-center gap-x-4">
        <Button
          className="w-24"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <Button
          className="w-24"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
