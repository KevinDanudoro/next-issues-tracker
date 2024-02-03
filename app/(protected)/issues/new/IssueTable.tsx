import { readIssueSchema } from "@/schema/validationSchema";
import { Table } from "@radix-ui/themes";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import React from "react";
import type { FC } from "react";
import { z } from "zod";

type Issue = z.infer<typeof readIssueSchema>;

interface IssueTableProps {
  table: TanstackTable<Issue>;
}

const IssueTable: FC<IssueTableProps> = ({ table }) => {
  return (
    <Table.Root variant="surface">
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
                    ? 200
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
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id} align="center">
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
