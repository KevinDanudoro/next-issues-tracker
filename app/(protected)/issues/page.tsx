"use client";

import React from "react";
import type { FC } from "react";
import IssueTable from "./new/IssueTable";
import TableButton from "./TableButton";
import { issueDatas } from "./table-data";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReadIssue } from "@/schema/inferedSchema";
import { issueColumn } from "./table-column";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const data: ReadIssue[] = issueDatas;
  const columns: ColumnDef<ReadIssue>[] = issueColumn;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onDeleteButtonClick = () => {
    console.log(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    );
  };

  return (
    <div className="mx-6">
      <TableButton
        onClick={onDeleteButtonClick}
        disabled={
          !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
        }
      />
      <IssueTable table={table} />
    </div>
  );
};

export default Page;
