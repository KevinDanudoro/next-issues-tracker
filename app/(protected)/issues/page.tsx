"use client";

import React, { useState } from "react";
import type { FC } from "react";
import IssueTable from "./new/IssueTable";
import { issueDatas } from "./table-data";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReadIssue } from "@/schema/inferedSchema";
import { issueColumn } from "./table-column";
import TableStatusFilter from "./TableStatusFilter";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const data: ReadIssue[] = issueDatas;
  const columns: ColumnDef<ReadIssue>[] = issueColumn;
  const table = useReactTable({
    columns,
    data,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onDeleteAllButtonClick = () => {
    console.log(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    );
  };

  const issueStatus = Array.from(new Set(data.map((d) => d.status)));

  return (
    <div className="mx-6">
      <div className="grid grid-cols-8 mb-4 gap-2 sm:gap-4 content-center">
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
      </div>

      <IssueTable table={table} />
    </div>
  );
};

export default Page;
