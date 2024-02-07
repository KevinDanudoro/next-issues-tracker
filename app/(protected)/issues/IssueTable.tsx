import ErrorMessage from "@/components/ErrorMessage";
import { readIssueSchema } from "@/schema/validationSchema";
import { Table } from "@radix-ui/themes";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import React from "react";
import type { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";

type Issue = z.infer<typeof readIssueSchema>;

interface IssueTableProps {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  table: TanstackTable<Issue>;
  isLoading?: boolean;
  isError?: boolean;
}

const IssueTable: FC<IssueTableProps> = ({
  table,
  className,
  isLoading,
  isError,
}) => {
  return (
    <Table.Root variant="surface" className={className}>
      <Table.Header className="capitalize">
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header, i) => (
              <Table.ColumnHeaderCell
                key={header.id}
                width={
                  header.id == "select"
                    ? 60
                    : header.id == "action"
                    ? 150
                    : undefined
                }
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>

      <Table.Body>
        {isLoading || isError ? (
          <Table.Row align="center">
            <Table.Cell colSpan={10}>
              {isLoading && (
                <div className="flex justify-center items-center animate-spin">
                  <FaSpinner size={30} />
                </div>
              )}
              {isError && (
                <div className="flex justify-center items-center">
                  <ErrorMessage>Something went wrong</ErrorMessage>
                </div>
              )}
            </Table.Cell>
          </Table.Row>
        ) : (
          <>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} align="center">
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </>
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
