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
import IssueTable from "./IssueTable";
import { issueColumn } from "./table-column";
import DropdownStatusFilter from "./DropdownStatusFilter";
import {
  useDeleteIssueMutation,
  useDeleteManyIssuesMutation,
  useGetIssues,
} from "@/hooks/issue";
import { useNotifContext } from "@/context/NotifContext";
import { useIssueStatus } from "@/hooks/issueStatus";
import DeleteDialog from "./DeleteDialog";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { data: issueData, isLoading, isError } = useGetIssues();
  const issueStatus = useIssueStatus(issueData || []);
  const { showNotif } = useNotifContext();

  const onSuccess = () => {
    showNotif("Success delete issue", "success");
  };
  const onError = (e: Error) => {
    showNotif(e.message, "error");
  };
  const { mutate: deleteIssue } = useDeleteIssueMutation(onSuccess, onError);
  const { mutate: deleteIssues } = useDeleteManyIssuesMutation(
    onSuccess,
    onError
  );

  const table = useReactTable({
    columns: issueColumn,
    data: issueData ?? [],
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    meta: {
      removeRow: (id: number) => {
        deleteIssue(id);
      },
    },
  });

  const onDeleteAllButtonClick = () => {
    const deletedIds = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original.id);

    deleteIssues(deletedIds);
  };

  return (
    <div className="grid grid-cols-8 mb-4 gap-2 sm:gap-4 content-center">
      <DropdownStatusFilter
        className="col-start-1 col-span-4 sm:col-span-2"
        status={issueStatus}
        column={table.getColumn("status")}
      />

      <Link
        href="/issues/new"
        className="col-start-6 col-span-3 sm:col-start-5 sm:col-span-2 lg:col-start-7 lg:col-span-1"
      >
        <Button variant="solid" size="2" className="w-full">
          New Issue
        </Button>
      </Link>

      <DeleteDialog
        onSubmitButtonClick={onDeleteAllButtonClick}
        message="Are you sure want to delete all issues?"
      >
        <Button
          color="red"
          variant="soft"
          className="col-start-6 col-span-3 sm:col-start-7 sm:col-span-2 lg:col-start-8 lg:col-span-1"
          size="2"
          disabled={
            !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
          }
        >
          Delete Issues
        </Button>
      </DeleteDialog>

      <IssueTable
        table={table}
        isLoading={isLoading}
        isError={isError}
        className="col-span-full"
      />

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
