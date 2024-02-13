"use client";

import { Table } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";
import StatusChip from "./issues/StatusChip";
import { useGetIssues } from "@/hooks/issue";
import { ReadIssue } from "@/schema/inferedSchema";

interface LatestIssueTableProps extends React.HTMLAttributes<HTMLDivElement> {
  initialIssues: ReadIssue[];
}

const LatestIssueTable: FC<LatestIssueTableProps> = ({
  className,
  initialIssues,
  ...props
}) => {
  const { data: issues } = useGetIssues(initialIssues, { latest: 1 });

  return (
    <Table.Root className={className} {...props}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
            <Table.Cell>
              <StatusChip status={issue.status} className="text-xs" />
            </Table.Cell>
            <Table.Cell>{new Date(issue.createdAt).toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LatestIssueTable;
